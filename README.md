<a name="mustacher"></a>
# Mustacher Examples page

[![Built with Grunt][grunt-img]](http://gruntjs.com/) [![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coverall-img]][coverall-url]

> Provide an easy way to include handlebar's partials files inside HTML template page with a few helpers list like repeat, or, and. AngularJs compliant

<a name="exposed-helpers"></a>
### Exposed helpers

###### inline

* $include
* $image
* $timestamp
* $livereload
* $ldim
* $rdim
* $random

###### blocks

* repeat
* and
* or
* equal

> take a look inside src folder for examples

<a name="install"></a>
### Install & Run (connect + watch)

```shell
npm install -g grunt-cli
npm install
grunt
```

> Four outputs, open your browser at http://localhost:9000

<a name="config"></a>
### Grunt Configuration

> In your project's Gruntfile, add a section named `mustacher` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
    mustacher: {
        options: {
            partials: {
                src: 'src/'
            }
        },
        compile: {
            options: {
                context: {
                    any: 'to be touched by @root.context.any',
                    inside: 'a template'
                }
            },
            files: [{
                src: 'src/index.tpl',
                dest: 'html/index.html'
            }]
        },
        src_to_dest: {
            files: {
                "html/src_to_dest.html": "src/src_to_dest.tpl"
            }
        },
        all: {
            files: [{
                cwd: '.',
                ext: ".html",
                expand: true,
                flatten: true,
                filter: 'isFile',
                dest: "html/all_task/",
                src: ['src/all_task/**/*.tpl']
            }]
        }
    },
});
```

> Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-mustacher');
```

[grunt-img]: https://cdn.gruntjs.com/builtwith.png

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/grunt-mustacher
[coverall-img]: https://img.shields.io/coveralls/sixertoy/grunt-mustacher.svg?style=flat-square

[npm-url]: https://npmjs.org/package/grunt-mustacher
[npm-version-img]: http://img.shields.io/npm/v/grunt-mustacher.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/grunt-mustacher.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/grunt-mustacher
[travis-img]: http://img.shields.io/travis/sixertoy/grunt-mustacher.svg?style=flat-square
