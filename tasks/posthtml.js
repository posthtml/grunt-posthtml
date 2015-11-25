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
 * @param grunt {object}
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
      console.dir(result.html);
      // grunt.file.write(destination + filename, result.html);
    });
}

module.exports = function(grunt) {

  grunt.registerMultiTask('posthtml', 'PostHMTL Grunt Plugin', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      use: [],
      singleTags: [],
      closingSingleTag: 'default',
      skipParse: null,
      sync: null
    });

    var plugins;

    if (typeof options.use[0] !== 'function') {
      grunt.log.warn('grunt-posthtml: You must specify the PostHTML plugins you wish to use in the configuration');
    } else {
      plugins = options.use[0].length > 0 ? options.use[0] : null;
      delete options.use;
    }

    this.files.forEach(function(file) {

      if (!file.src[0]) {
        grunt.log.warn('grunt-posthtml: No files have been specified');
        return;
      }

      if (!grunt.file.exists(file.src[0])) {
        grunt.log.warn('grunt-posthtml: Source file "' + file + '" not found.');
      }

      var content = grunt.file.read(file.src[0]);

      posthtml()
        .use(plugins)
        .process(content)
        .then(function(result) {
          grunt.file.write(file.dest, result.html);
        }).catch(function(error) {
        //console.dir(error);
      });

    });

  });

};