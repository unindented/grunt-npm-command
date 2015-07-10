'use strict';

module.exports = function (grunt) {
  var exec = require('child_process').exec;

  grunt.registerMultiTask('npm-command', 'Run npm commands from Grunt.', function () {
    var done = this.async();

    var options = this.options({
      cwd: '',
      cmd: 'install',
      args: [],

      stdout: true,
      stderr: true,
      failOnError: true
    });

    var command = ['npm', options.cmd].concat(options.args).join(' ');

    var child = exec(command, {cwd: options.cwd}, function (err) {
      if (err) {
        grunt.log.error(err);
      }
      return done(options.failOnError ? err : null);
    });

    if (options.stdout || grunt.option('verbose')) {
      child.stdout.pipe(process.stdout);
    }

    if (options.stderr || grunt.option('verbose')) {
      child.stderr.pipe(process.stderr);
    }
  });
};
