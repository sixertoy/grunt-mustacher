# Mustacher

> Handlebars template (.tpl, .hbs) Helpers!
> [Home] (http://malas34.github.io/grunt-mustacher/)

## The "mustacher" task
In your project's Gruntfile, add a section named `mustacher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    mustacher: {
        compile: {
            files: [
                {
                    src: 'output/mustache/index.hbs',
                    dest: 'output/html/index.html'
                }
            ]
        },
        templates:{
            options: {
                output: '.tpl'
            },
            files: [{
                expand: true,
                cwd: 'output/mustache/commons/',
                src: '**/*.hbs',
                dest: 'output/tpl/commons/',
            }]
        },
        html:{
            options: {
                output: '.html'
            },
            files: [{
                expand: true,
                cwd: 'html/tpl/',
                src: '*.tpl',
                dest: 'html/html/',
            }]
        }
    },
});
```

## Usage Examples

### Repeat
```html
<ul>
{{#repeat 4}}
<li>repeat {{@index}}</li>
{{/repeat}}
</ul>
```
> <ul>
> <li>repeat 0</li>
> <li>repeat 1</li>
> <li>repeat 2</li>
> <li>repeat 3</li>
> </ul>

### Equal
```html
{{#equal 0 10}}
<p>is equal</p>
{{else}}
<p>is not equal</p>
{{/equal}}
```
> <p>is not equal</p>

### Timestamp
```html
{{$timestamp}}
```
> <p><img src="http://placehold.it/300?[n(13)]" alt="" title="" /></p>

### Image
```html
{{$image 300}}
{{$image 400 300}}
```
> <p><img src="http://placehold.it/300" alt="" title="" /></p>
> <p><img src="http://placehold.it/400x300" alt="" title="" /></p>

### Random
```html
{{$random}}
{{$random O}}
{{$random true}}
{{$random 10}}
{{$random true 5}}
{{$random false 5 10}}
```
> <p>n,nnn... [0,x]</p>
> <p>0</p>
> <p>0</p>
> <p>n [0,x]</p>
> <p>n,nnn... [0,10]</p>
> <p>n [0,5]</p>
> <p>n,nnn... [5,10]</p>

### Lorem
``` html
{{$lorem 10}}
```
> <p>ullamco Lorem eiusmod sint veniam officia proident dolore adipisicing eu</p>

## Getting Started

This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install mustacher --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('mustacher');
```

## History


> please see [HISTORY.md](https://github.com/malas34/grunt-mustacher/blob/v1.0.0a/HISTORY.md)


## Todo

> please see [TODO.md](https://github.com/malas34/grunt-mustacher/blob/v1.0.0a/TODO.md)
