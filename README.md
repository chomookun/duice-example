# Duice Example

## Run NextJs server
```shell
npm run start:dev
```

## Run React example serve (only react source build)
```shell
cd example/react-example
npm run serve
```

## Run Vue example serve (only vue source build)
```shell
cd example/vue-example
npm run serve
```


## cross-platform build (mongodb not support arm)
```shell
docker buildx create --use
docuer buildx build --platform linux/amd64 -t duice-example . --load
```
