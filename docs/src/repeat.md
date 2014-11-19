# Repeat Helper

## Available properties
```html
{{@zindex}}
{{@index}}
{{@of}}
{{@first}}
{{@last}}
{{@class}}
```

## Usage

### Loop

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

### Nested loop

```html
<ul>
    {{#repeat 2}}
    <li class="{{#if @first}}first{{/if}}{{#if @last}}last{{/if}}">
        <b>Parent {{@zindex}}</b>
        <ul>
        {{#repeat 4}}
        <li class="{{@class}}">
            <i>Child {{@../zindex}}-{{@index}} of {{@of}}</i>
        </li>
        {{/repeat}}
        </ul>
    </li>
    {{/repeat}}
</ul>
```

> render

```html
<ul>
    <li class="first">
        <b>Parent 0</b>
        <ul>
            <li class="odd first">
                <i>Child 0-1 of 4</i>
            </li>
            <li class="even">
                <i>Child 0-2 of 4</i>
            </li>
            <li class="odd">
                <i>Child 0-3 of 4</i>
            </li>
            <li class="even last">
                <i>Child 0-4 of 4</i>
            </li>
        </ul>
    </li>
    <li class="last">
        <b>Parent 1</b>
        <ul>
            <li class="odd first">
                <i>Child 1-1 of 4</i>
            </li>
            <li class="even">
                <i>Child 1-2 of 4</i>
            </li>
            <li class="odd">
                <i>Child 1-3 of 4</i>
            </li>
            <li class="even last">
                <i>Child 1-4 of 4</i>
            </li>
        </ul>
    </li>
</ul>
```
