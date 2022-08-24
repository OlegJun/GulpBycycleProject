import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';//Сжатие CSS файла
import webpcss from 'gulp-webpcss';//Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer';//добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries';//групировка медиазапросов

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
   .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
         title: "SCSS",
         message: "Error: <%= error.message %>"
      })))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
   .pipe(sass({
      outputStyle: 'expanded',
   }))
   .pipe(groupCssMediaQueries())
   //Преобразование WEBP
   .pipe(webpcss(
      {
         webpClass: ".webp",
         noWebpClass: ".no-webp",
      }
   ))
   //"Кроссбраузерность"
   .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 3 version"],
      cascade: true,
   }))
   //Сжатие файла стилей
   //Расскоментировать для просмотра не сжатого файла
   .pipe(app.gulp.dest(app.path.build.css))
   .pipe(cleanCss())
   //Переименование файла стилей
   .pipe(rename({
      extname: ".min.css",
   }))
   .pipe(app.gulp.dest(app.path.build.css))
   //Обновление страницы при изменении
   .pipe(app.plugins.browsersync.stream());
}