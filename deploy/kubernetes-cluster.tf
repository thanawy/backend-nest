resource "google_service_account" "kubernetes" {
  account_id   = "kubernetes-service-account"
  display_name = "Service Account for managing GKE"
}

resource "google_project_iam_binding" "kubernetes_container_admin" {
  project  = data.google_project.project.project_id
  role     = "roles/container.admin"
  members  = [
    "serviceAccount:${google_service_account.kubernetes.email}"
  ]
}

resource "google_project_iam_binding" "kubernetes_registry_reader" {
  project  = data.google_project.project.project_id
  role     = "roles/artifactregistry.reader"
  members  = [
    "serviceAccount:${google_service_account.kubernetes.email}"
  ]
}


resource "google_container_cluster" "primary" {
  name     = "primary-cluster"
  location = "us-central1"
  remove_default_node_pool = true
  initial_node_count       = 1

  deletion_protection = true

  depends_on = [google_project_service.gcp_services]
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "thanawy-node-pool"
  location   = "us-central1"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    preemptible  = true
    machine_type = "n1-standard-1"
    disk_size_gb = "25"
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    service_account = google_service_account.kubernetes.email
    oauth_scopes    = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

data "google_client_config" "default" {}

data "google_container_cluster" "primary" {
  name     = "primary-cluster"
  location = "us-central1"
  depends_on = [
    google_container_cluster.primary,
  ]
}
