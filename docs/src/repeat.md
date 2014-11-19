# Repeat Helper

## Available properties

> locales

```html
{{of}}
{{count}}
{{class}}
```

> globales

```html
{{@index}}
{{@first}}
{{@last}}
{{@odd}}
{{@even}}
```

## Usage

### Loop

```html
<ul>
    {{#repeat 4}}
    <li class="{{class}}">item {{@index}} {{count}} of {{of}} - {{@first}} {{@last}}</li>
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
    <li class="{{#if @first}}default{{/if}}">
        <b>Parent {{@index}}</b>
        <ul>
        {{#repeat 4}}
        <li class="{{class}} {{#if @../first}}default{{/if}}">
            <i>Child {{@../index}}-{{count}} of {{of}}</i>
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
    <li class="default">
        <b>Parent 0</b>
        <ul>
            <li class="odd first default">
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
    <li class="">
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
