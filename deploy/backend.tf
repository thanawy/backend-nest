terraform {
  backend "gcs" {
    bucket  = "thanawy-com-bucket-tfstate"
    prefix  = "terraform/state"
  }
}

