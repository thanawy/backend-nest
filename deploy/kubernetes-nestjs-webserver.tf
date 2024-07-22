variable "secrets" {
  description = "Map of secrets for Kubernetes deployment"
  type        = string
  sensitive   = true
}

resource "kubernetes_namespace" "nestjs-webserver" {
  metadata {
    name = "nestjs-webserver"
  }
}

resource "kubernetes_secret" "nestjs-secrets" {
  metadata {
    name      = "nestjs-secrets"
    namespace = kubernetes_namespace.nestjs-webserver.id
  }

  data = {
    SECRETS = var.secrets
    # Add more secrets as needed
  }
}

resource "kubernetes_deployment" "nestjs" {
  metadata {
    name      = "nestjs-deployment"
    namespace = kubernetes_namespace.nestjs-webserver.id
    labels = {
      app = "nestjs"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "nestjs"
      }
    }

    template {
      metadata {
        labels = {
          app = "nestjs"
        }
      }

      spec {
        container {
          name  = "nestjs"
          image = "gcr.io/thanawy-com/nestjs-server:latest"
          liveness_probe {
            http_get {
              path = "/hello"
              scheme = "HTTP"
              port = "3000"
            }
          }
          readiness_probe {
            http_get {
              path = "/hello"
              scheme = "HTTP"
              port = "3000"
            }
          }
          env {
            name = "SECRETS"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.nestjs-secrets.metadata[0].name
                key  = "SECRETS"
              }
            }
          }

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "nestjs" {
  metadata {
    name      = "nestjs-service"
    namespace = kubernetes_namespace.nestjs-webserver.id
    labels = {
      app = "nestjs"
    }
  }

  spec {
    type = "LoadBalancer"
    selector = {
      app = "nestjs"
    }

    port {
      name        = "http"
      protocol    = "TCP"
      port        = 80
      target_port = 3000
    }
  }
}

resource "kubernetes_manifest" "ssl_certificate" {
  manifest = {
    apiVersion = "networking.gke.io/v1"
    kind       = "ManagedCertificate"
    metadata = {
      namespace = kubernetes_namespace.nestjs-webserver.id
      name      = "nestjs-certificate"
    }
    spec = {
      domains = ["staging.thanawy.com"]
    }
  }
}

resource "kubernetes_ingress_v1" "nestjs" {
  metadata {
    name      = "nestjs-ingress"
    namespace = kubernetes_namespace.nestjs-webserver.id
    annotations = {
      "kubernetes.io/ingress.class"                 = "gce"
      "kubernetes.io/ingress.global-static-ip-name" = google_compute_global_address.ingress_ip.name
      "networking.gke.io/managed-certificates"      = kubernetes_manifest.ssl_certificate.manifest.metadata.name
    }
  }

  spec {
    default_backend {
      service {
        name = kubernetes_service.nestjs.metadata[0].name
        port {
          number = 80
        }
      }
    }
  }
}