module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    'clean': {
      test: [
        'test/fixtures/underscore/node_modules',
        'test/fixtures/lodash/node_modules'
      ]
    },

    'jshint': {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    'npm-command': {
      'options': {
        cwd: 'test/fixtures/underscore'
      },

      'default': {
      },
      'custom': {
        options: {
          cwd: 'test/fixtures/lodash',
          cmd: 'update',
          args: ['--production']
        }
      },
      'error': {
        options: {
          cwd: 'test/fixtures/error',
          failOnError: false
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first lint everything, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'npm-command', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
