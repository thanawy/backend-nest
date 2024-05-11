resource "google_compute_address" "static_ip_address" {
  name   = "nestjs-static-ip-address"
  region = "us-central1"
}

# Firewall rule for HTTP traffic
resource "google_compute_firewall" "allow_http" {
  name    = "allow-http"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

# Firewall rule for HTTPS traffic
resource "google_compute_firewall" "allow_https" {
  name    = "allow-https"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["https-server"]
}

resource "google_dns_managed_zone" "thanawy_com" {
  name     = "thanawy-com-managed-zone"
  dns_name = "thanawy.com."
}

resource "google_dns_record_set" "thanawy_com" {
  managed_zone = google_dns_managed_zone.thanawy_com.name
  name         = "www.thanawy.com"
  type         = "A"
  rrdatas = [google_compute_address.static_ip_address.address]
  ttl     = 300
}