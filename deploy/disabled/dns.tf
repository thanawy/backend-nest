resource "google_dns_managed_zone" "thanawy_com" {
  name     = "thanawy-com-managed-zone"
  dns_name = "thanawy.com."
  depends_on = [google_project_service.gcp_services, null_resource.delete_me]

}

resource "google_dns_record_set" "staging_thanawy_com" {
  managed_zone = google_dns_managed_zone.thanawy_com.name
  name         = "staging.thanawy.com."
  type         = "A"
  rrdatas = [kubernetes_service.nestjs.status[0].load_balancer[0].ingress[0].ip]
  ttl     = 300
  depends_on = [google_project_service.gcp_services, kubernetes_service.nestjs, null_resource.delete_me]
}