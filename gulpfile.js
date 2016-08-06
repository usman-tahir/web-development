/**
 * A Basic gulp file for simplifying project builds.
 * This gulp file allows for the browser to reload
 * updated HTML pages, and also compiles .scss files,
 * minifies .css files, and watches for changes to .js
 * files.
 */

var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css");

// Compile SCSS files into CSS
gulp.task("sass", function () {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minfify CSS
gulp.task("minify-css", function () {
    return gulp.src("app/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("app/css/"));
});

// Sync to a live browser to view HTML changes
gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "app" // Look for an index.html page, or load directory page
        }
    });
});

/**
 * This watch task reloads the browser once any .html
 * file is updated, and also processes the .scss file,
 * minifies the resulting .css file, and watches for
 * changes in the .js file(s) for syncing.
 */
gulp.task("watch", ["browserSync", "sass"], function () {
    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/css/*.css", ["minify-css"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});