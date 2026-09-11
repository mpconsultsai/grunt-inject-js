/*
 * grunt-inject-js
 * https://github.com/MarkAPhillips/grunt-inject-js
 *
 * Copyright (c) 2015 Mark Phillips
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    clean: {
      tests: ['test/output']
    },

    injectjs: {
      when_injecting_all_javascript_files_into_a_html_page: {
        files: {
          'test/output/index-injected-all.html': 'test/fixtures/index.html'
        },
        scriptsrc: 'test/fixtures/js/*.js'
      },
      when_removing_all_tags_from_an_html_page: {
        files: {
          'test/output/index-removed.html': 'test/fixtures/index.html'
        },
        clear: true
      },
      when_injecting_two_javascript_files_into_a_html_page: {
        files: {
          'test/output/index-injected-two.html': 'test/fixtures/index.html'
        },
        scriptsrc: ['test/fixtures/js/woopra.js', 'test/fixtures/js/google.js']
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Generate fixture outputs for comparison by the Node test runner.
  grunt.registerTask('test', ['clean', 'injectjs']);
  grunt.registerTask('default', ['test']);
};
