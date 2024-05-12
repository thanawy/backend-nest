resource "google_storage_bucket" "terraform_state_bucket" {
  name          = "thanawy-com-bucket-tfstate"
  force_destroy = true
  location      = "US"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
  depends_on = [
    google_project_service.gcp_services
  ]
}

resource "google_storage_bucket_iam_member" "bucket_object_admin" {
  bucket = google_storage_bucket.terraform_state_bucket.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}