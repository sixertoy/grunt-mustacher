<a name="description"></a>
# Grunt Mustacher examples page

[![Built with Grunt][grunt-img]](http://gruntjs.com/) [![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coverall-img]][coverall-url]

> **Grunt task build over [Mustacher module](https://www.npmjs.com/package/mustacher)**

> Designed for fit my own needs to build HTML static pages. Perfect for templating eZPublish, Magento, Drupal... CMS models

> It provide an easy way to **include** handlebar's partials files inside HTML template page with a minimal list of helpers like **repeat (loop)**, **or**, **and**.

<a name="exposed-helpers"></a>
### Exposed HTML/Handlebar's helpers

> **[See mustacher's full documentation](https://github.com/sixertoy/mustacher)**

<a name="install"></a>
### Install & Run (connect + watch)

```shell
npm install -g grunt-cli
npm install
grunt
```

> Open your browser at http://localhost:9000

<a name="config"></a>
### Grunt Configuration

> In your project's Gruntfile, add a section named `mustacher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    mustacher: {
        options: {
            partials: {
                src: 'src/'
            }
        },
        /* compile a single file */
        src_to_dest: {
            files: {
                'html/src_to_dest.html': 'src/src_to_dest.tpl'
            }
        },
        /* compile with an user defined root context */
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
        /* compile all files in all_task folder */
        all: {
            files: [{
                cwd: '.',
                ext: '.html',
                expand: true,
                flatten: true,
                filter: 'isFile',
                dest: 'html/all_task/',
                src: ['src/all_task/**/*.tpl']
            }]
        }
    },
});
```

> Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mustacher');
```

[grunt-img]: https://cdn.gruntjs.com/builtwith.png

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/mustacher
[coverall-img]: https://img.shields.io/coveralls/sixertoy/mustacher.svg?style=flat-square

[npm-url]: https://npmjs.org/package/grunt-mustacher
[npm-version-img]: http://img.shields.io/npm/v/grunt-mustacher.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/grunt-mustacher.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/mustacher
[travis-img]: http://img.shields.io/travis/sixertoy/mustacher.svg?style=flat-square
