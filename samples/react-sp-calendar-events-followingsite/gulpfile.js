const gulp = require("gulp");
var spsave = require('gulp-spsave');
const prompt = require("gulp-prompt");
const argv = require("minimist")(process.argv.slice(2));
const { URL, credentials } = require("./webpack/webpack.env");

const environment = argv.env || "test";

const coreOptions = {
  client_id: credentials[environment].ClientId,
  client_secret: credentials[environment].ClientSecret,
  realm: "",
  site: URL[environment].siteUrl,
  verbose: "true"
};

gulp.task("default", () => {
  gulp.src("webpack/dist/**").pipe(
    prompt.prompt(
      [
        {
          type: "input",
          name: "userid",
          message: "Enter User ID - "
        },
        {
          type: "password",
          name: "pwd",
          message: "Enter Password - "
        }
      ],
      function(res) {
        gulp
          .src("webpack/dist/**")
          .pipe(spsave(coreOptions, {
            username: res.userid,
            password: res.pwd,
          }))
          .pipe(gulp.dest("build"));
      }
    )
  );
});


// without gulp-prompt
// Optional proxy
  // const proxy_URL = "http://proxyurl:8080";
  // process.env.https_proxy = proxy_URL;
  // process.env.http_proxy = proxy_URL;
// gulp.task("default", () => {
//   gulp
//     .src("webpack/dist/**")
//     .pipe(sp(coreOptions))
//     .pipe(gulp.dest("build"));
// });
