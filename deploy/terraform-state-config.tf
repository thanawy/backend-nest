

resource "null_resource" "delete_me" {

}

# do not modify this file! it will be overwritten by terraform
resource "google_storage_bucket" "terraform_state_bucket" {
  name          = "thanawy-com-tfstate"
  force_destroy = true
  location      = "US"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
  lifecycle {
    prevent_destroy = true
  }
}

resource "google_storage_bucket_iam_binding" "bucket_iam_binding" {
  bucket = google_storage_bucket.terraform_state_bucket.name
  role   = "roles/storage.legacyBucketOwner"

  members = [
    "serviceAccount:${google_service_account.github_actions.email}",
    "projectOwner:${data.google_project.project.project_id}",
    "projectEditor:${data.google_project.project.project_id}"
  ]
  lifecycle {
    prevent_destroy = true
  }
}

