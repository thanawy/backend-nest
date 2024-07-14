# This code is compatible with Terraform 4.25.0 and versions that are backwards compatible to 4.25.0.
# For information about validating this Terraform code, see https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/google-cloud-platform-build#format-and-validate-the-configuration

terraform {
  backend "gcs" {
    bucket  = "thanawy-com-tfstate"
    prefix  = "terraform/state"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.37.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "= 2.31.0"
    }
  }
}

provider "google" {
  project     = "thanawy-com"
  region      = "us-central1"
}

provider "kubernetes" {
  host                   = "https://${data.google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth.0.cluster_ca_certificate)
}

#terraform {
#  required_providers {
#    # We recommend pinning to the specific version of the Docker Provider you're using
#    # since new versions are released frequently
#    docker = {
#      source  = "kreuzwerker/docker"
#      version = "3.0.2"
#    }
#  }
#}
#
## Configure the docker provider
#provider "docker" {
#}



