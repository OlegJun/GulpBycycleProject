import replace from "gulp-replace";// Плагин поиска и замены
import plumber from "gulp-plumber";// Обработка ошибок 
import notify from "gulp-notify";// Вывод ошибок 
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer";//Обновление картинок
import ifPlugin from "gulp-if";//Условное ветление


//Экспорт объектов
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
   if: ifPlugin,
}