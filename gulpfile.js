var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');
//目录变量
var app = {
  srcPath: 'src/',
  devPath: 'build/',
  prdPath: 'dist/'
};
//js拷贝
gulp.task('lib', function() {
  gulp.src('bower_components/**/*.js')
  .pipe(gulp.dest(app.devPath + 'vendor'))
  .pipe(gulp.dest(app.prdPath + 'vendor'))
  .pipe($.connect.reload());
});
//html文件拷贝
gulp.task('html', function() {
  gulp.src(app.srcPath + '**/*.html')
  .pipe(gulp.dest(app.devPath))
  .pipe(gulp.dest(app.prdPath))
  .pipe($.connect.reload());
});
//json文件拷贝
gulp.task('json', function() {
  gulp.src(app.srcPath + 'data/**/*.json')
  .pipe(gulp.dest(app.devPath + 'data'))
  .pipe(gulp.dest(app.prdPath + 'data'))
  .pipe($.connect.reload());
});
//less编译压缩合并
// gulp.task('style',function(){
//   gulp.src([app.srcPath +'style/*.less','!'+app.srcPath +'styles/_*.less'])
//   .pipe($.less())
//   .pipe(gulp.dest(app.devPath + 'css'))
//   .pipe($.cssmin())
//   .pipe(gulp.dest(app.prdPath + 'css'))
// });

//less文件编译
gulp.task('less', function() {
  gulp.src(app.srcPath + 'style/index.less')
  // .pipe($.plumber())
  .pipe($.less())
  .pipe(gulp.dest(app.devPath + 'css'))
  .pipe($.cssmin())
  .pipe(gulp.dest(app.prdPath + 'css'))
  // .pipe($.connect.reload());
});
//js任务
gulp.task('js', function() {
  gulp.src(app.srcPath + 'script/**/*.js')
  // .pipe($.plumber())
  .pipe($.concat('index.js'))
  .pipe(gulp.dest(app.devPath + 'js'))
  .pipe($.uglify())
  .pipe(gulp.dest(app.prdPath + 'js'))
  .pipe($.connect.reload());
});
//图片任务
gulp.task('image', function() {
  gulp.src(app.srcPath + 'images/**/*')
  // .pipe($.plumber())
  .pipe(gulp.dest(app.devPath + 'images'))
  .pipe($.imagemin())
  .pipe(gulp.dest(app.prdPath + 'images'))
  .pipe($.connect.reload());
});
//清除任务
gulp.task('clean', function() {
  gulp.src([app.devPath, app.prdPath])
  .pipe($.clean());
});
//总构建任务
gulp.task('build', ['image', 'js', 'less','lib', 'html', 'json']);
//服务器
gulp.task('serve', ['build'], function() {
  $.connect.server({
    //开发路径
    root: [app.devPath],
    //自动刷新浏览器
    livereload: true,
    //端口
    port: 3003
  });
  //打开地址
  open('http://localhost:3003');

  gulp.watch('bower_components/**/*', ['lib']);
  gulp.watch(app.srcPath + '**/*.html', ['html']);
  gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
  gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
  gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
  gulp.watch(app.srcPath + 'images/**/*', ['image']);
  });
  //默认任务
  gulp.task('default', ['serve']);
