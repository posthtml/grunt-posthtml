# grunt-posthtml  

[![Travis Build Status](https://img.shields.io/travis/posthtml/grunt-posthtml/master.svg?style=flat-square&label=unix)](https://travis-ci.org/posthtml/grunt-posthtml)[![node](https://img.shields.io/node/v/grunt-posthtml.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/grunt-posthtml.svg?style=flat-square)](https://www.npmjs.com/package/grunt-posthtml)

> [PostHTML](https://github.com/posthtml/posthtml) Grunt Plugin

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-posthtml --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-posthtml');
```

## The "posthtml" task

grunt-posthtml is a Grunt wrapper for the [PostHTML plugin](https://github.com/posthtml/posthtml)

### Overview
In your project's Gruntfile, add a section named `posthtml` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  posthtml: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

Here is an example of a configuration with three different plugins:

```js
  posthtml: {
      options: {
        use: [
          require('posthtml-head-elements')({headElements: 'test/config/head.json'}),
          require('posthtml-doctype')({doctype: 'HTML 5'}),
          require('posthtml-include')({encoding: 'utf-8'})
        ]
      },
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'test/html/',
          src: ['*.html'],
          dest: 'test/tmp/'
        }]
      }
    }
```

Alternatively you can use static mapping if you only want to access a single file:

```js
 posthtml: {
      options: {
        use: [
          require('posthtml-head-elements')({headElements: 'test/config/head.json'}),
          require('posthtml-doctype')({doctype: 'HTML 5'}),
          require('posthtml-include')({encoding: 'utf-8'})
        ]
      },
      single: {
        files: [
          {src: 'test/html2/single.html', dest: 'test/tmp/single.html'}
        ]
      }
    },
```

If you are using template strings to add a file path to a PostHTML plugin, then you will need to resolve the path in your Gruntfile configuration. As an example, instead of using this configuration:

```js
 posthtml: {
     options: {
         use: [
             require('posthtml-head-elements')({
                 headElements: '<%= yeoman.dist %>/config/head_elements.json'
             }),
             require('posthtml-doctype')({
                 doctype: 'HTML 5'
             })
         ]
     },
     build: {
         files: [{
             src: '<%= yeoman.dist %>/index.html',
             dest: '<%= yeoman.dist %>/index.html'
         }]
     }
 }
```

You will need to write the path like this:

```js
posthtml: {
    options: {
        use: [
            require('posthtml-head-elements')({
                headElements: path.resolve(__dirname, yeomanConfig.app) + '/config/head_elements.json'
            }),
            require('posthtml-doctype')({
                doctype: 'HTML 5'
            })
        ]
    },
    build: {
        files: [{
            src: '<%= yeoman.dist %>/index.html',
            dest: '<%= yeoman.dist %>/index.html'
        }]
    }
```

### Options

Apart from 'use', which is an array of PostHTML plugins, the others options are singleTags, closingSingleTag, skipParse and sync. The values and purpose of these options is exactly the same as in the parent [PostHTML plugin](https://github.com/posthtml/posthtml#options)

## Release History
 * 2015-11-26   v0.3.0          First release on npm.com
 
 * 2015-11-26   v0.1.2-beta.0   Initial release
 
 * 2018-05-09   v1.0.0          Updated all dependencies, devDependencies and peerDependencies
