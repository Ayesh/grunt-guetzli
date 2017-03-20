/*
 * grunt-guetzli
 * https://github.com/Ayesh/grunt-guetzli
 *
 */


/*
 -h / -help  ............ short help
  -q <float> ............. quality factor (0:small..100:big)
  -quiet ................. don't print anything.
  -version ............... print version number and exit.
  -v ..................... verbose, e.g. print encoding/decoding times
*/


'use strict';

module.exports = function(grunt) {
    grunt.log.header = function () {};
  var path = require('path');
  var async = require('async');
  var fs = require('fs');
  grunt.registerMultiTask('guetzli', "Converts JPG and PNG images according to Google's Guetzli algorithm", function() {
    /**
     * Retrieves defined options.
     */
    var options = this.options();
    grunt.verbose.writeflags(options, 'Options');

    var done = this.async();

    var guetzli_bin = 'guetzli';
    if (options.binpath) {
        guetzli_bin = options.binpath;
    }
    var source_total = 0;
    var dest_total = 0;
    var oversize_total = 0;

    // Iterate over all src-dest file pairs.
    async.eachSeries(this.files, function(f, next) {
      
      /**
       * Create folder for the dest file
       */
      grunt.file.mkdir(path.dirname(f.dest));
      var args = [];

       /**
       * Quality scale: Minimum allowed is 84.
       */
      if (options.quality) {
          if (options.quality < 84) {
              grunt.fail.warn('Guetzli: Quality must be >= 84 to avoid noticeable artifacts.');
          }
          args.push('-quality');
          args.push(options.quality);
      }

      /**
       * Outputs the rules that have been matched.
       */
      if (options.verbose) {
        args.push('-verbose');
      }

      args.push(f.src);
      args.push(f.dest);

      /**
       * Outputs the file that is being analysed.
       */
      grunt.log.subhead('Compressing: ' + f.dest);
      var child = grunt.util.spawn({
        cmd: guetzli_bin,
        args: args
      }, function(error, result, code) {
        //grunt.log.writeln(code+''+result);
        if (code !== 0) {
          return grunt.warn(String(code));
        }
        else{
            var source = fs.statSync(f.src[0])['size'];
            var dest = fs.statSync(f.dest)['size'];
            var diff = ((source - dest) / source) * 100;
            diff = Number((diff).toFixed(2));
            source_total += source;
            if (diff < 0) {
                oversize_total++;
                source_total += source;
                diff = diff * -1;
                if (options.deleteLarger) {
                    grunt.file.delete(f.dest);
                    grunt.log.writeln('Deleted: '['yellow'] + diff + '% larger than its source.');
                }
                else {
                    dest_total += dest;
                    grunt.log.writeln('Warning: '['yellow'] + diff + '% larger than its source. Left undeleted.');
                }
            }
            else {
                dest_total += dest;
                grunt.log.oklns('Done: '['green'] + diff + '% smaller | ' + diff + '%: ' + source + ' -> ' + dest);
            }
        }

        next(error);
      });

      /**
       * displays the output and error streams via the parent process.
       */
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);

    }.bind(this), function() {
        var total_diff = (source_total - dest_total) / source_total;
        var total_diff_perentage = Number((total_diff * 100).toFixed(2));
        grunt.log.subhead('Operation statistics:');
        grunt.log.oklns(source_total + ' -> ' + dest_total);
        grunt.log.oklns(total_diff_perentage +'% saved.');
        if (oversize_total !== 0) {
            if (options.deleteLarger) {
                grunt.log.oklns('Deleted ' + oversize_total + ' file(s) due to larger output.');
            }
            else {
                grunt.log.oklns('Warning: ' + 'Contains ' + oversize_total + ' file(s) larger than their sources.');
            }
        }
        done();
    });

  });
};
