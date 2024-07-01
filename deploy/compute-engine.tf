# This code is compatible with Terraform 4.25.0 and versions that are backwards compatible to 4.25.0.
# For information about validating this Terraform code, see https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/google-cloud-platform-build#format-and-validate-the-configuration
#
locals {
  instance_name = "nestjs-instance-1"
  image_name    = "gcr.io/thanawy-com/nestjs-server:latest"
}

variable "secrets" {
  description = "base64-encoded .env file for the container."
  type        = string
  sensitive   = true
}

resource "google_compute_instance" "nestjs" {
  boot_disk {
    auto_delete = true
    device_name = "nestjs-boot-disk"

    initialize_params {
      image = "projects/cos-cloud/global/images/cos-113-18244-85-49"
      size  = 10
      type  = "pd-balanced"
    }

    mode = "READ_WRITE"
  }

  can_ip_forward      = false
  deletion_protection = false
  enable_display      = false

  labels = {
    container-vm = "cos-stable-113-18244-1-61"
    goog-ec-src  = "vm_add-tf"
  }

  machine_type = "e2-medium"

  metadata = {
    gce-container-declaration = "spec:\n  containers:\n  - name: ${local.instance_name}\n    image: ${local.image_name}\n    env:\n    - name: SECRETS\n      value: ${var.secrets}\n    stdin: false\n    tty: false\n  restartPolicy: Always\n# This container declaration format is not public API and may change without notice. Please\n# use gcloud command-line tool or Google Cloud Console to run Containers on Google Compute Engine."
  }

  name = local.instance_name

  network_interface {
    access_config {
      nat_ip       = google_compute_address.static_ip_address.address # Static IP address
      network_tier = "PREMIUM"
    }

    queue_count = 0
    stack_type  = "IPV4_ONLY"
    subnetwork  = "projects/${data.google_project.project.project_id}/regions/us-central1/subnetworks/default"
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    preemptible         = false
    provisioning_model  = "STANDARD"
  }

  service_account {
    email  = "${data.google_project.project.number}-compute@developer.gserviceaccount.com"
    scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/trace.append"
    ]
  }

  shielded_instance_config {
    enable_integrity_monitoring = true
    enable_secure_boot          = false
    enable_vtpm                 = true
  }
  allow_stopping_for_update = true

  tags       = setunion(google_compute_firewall.allow_http.target_tags, google_compute_firewall.allow_https.target_tags)
  zone       = "us-central1-f"
  depends_on = [
    google_project_service.gcp_services,
    google_compute_firewall.allow_http,
    google_compute_firewall.allow_https,
    google_project_iam_binding.github_actions_roles_binding,
    null_resource.delete_me
  ]
}