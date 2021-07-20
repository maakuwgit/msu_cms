const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
require('dotenv').config();
const use_maps = process.env.APP_ENV === 'local' ? true : false;

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/global.scss', 'public/css/global.css')
   .sass('resources/sass/cms.scss', 'public/css/cms.css')
   .sass('resources/sass/screen.scss', 'public/css/screen.css')
   .sourceMaps(use_maps, 'source-map')
   .version();
