resource "google_storage_bucket" "terraform_state_bucket" {
  name          = "thanawy-com-bucket-tfstate"
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
  depends_on = [
    google_project_service.gcp_services
  ]
}