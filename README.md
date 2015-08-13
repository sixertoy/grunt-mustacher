<a name="mustacher"></a>
# Mustacher

[![Built with Grunt][grunt-img]](http://gruntjs.com/) [![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coverall-img]][coverall-url]

> Provide an easy way to include handlebars (mustache) partials files inside HTML template page with a few helpers list like repeat, or, and. AngularJs compliant


<a name="exposed-helpers"></a>
## Exposed helpers

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

### inline

> more examples on [branch](https://github.com/sixertoy/grunt-mustacher/tree/examples)

<a name="include"><a>
### $include

```html
<div class="part">
    {{$include 'relative/to/root/path/to/template'}}
</div>
```

<a name="image"><a>
### $image (default width: 300)

```html
<div class="image">
    {{$image}}
</div>
```

```html
<div class="image">
    {{$image 300}}
</div>
```

```html
<div class="image">
    {{$image 300 200}}
</div>
```

<a name="timestamp"><a>
### $timestamp

```html
<img src="my/file.png?{{$timestamp}}" alt="" title="">
```

```html
<img src="my/file.png?{{$timestamp 20}}" alt="" title="">
```

<a name="livereload"><a>
### $livereload

```html
<div id="footer">
    {{$livereload 1337}}
</div>
```

<a name="random"><a>
### $random

```html
<span>
    <b>{{$random 1 31}}</b>
    <strong>>Juanary</strong>
    <em>1970</em>
</span>
```

```html
<span>{{$random 0 1 true}}</span>
```

<a name="literals"><a>
### literal

#### $ldim
```html
{{$ldim}}toto
{{$ldim}}toto{{$rdim}}
```

#### $rdim
```html
toto{{$rdim}}
{{$ldim}}toto{{$rdim}}
```

#### raw
```html
{{{{raw}}}}
{{toto}}
{{{{/raw}}}}
```

### blocks

<a name="repeat"><a>
#### #repeat

```html
<ul>
    {{#repeat 4}}
    <li class="{{class}}">
        <a href="" alt="{{count}} of {{of}}">item </a>
        <ul>
        {{#repeat}}
            <li class="{{#if @first}}first{{/if}}">
                <span>sub item {{@../index}}/{{@index}}</span>
            </li>
        {{/repeat}}
        </ul>
    </li>
    {{/repeat}}
</ul>
```

<a name="and"><a>
### #and

```html
{{#and true false...}}
<span>fail</span>
{{else}}
<span>success</span>
{{/and}}
```

<a name="or"><a>
### #or

```html
{{#or true false ...}}
<span>success</span>
{{else}}
<span>fail</span>
{{/or}}
```

<a name="equal"><a>
### #equal

```html
{{#equal 'toto' 'blague'}}
<span>fail</span>
{{else}}
<span>success</span>
{{/equal}}
```

<a name="the-mustacher-task"></a>
## The "mustacher" task

<a name="install"></a>
#### Install

```shell
npm install grunt-mustacher --save-dev
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
        compact: {
            files: {
                'html/index.html': 'src/index.tpl'
            }
        },
        all: {
            files: [{
                cwd: '.',
                ext: '.html',
                expand: true,
                flatten: true,
                filter: 'isFile',
                dest: 'html/',
                src: ['src/**/*.tpl']
            }]
        }
    }
});
```

> Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-mustacher');
```

## Issues

**not yet implemented**

- Lorem Ipsum
- Image w/ placehold.it

## Changelog

<a name="requirements"></a>
## Requirements

- [Handlebars](http://handlebarsjs.com) ^3.0.3
- [Lo-Dash](https://lodash.com) ^3.10.1
- [Q](http://documentup.com/kriskowal/q/) ^1.4.1
- [Grunt](http://gruntjs.com/) ~0.4.5
- [lorem-ipsum](https://www.npmjs.com/package/lorem-ipsum) ^1.0.3

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
