resource "google_compute_global_address" "ingress_ip" {
  name   = "nestjs-static-ip-address-ingress"
  depends_on = [google_project_service.gcp_services, null_resource.delete_me]
}

resource "google_compute_address" "load_balancer_ip" {
  name   = "nestjs-static-ip-address-load-balancer"
  region = "us-central1"
  depends_on = [google_project_service.gcp_services, null_resource.delete_me]
}

resource "google_dns_managed_zone" "thanawy_com" {
  name     = "thanawy-com-managed-zone"
  dns_name = "thanawy.com."
  depends_on = [google_project_service.gcp_services, null_resource.delete_me]
}

resource "google_dns_record_set" "staging_thanawy_com" {
  managed_zone = google_dns_managed_zone.thanawy_com.name
  name         = "staging.thanawy.com."
  type         = "A"
  rrdatas = [google_compute_global_address.ingress_ip.address]
  ttl     = 300
  depends_on = [google_project_service.gcp_services, kubernetes_service.nestjs, null_resource.delete_me]
}
