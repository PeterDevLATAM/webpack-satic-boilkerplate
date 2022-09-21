# Webpack/SASS boilerplate for static assets

The bundler has some image optimizations (just a few) and packs the css as a separate file, it also packs source maps to the dev environment.

- If you want to add a new html static file just add to the webpack.common.js file the following to plugins:[]

```
  new HtmlWebpackPlugin({
      template: './src/html/new-page.html',
      filename: 'new-page.html',
    }),
```

- All styles has to be imported to src/sass/main.scss

## Installation

```sh
    $ yarn
```

## List of available commands

```sh
    $ yarn run
```

## Webpack Dev Server

```sh
    $ yarn start
```

## Webpack Bundle Build

```sh
    $ yarn build
```

## Styles

```sh
    $ yarn stylelint
    $ yarn stylelint:fix
```

## Log and Comments
