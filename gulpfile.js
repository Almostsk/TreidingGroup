// Подключаем Gulp и все необходимые библиотеки
var gulp           = require('gulp'),
    gutil          = require('gulp-util' ),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    cleanCSS       = require('gulp-clean-css'),
    autoprefixer   = require('gulp-autoprefixer'),
    bourbon        = require('node-bourbon'),
    ftp            = require('vinyl-ftp'),
    cleanDest      = require('gulp-clean-dest'),
    uglify         = require('gulp-uglify'),
    gulpif         = require('gulp-if'),
    useref         = require('gulp-useref'),
    csso           = require('gulp-csso'),
    server         = require('gulp-server-livereload');
// Обновление страниц сайта на локальном сервере
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "gulp__template",
        notify: false
    });
});

//SERVER    
gulp.task('serv', function() {
  gulp.src('.')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});
// Компиляция stylesheet.css
gulp.task('sass', function() {
    return gulp.src('app/sass/stylesheet.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 30 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
});

// Наблюдение за файлами
gulp.task('watch', ['sass', 'serv'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/js/**/*.js');
    gulp.watch('app/libs/**/*.js');
});

// Выгрузка изменений на хостинг
gulp.task('deploy', function() {
    var conn = ftp.create({
        host:      'hostname.com',
        user:      'username',
        password:  'userpassword',
        parallel:  10,
        log: gutil.log
    });
    var globs = [
    'app/**'
    ];
    return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('start', ['watch']);


//BUILD
gulp.task('build' ,function () {
    return gulp.src('index.html')
        .pipe(cleanDest('app'))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('build'));
});