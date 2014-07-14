# Mustacher

> Handlebars template (.tpl, .hbs) Helpers!

## The "mustacher" task
In your project's Gruntfile, add a section named `mustacher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mustacher: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

## Usage Examples

```html
{{repeat}{{#repeat}
{{$rand '8:32'}}
{{$timestamp}}
{{$dummy}}
{{$lorem "w10"}} (w=word,p=paragrapg,s=sentence)
{{$include "path/file_noextension"}}

{{$lorem 'w:40'}}
{{$lorem 'p:20'}}
{{$lorem 's:10'}}
```
### Loops
```html
<ul>
{{#repeat '5'}}
<li>
    <a href="" class="item_{{index}}"><span>Periode bleue</span></a>
</li>
{{/repeat}}
</ul>
```
> <ul>
>   <li><a href="" class="item_0"><span>Periode bleue 0</span></a></li>
>   <li><a href="" class="item_1"><span>Periode bleue 1</span></a></li>
>   <li><a href="" class="item_2"><span>Periode bleue 2</span></a></li>
>   <li><a href="" class="item_3"><span>Periode bleue 3</span></a></li>
>   <li><a href="" class="item_4"><span>Periode bleue 4</span></a></li>
> </ul>

## Getting Started

This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install mustacher --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('mustacher');


