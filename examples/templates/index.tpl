{{$include 'commons/head'}}
<ul>
    {{#repeat 3}}
    <li>
        <b>{{count}} of {{of}}</b>
        <ul>
        {{#repeat 4}}
            <li class="{{class}} {{#if @../first}}{{#if @first}}default{{/if}}{{/if}}">
                <span>{{@../index}}.{{@index}} / {{count}} of {{of}}</span>
                {{#repeat 20}}
                <a href="{{class}}">{{@../../index}}.{{@../index}}.{{@index}}</a>
                {{/repeat}}
            </li>
        {{/repeat}}
        </ul>
    </li>
    {{/repeat}}
</ul>
{{$livereload}}
