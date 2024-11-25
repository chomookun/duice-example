# Duice Example


## cross-platform build (mongodb not support arm)
```shell
docker buildx create --use
docuer buildx build --platform linux/amd64 -t duice-example . --load
```