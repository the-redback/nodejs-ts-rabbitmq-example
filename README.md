# nodejs-ts-rabbitmq-example

![License][license-image]
[![GitHub Actions][github-image]][github-url]
[![TypeScript Style Guide][gts-image]][gts-url]
![code size][code-size-image]
<!-- [![codecov][codecov-image]][codecov-url] -->

## Run RabbitMQ in docker

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
```

## To test

```bash
curl -X POST localhost:3000/login -H 'Content-Type: application/json' -d '{"username":"user","password":"my_password"}'
```

```bash
curl localhost:3000/send-msg'
```


## `yarn` or `yarn install`

Installs all the dependencies

## `yarn clean`

Deletes the generated `dist` folder.

## `yarn build`

Cleans the `dist` folder first and then generates all the files.

## `yarn start`

Cleans, generates and then starts using `node dist/index.js` command

## `yarn start:dev`

Runs the program using `ts-node src`, ie, it does not require to generate all the `dist` files

## `yarn start:w`

Runs in watch mode using `nodemon`. Helpful for rapid development and testing.

## `yarn lint`

Checks esLinter using `google/gts` library.

## `yarn fmt`

Fixes linter errors using `google/gts` library.

## `yarn test`

It first cleans `dist`, generates `dist` as part of `pretest`, and then runs `test`.
After finishing running, it checks lint as `posttest`.

[github-image]: https://github.com/the-redback/nodejs-ts-rabbitmq-example/actions/workflows/build.yaml/badge.svg
[github-url]: https://github.com/the-redback/nodejs-ts-rabbitmq-example/actions
[codecov-image]: https://codecov.io/gh/the-redback/nodejs-ts-rabbitmq-example/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/the-redback/nodejs-ts-rabbitmq-example
[gts-image]: https://img.shields.io/badge/code%20style-google-blueviolet.svg
[gts-url]: https://github.com/google/gts
[snyk-image]: https://snyk.io/test/github/the-redback/nodejs-ts-rabbitmq-example/badge.svg
[snyk-url]: https://snyk.io/test/github/the-redback/nodejs-ts-rabbitmq-example
[license-image]: https://img.shields.io/github/license/the-redback/nodejs-ts-rabbitmq-example
[code-size-image]: https://img.shields.io/github/languages/code-size/the-redback/nodejs-ts-rabbitmq-example
