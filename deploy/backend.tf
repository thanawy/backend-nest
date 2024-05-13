terraform {
  backend "gcs" {
    bucket  = "thanawy-com-tfstate"
    prefix  = "terraform/state"
  }
}

