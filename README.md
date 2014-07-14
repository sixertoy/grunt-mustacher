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
{{$rand '8:32'}}
{{$timestamp}}
{{$dummy}}
{{$include "path/file_noextension"}}
```
### Lorem Ipsum
```html
<p>{{$lorem 'w:10'}}</p>
```
> <p>et laborum ullamco incididunt adipisicing excepteur sit ea et est</p>

```html
<p>{{$lorem 'p:2'}}</p>
```
> <p>Cillum nostrud elit culpa laboris. Qui est id ad ad aute eiusmod ipsum reprehenderit commodo id. Ullamco nulla culpa sint enim tempor velit. Consectetur aliqua non sint commodo consequat duis ex quis. Et culpa proident nulla do cillum nisi tempor ad irure id ea. Quis nostrud nisi officia laborum laboris ullamco nulla. Velit id occaecat anim labore aute qui elit. Nulla aute nisi quis elit proident ut proident duis aute. Consequat aliqua nisi Lorem minim officia magna dolore ad do nisi reprehenderit non do. Aliqua quis sunt enim cupidatat do minim occaecat est velit nostrud consequat officia nostrud esse.</p>

### Loops
```html
<ul>
{{#repeat '5'}}
<li>
    <a href="" class="item_{{@index}}"><span>Lorem Ipsum</span></a>
</li>
{{/repeat}}
</ul>
```
> <ul>
>   <li><a href="#" class="item_0"><span>Lorem Ipsum</span></a></li>
>   <li><a href="#" class="item_1"><span>Lorem Ipsum</span></a></li>
>   <li><a href="#" class="item_2"><span>Lorem Ipsum</span></a></li>
>   <li><a href="#" class="item_3"><span>Lorem Ipsum</span></a></li>
>   <li><a href="#" class="item_4"><span>Lorem Ipsum</span></a></li>
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


