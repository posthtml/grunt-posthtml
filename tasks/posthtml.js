/*
 * grunt-posthtml
 * https://github.com/TCotton/grunt-posthtml
 *
 * Copyright (c) 2015 Andy Walpole
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var posthtml = require('posthtml');

/**
 * creates absolute path
 * @param file {string}
 * @returns {*}
 */
function absolutePath(file) {
  return path.join(process.cwd(), file);
}

/**
 * check for existence of destination directory
 * if it doesn't exist, create it
 * @param folder {string}
 */
function checkDestFolder(folder, grunt) {
  if (!grunt.file.isDir(absolutePath(folder))) {
    grunt.file.mkdir(absolutePath(folder));
  }
  return absolutePath(folder);
}

/**
 * @param {string} msg Log message
 */
function log(msg) {
  grunt.verbose.writeln(msg);
}

/**
 *
 * @param plugins {function}
 * @param html {string}
 * @param options {object}
 * @param destination {string}
 * @param grunt {object}
 * @param filename {string}
 */

function posthtmlFun(plugins, html, options, destination, grunt, filename) {

  posthtml()
    .use(plugins)
    .process(html, options)
    .then(function(result) {
      grunt.file.write(destination + filename, result.html);
    });
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('posthtml', 'PostHMTL Grunt Plugin', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      use: [],
      process: '',
      parse: '',
      singleTags: [],
      closingSingleTag: '',
      skipParse: null,
      sync: null
    });

    var plugins = options.use[0].length > 0 ? options.use[0] : null;
    delete options.use;

    this.files.forEach(function(file) {

      if (!Array.isArray(file.orig.src)) {
        grunt.log.warn('grunt-posthtml: Please read the documentation to ensure that your Grunt object syntax is correct');
        return false;
      }

      var filePath = file.orig.src[0].cwd;
      var destination = checkDestFolder(file.orig.src[0].dest, grunt);
      console.log(destination);

      // Concat specified files.
      file.orig.src[0].src.filter(function(filename) {

        console.log(filename);

        var file = absolutePath(filePath) + filename;
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(file)) {
          grunt.log.warn('grunt-posthtml: Source file "' + file + '" not found.');
          return false;
        } else {
          posthtmlFun(plugins, grunt.file.read(file), options, destination, grunt, filename);
        }
      });

    });

  });

};
