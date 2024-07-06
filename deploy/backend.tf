terraform {
  backend "gcs" {
    bucket  = "thanawy-com-tfstate"
    prefix  = "terraform/state"
  }
}

resource "null_resource" "delete_me" {
  triggers = {
    timestamp = timestamp()
  }
}



