# This code is compatible with Terraform 4.25.0 and versions that are backwards compatible to 4.25.0.
# For information about validating this Terraform code, see https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/google-cloud-platform-build#format-and-validate-the-configuration
provider "google" {
  project     = "thanawy"
  region      = "us-central1"
}

resource "google_compute_instance" "thanawy-nestjs-instance-1" {
  boot_disk {
    auto_delete = true
    device_name = "thanawy-nestjs-instance-1"

    initialize_params {
      image = "projects/cos-cloud/global/images/cos-stable-113-18244-1-61"
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

  machine_type = "f1-micro"

  metadata = {
    gce-container-declaration = "spec:\n  containers:\n  - name: thanawy-nestjs-instance-1\n    image: gcr.io/thanawy/thanawy-nestjs-server:latest\n    stdin: false\n    tty: false\n  restartPolicy: Always\n# This container declaration format is not public API and may change without notice. Please\n# use gcloud command-line tool or Google Cloud Console to run Containers on Google Compute Engine."
  }

  name = "thanawy-nestjs-instance-1"

  network_interface {
    access_config {
      network_tier = "PREMIUM"
    }

    queue_count = 0
    stack_type  = "IPV4_ONLY"
    subnetwork  = "projects/thanawy/regions/us-central1/subnetworks/default"
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    preemptible         = false
    provisioning_model  = "STANDARD"
  }

  service_account {
    email  = "934017043258-compute@developer.gserviceaccount.com"
    scopes = ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/trace.append"]
  }

  shielded_instance_config {
    enable_integrity_monitoring = true
    enable_secure_boot          = false
    enable_vtpm                 = true
  }

  tags = ["http-server", "https-server"]
  zone = "us-central1-f"
}
