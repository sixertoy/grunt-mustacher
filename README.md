<a name="mustacher"></a>
# Mustacher Examples page

[![Built with Grunt][grunt-img]](http://gruntjs.com/) [![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coverall-img]][coverall-url]

> Handlebars minimal templates helpers!

<a name="exposed-helpers"></a>
## Exposed helpers

> take a look inside examples folder

* [include](#include)
* [repeat](#repeat)
* [timestamp](#timestamp)
* [livereload](#livereload)
* [random](#random)
* [and](#and)
* [or](#or)
* [equal](#equal)
* [ldim](#literals)
* [rdim](#literals)
* [raw](#literals)

<a name="the-mustacher-task"></a>
## The "mustacher" task

<a name="install"></a>
#### Install

```shell
npm install mustacher --save-dev
```

> Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-mustacher');
```

<a name="task"></a>
#### Task

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
        }
    },
});
```

<a name="requirements"></a>
## Requirements

- [Handlebars](http://handlebarsjs.com) ^3.0.3
- [Lo-Dash](https://lodash.com) ^3.10.1
- [Q](http://documentup.com/kriskowal/q/) ^1.4.1
- [Grunt](http://gruntjs.com/) ~0.4.5

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
