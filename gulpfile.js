//Основной модуль
import gulp from "gulp";

//Импорт путей
import { path } from "./gulp/config/path.js";
//Импорт плагинов
import { plugins } from "./gulp/config/plugins.js";
//Передаем значения в глобальную переменную
global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins,
}


// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
//import { ftp } from "./gulp/tasks/ftp.js";

//Наблюдатель за изменениями в файле
function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

export { svgSprive }


const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
//Объединение действий и вынос в отдельную константу (Основные задачи)
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const deployZIP = gulp.series(reset, mainTask, zip);
//const deployFTP = gulp.series(reset, mainTask, ftp);

export { deployZIP }
//export { deployFTP }
//Выполнение сценария поумолчанию
gulp.task('default', dev);