# gulp-frontend-starter

A Frontend Development starter package using gulp js (NodeJS/NPM/ES6/Gulp/Sass/Babel/Babelify/).

## Installation

You have to  nodeJS and GulpJs installed on your Computer,
and then clone this repo

   ```bash
 git clone git@github.com:hasanmisbah/gulp-frontend-starter.git .
```

or Download zip file from github and extract into your project Root.

run

```bash
npm install
```

to install Dependency then start coding on `app/` folder

## Usage

```bash
gulp
```

to intial build (you will found everything on `dev/` folder)

## Command

`gulp watch` or `npm run dev` to start local Development with browsersync

`gulp --build` Final Building

## Adding Dependency or plugin

if you are faliliar with `npm` package manager you can install using `npm`  and then add plugin info on gulp file `vendors` array or simply you can put your plugin into `app/assets/vendor`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## dependency

```json
"@babel/core": "^7.4.0",
"@babel/preset-env": "^7.4.2",
"browser-sync": "^2.26.3",
"gulp": "^4.0.0",
"gulp-autoprefixer": "^6.0.0",
"gulp-babel": "^8.0.0",
"gulp-clean": "^0.4.0",
"gulp-header": "^2.0.7",
"gulp-headerfooter": "^1.0.3",
"gulp-imagemin": "^5.0.3",
"gulp-inject": "^5.0.2",
"gulp-modernizr": "^3.1.0",
"gulp-notify": "^3.2.0",
"gulp-options": "^1.1.1",
"gulp-plumber": "^1.2.1",
"gulp-pretty-html": "^2.0.9",
"gulp-rename": "^1.4.0",
"gulp-sass": "^4.0.2",
"gulp-sourcemaps": "^2.6.5",
"gulp-uglify": "^3.0.2",
"merge-stream": "^1.0.1"
```

## Contributor 

[Hasan Misbah](http://twitter.com/hasanmisbah01 "Hasan Misbah")

## License

[MIT](https://choosealicense.com/licenses/mit/)
