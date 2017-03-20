/*
 * grunt-guetzli
 * https://github.com/Ayesh/grunt-guetzli
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({

      // Cleanup the optimized images directory.
        clean: {
          test: ['tmp/images-optimized']
        },
        guetzli: {
          files: ['tmp/images/*.jpg', 'tmp/images-optimized/*.png'],
          options: {
            verbose: true,
            quality: 80
          }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // test task.
  grunt.registerTask('test', ['clean', 'guetzli']);

};
