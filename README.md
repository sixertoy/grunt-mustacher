<a name="description"></a>
# Grunt Mustacher Task

[![Built with Grunt][grunt-img]](http://gruntjs.com/) [![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coverall-img]][coverall-url]

> **Grunt task build over [Mustacher module](https://www.npmjs.com/package/mustacher)**

> Designed for fit my own needs to build HTML static pages. Perfect for templating eZPublish, Magento, Drupal... CMS models

> It provide an easy way to **include** handlebar's partials files inside HTML template page with a minimal list of helpers like **include**, **repeat (loop)**, **or**, **and**, **livereload**...

<a name="exposed-helpers"></a>
### Exposed HTML/Handlebar's helpers

###### inline

* [$include](https://github.com/sixertoy/mustacher#include)
* [$image](https://github.com/sixertoy/mustacher#image)
* [$timestamp](https://github.com/sixertoy/mustacher#timestamp)
* [$livereload](https://github.com/sixertoy/mustacher#livereload)
* [$random](https://github.com/sixertoy/mustacher#random)
* [$ldim](https://github.com/sixertoy/mustacher#literals)
* [$rdim](https://github.com/sixertoy/mustacher#literals)

###### blocks

* [repeat](https://github.com/sixertoy/mustacher#repeat)
* [and](https://github.com/sixertoy/mustacher#and)
* [or](https://github.com/sixertoy/mustacher#or)
* [equal](https://github.com/sixertoy/mustacher#equal)

<a name="documentation"></a>
## Documentation & examples

> [Grunt examples in repository's sub branch](https://github.com/sixertoy/grunt-mustacher/tree/examples)

> [Take a look at mustacher module for a full documentation](https://www.npmjs.com/package/mustacher)


<a name="install"></a>
## Install

```shell
npm install grunt-mustacher --save-dev
```

<a name="issues"></a>
## Issues

**not yet implemented**

- Lorem Ipsum

[grunt-img]: https://cdn.gruntjs.com/builtwith.png

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/mustacher
[coverall-img]: https://img.shields.io/coveralls/sixertoy/mustacher.svg?style=flat-square

[npm-url]: https://npmjs.org/package/grunt-mustacher
[npm-version-img]: http://img.shields.io/npm/v/grunt-mustacher.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/grunt-mustacher.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/grunt-mustacher
[travis-img]: http://img.shields.io/travis/sixertoy/grunt-mustacher.svg?style=flat-square
