const path = require('path');
const webpack = require('webpack');
const options = require('gulp-options');


let appPath = {
    src: 'app/',
    dev: 'dev',
    build: 'dist'
};

function pathName() {
    let path;
    if (options.has('build')) {
        path = appPath.build;
        return path;
    } else {
        path = appPath.dev;
        return path;
    }
}

module.exports = {
    mode: pathName() == 'dev' ? 'development' : 'production',
        devtool: 'source-map',
        output: {
            filename: 'scripts.js',
        }
}