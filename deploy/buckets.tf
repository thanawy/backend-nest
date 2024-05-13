resource "google_storage_bucket" "terraform_state_bucket" {
  name          = "thanawy-com-tfstate"
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

resource "google_storage_bucket_iam_binding" "bucket_iam_binding" {
  bucket = google_storage_bucket.terraform_state_bucket.name
  role   = "roles/storage.legacyBucketOwner"

  members = [
    "serviceAccount:${google_service_account.github_actions.email}",
    "projectOwner:${data.google_project.project.project_id}",
    "projectEditor:${data.google_project.project.project_id}"
  ]

}