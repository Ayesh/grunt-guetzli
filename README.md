# grunt-guetzli
Grunt plugin to compress JPG and PNG images according to Google's **Guetzli** algorithm ([github](https://github.com/google/guetzli/)).

![grunt-guetzli in action](https://media.giphy.com/media/l4FGsinhgyIt8IMfu/giphy.gif)

##Installation
You need to have the Guetzli plugin compiled yourself first. This plugin depends on that binary
. 
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
## Configuration
The source `guetzli` binary does not expose many configuration options other than the quality and an option to enable verbose output. 
This plugin makes it possible to configure the quality, verbose option, and specify the `guetzli` binary path if it's not in the system `PATH`.

####Configuration options
- `quality`: The quality of the output image. Allows an integer between `84` and `100`.  Default (from `guetzli` binary): `95`.
- `verbose`: Enables verbose output from the `guetzli` binary. Note that this plugin provides the compression information for each file, and a summary at the end of operation even without this option.
- `binpath`: Specify a custom path to the `guetzli` binary if it is not already available in the path. If not given, `guetzli` will be used. **If the given path is not available or executable, Grunt will return an error with code `127`**.

## Contributing
You are welcome to do so. Send a PR or create an issue in the Github repo. 
