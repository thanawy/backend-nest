data "google_project" "project" {}

resource "google_iam_workload_identity_pool" "pool" {
  workload_identity_pool_id = "github-actions-pool"
  display_name              = "Thanawy Github Actions WIF Pool"
  lifecycle {
    prevent_destroy           = true
  }
}

resource "google_iam_workload_identity_pool_provider" "provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions-provider"
  attribute_mapping                  = {
    "google.subject"       = "assertion.sub",
    "attribute.repository" = "assertion.repository"
  }
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com/"
  }
  lifecycle {
    prevent_destroy           = true
  }
}

# Create service account
resource "google_service_account" "github_actions" {
  account_id   = "github-actions"
  display_name = "Github Actions"
  lifecycle {
    prevent_destroy           = true
  }
}

variable "gcp_service_account_roles" {
  description = "The list of roles necessary for the service account to function properly."
  type        = list(string)
  default     = [
    "roles/dns.peer",
    "roles/dns.admin",
    "roles/compute.admin",
    "roles/storage.objectAdmin",
    "roles/compute.networkAdmin",
    "roles/artifactregistry.admin",
    "roles/iam.serviceAccountAdmin",
    "roles/compute.instanceAdmin.v1",
    "roles/iam.workloadIdentityPoolAdmin",
    "roles/iam.serviceAccountTokenCreator",
    "roles/serviceusage.serviceUsageViewer",
    "roles/resourcemanager.projectIamAdmin",
    "roles/artifactregistry.createOnPushRepoAdmin",
  ]
}

resource "google_project_iam_binding" "github_actions_roles_binding" {
  for_each = toset(var.gcp_service_account_roles)
  project  = data.google_project.project.project_id
  role     = each.key
  members  = [
    "serviceAccount:${google_service_account.github_actions.email}"
  ]
  depends_on = [null_resource.delete_me, google_service_account.github_actions]
}

resource "google_service_account_iam_member" "github_actions_workload_identity_user" {
  service_account_id = google_service_account.github_actions.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/projects/${data.google_project.project.number}/locations/global/workloadIdentityPools/${google_iam_workload_identity_pool.pool.workload_identity_pool_id}/attribute.repository/thanawy/backend-nest"
  lifecycle {
    prevent_destroy = true
  }
}
