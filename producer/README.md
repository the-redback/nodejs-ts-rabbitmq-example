# producer
> Boilerplate project for nodejs typescript

![License][license-image]
[![GitHub Actions][github-image]][github-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![TypeScript Style Guide][gts-image]][gts-url]
![code size][code-size-image]
<!-- [![codecov][codecov-image]][codecov-url] -->

---

## Use As Template

To use it as template of a project, click the button `Use this template`.

Find and replace the word `producer` with `<new-project-name>`. Most of the changes will be in `README` file and `project name` in `package.json` file. IDE (e.g. vscode) is a good option to do that.

But you can also use the following command in terminal to replace `producer` with `<new-project-name>`.


```bash
sed -i '' 's/producer/<new-project-name>/g' *(.)
```

---

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

[github-image]: https://github.com/the-redback/producer/actions/workflows/build.yaml/badge.svg
[github-url]: https://github.com/the-redback/producer/actions
[codecov-image]: https://codecov.io/gh/the-redback/producer/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/the-redback/producer
[gts-image]: https://img.shields.io/badge/code%20style-google-blueviolet.svg
[gts-url]: https://github.com/google/gts
[snyk-image]: https://snyk.io/test/github/the-redback/producer/badge.svg
[snyk-url]: https://snyk.io/test/github/the-redback/producer
[license-image]: https://img.shields.io/github/license/the-redback/producer
[code-size-image]: https://img.shields.io/github/languages/code-size/the-redback/producer
