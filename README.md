# grunt-guetzli
Grunt plugin to compress JPG and PNG images according to Google's **Guetzli** algorithm.

[![npm version](https://badge.fury.io/js/grunt-guetzli.svg)](https://badge.fury.io/js/grunt-guetzli)  [![Build Status](https://scrutinizer-ci.com/g/Ayesh/grunt-guetzli/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Ayesh/grunt-guetzli/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Ayesh/grunt-guetzli/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Ayesh/grunt-guetzli/?branch=master)  [![npm](https://img.shields.io/npm/l/grunt-guetzli.svg)]()


![grunt-guetzli in action](https://media.giphy.com/media/l4FGsinhgyIt8IMfu/giphy.gif)

## Installation

You need to have Guetzli already installed on your system for this plugin to work. Download from the [Guetzli releases page](https://github.com/google/guetzli/releases), or [compile it yourself.](https://github.com/google/guetzli/blob/master/README.md) 

Run `npm install --save grunt-guetzli`.

This will install the `grunt-guetzli` plugin and its `grunt` dependency if not already installed. 

In your `Gruntfile.js` , you can use the new `guetzli` task as following:

    guetzli: {
                files: {
                    expand: true,
                    src: 'tmp/images/*.jpg',
                    dest: 'tmp/images-optimized'
                },
                options: {
                    quality: 84
                }
            }
            
Then, you need to make Grunt load the new task:

    grunt.loadNpmTasks('grunt-guetzli');
	
Now, you can add the `grunt-guetzli` to any existing or new Grunt task:
    
	grunt.registerTask('default', ['uncss', 'concat_css', 'uglify', 'guetzli']); // Notice the last array element.

 
## Configuration
The source `guetzli` binary does not expose many configuration options other than the quality and an option to enable verbose output. Currently, Guetzli binary also exposes an option to limit the memory limit, and those options will be added to this grunt plugin in a future release. 

This plugin makes it possible to configure the quality, verbose option, and specify the `guetzli` binary path if it's not in the system `PATH`.

#### Configuration options
- `quality`: The quality of the output image. Allows an integer between `84` and `100`.  Default (from `guetzli` binary): `95`.
- `verbose`: Enables verbose output from the `guetzli` binary. Note that this plugin provides the compression information for each file, and a summary at the end of operation even without this option.
- `binpath`: Specify a custom path to the `guetzli` binary if it is not already available in the path. If not given, `guetzli` will be used. **If the given path is not available or executable, Grunt will return an error with code `127`**.

## Contributing
You are welcome to do so. Send a PR or create an issue in the Github repo. 

