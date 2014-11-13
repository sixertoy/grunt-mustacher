# Mustacher [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Handlebars template (.tpl, .hbs) Helpers!
> [Home] (http://malas34.github.io/grunt-mustacher/)

## Availables helpers

### Repeat
```html
<ul>
{{#repeat 4}}
<li class="{{@class}}">item {{@zindex}} {{@index}} of {{@of}} - {{@first}} {{@last}}</li>
{{/repeat}}
</ul>
```

> render

```html
<ul>
<li class="odd first">item 0 1 of 4 - true</li>
<li class="even">item 1 2 of 4 - false</li>
<li class="odd">item 2 3 of 4 - false</li>
<li class="even last">item 3 4 of 4 - true</li>
</ul>
```

### Timestamp
```html
<p><img src="http://placehold.it/300?{{$timestamp}}" alt="" title="" /></p>
```

> render

```html
<p><img src="http://placehold.it/300?[n(13)]" alt="" title="" /></p>
```

## The "mustacher" task

### Requirements

#### Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

#### [Q](http://documentup.com/kriskowal/q/) `^1.1.1`

A tool for making and composing asynchronous promises in JavaScript

#### [Lo-Dash](https://lodash.com) `^2.4.1`

A utility library delivering consistency, customization, performance, & extras.

#### Handlebars `^2.0.0`

[Handlebars](http://handlebarsjs.com) provides the power necessary to let you build semantic templates effectively with no frustration.

Handlebars is largely compatible with Mustache templates. In most cases it is possible to swap out Mustache with Handlebars and continue using your current templates.

### Examples

#### Install

```shell
npm install mustacher --save-dev
```

#### Task

> In your project's Gruntfile, add a section named `mustacher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    mustacher: {
        compile: {
            files: [{
                src: 'templates/index.tpl',
                dest: 'html/index.html'
            }, {
                src: 'templates/head.tpl',
                dest: 'html/head.html'
            }]
        }
    },
});
```

> Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('mustacher');
```
