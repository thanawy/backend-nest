#resource "docker_image" "nestjs" {
#  name = "nestjs"
#  build {
#    context = "."
#    tag     = ["nestjs:v1", "nestjs:latest"]
#    dockerfile = "../Dockerfile"
#  }
#
#  triggers = {
#    dir_sha1 = sha1(join("", [for f in fileset(path.module, "src/*") : filesha1(f)]))
#  }
#}
#
#resource "docker_registry_image" "nestjs_registry" {
#  name          = "thanawy.com/${docker_image.nestjs.name}"
#  keep_remotely = true
#}
