<a name="description"></a>
# Grunt Mustacher Task

[![Built with Grunt][grunt-img]](http://gruntjs.com/) [![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coverall-img]][coverall-url]

> **Grunt task build over [Mustacher module](https://www.npmjs.com/package/mustacher)**

> Designed for fit my own needs to build HTML static pages. Perfect for templating eZPublish, Magento, Drupal... CMS models

> It provide an easy way to **include** handlebar's partials files inside HTML template page with a minimal list of helpers like **repeat (loop)**, **or**, **and**.

<a name="exposed-helpers"></a>
### Exposed HTML/Handlebar's helpers

> **[See mustacher's full documentation](https://github.com/sixertoy/mustacher)**

###### inline

* [$include](#include)
* [$image](#image)
* [$timestamp](#timestamp)
* [$livereload](#livereload)
* [$random](#random)
* [$ldim](#literals)
* [$rdim](#literals)

###### blocks

* [repeat](#repeat)
* [and](#and)
* [or](#or)
* [equal](#equal)

## Examples

> [More usage at grunt-mustacher's example branch](https://github.com/sixertoy/grunt-mustacher/tree/examples)

<a name="install"></a>
## Install

```shell
npm install grunt-mustacher --save-dev
```

## Issues

**not yet implemented**

- Lorem Ipsum

[grunt-img]: https://cdn.gruntjs.com/builtwith.png

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/mustacher
[coverall-img]: https://img.shields.io/coveralls/sixertoy/mustacher.svg?style=flat-square

[npm-url]: https://npmjs.org/package/mustacher
[npm-version-img]: http://img.shields.io/npm/v/mustacher.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/mustacher.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/mustacher
[travis-img]: http://img.shields.io/travis/sixertoy/mustacher.svg?style=flat-square
