/*
* grunt-inject-js
* Copyright (c) 2015 Mark Phillips
* Licensed under the MIT License
*/
'use strict';

var path = require('path');

module.exports = function (grunt) {

  grunt.registerMultiTask('injectjs', 'Grunt Task that allows for multiple JavaScript files to be injected into a file.', function () {
    var scriptArray = [];
    var injectTagPattern = /<!--\s*inject:[a-zA-Z0-9_.-]+\s*-->/gi;

    function escapeRegExp(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function getExistingSources(file) {
      return file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });
    }

    /** Read file and create script item and push to array **/
    function _createScriptItem(filepath) {
      var identifier = path.basename(filepath, '.js').toLowerCase();
      var scriptItem = {
        identifier: identifier,
        filecontent: grunt.file.read(filepath)
      };
      scriptArray.push(scriptItem);
    }

    /** Create file content based on the file path passed. **/
    function _createFileContent(filepath) {
      if (path.extname(filepath).toLowerCase() === '.js') {
        _createScriptItem(filepath);
      } else {
        grunt.verbose.warn('Warning scriptsrc contains a non-javascript file: ' + path.basename(filepath));
      }
    }

    var clearTags = this.data.clear;
    if (clearTags) {
      this.files.forEach(function (file) {
        var sources = getExistingSources(file);
        if (sources.length === 0) {
          grunt.log.warn('Destination ' + file.dest + ' not written because no source files were found.');
          return;
        }

        var replaceContent = grunt.file.read(sources[0]);
        var output = replaceContent.replace(injectTagPattern, '');
        grunt.file.write(file.dest, output);
        grunt.log.ok('Successfully removed all tags from file:  ' + file.dest.blue);
      });
      return;
    }

    if (typeof this.data.scriptsrc === 'undefined') {
      grunt.log.error('Please enter a location of the JavaScript files to be injected into the Html document');
      return false;
    }

    var scriptsrc = grunt.file.expand(this.data.scriptsrc);
    scriptsrc.forEach(function (filepath) {
      grunt.verbose.writeln('Processing file ' + filepath);
      _createFileContent(filepath);
    });

    if (scriptArray.length === 0) {
      grunt.log.warn('Warning: No files located using glob pattern ' + this.data.scriptsrc);
      return;
    }

    this.files.forEach(function (file) {
      var sources = getExistingSources(file);
      if (sources.length === 0) {
        grunt.log.warn('Destination ' + file.dest + ' not written because no source files were found.');
        return;
      }

      var replaceContent = grunt.file.read(sources[0]);
      scriptArray.forEach(function (item) {
        var placeholderRegex = new RegExp('<!--\\s*inject:' + escapeRegExp(item.identifier) + '\\s*-->', 'gi');
        if (!placeholderRegex.test(replaceContent)) {
          grunt.log.warn('Placeholder <!-- inject:' + item.identifier + ' --> not found in ' + sources[0]);
          return;
        }

        // Reset lastIndex after test() with the global flag
        placeholderRegex.lastIndex = 0;
        replaceContent = replaceContent.replace(
          placeholderRegex,
          '<script type="text/javascript">' + item.filecontent + '</script>'
        );
        grunt.verbose.writeln('JS script ' + item.identifier + '.js injected into ' + file.dest);
      });

      grunt.file.write(file.dest, replaceContent);
      grunt.log.ok('Successfully updated file  ' + file.dest.blue);
    });
  });
};
