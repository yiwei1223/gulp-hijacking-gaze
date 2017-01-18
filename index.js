/**!
 * gulp-hijacking-gaze 1.0.0 (c) 2017 Yi wei - MIT license
 * @desc 动态的在html尾部加入诱导劫持注释代码
 */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

/**
 * @desc 插件主体
 * @param gaze 注释代码
 */
module.exports = function (gaze) {
    var _gaze = gaze || '<!-- <script></script> -->' +
        '<!-- <body><script src="js/$touch.js"></script></body></html> --></body><!-- <body><script src="js/$touch.js"></script></body></html> --></html>' +
        '<!-- <html><script src="js/$touch.js"></script></html> -->';

    // 注入处理
    return through.obj(function (file, enc, cb) {
        var that = this;
        if (file.isStream()) {
            if (/\.html/.test(file.path)) {
                var _sourceHtml = file.contents.toString('utf8').replace(/\s*\<\/body\>\s*\<\/html\>\s*/gi, _gaze);
                file.contents = new Buffer(_sourceHtml);
                cb(null, file);
            } else {
                cb(null, file);
            }
        }

        if (file.isBuffer()) {
            if (/\.html/.test(file.path)) {
                var sourceHtml = file.contents.toString('utf8').replace(/\s*\<\/body\>\s*\<\/html\>\s*/gi, _gaze);
                file.contents = new Buffer(sourceHtml);
                cb(null, file);
            } else {
                cb(null, file);
            }
        }
    });
};