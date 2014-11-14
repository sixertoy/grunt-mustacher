<ul>
    {{#repeat 3}}
    <li>
        <b>{{count}} of {{of}}</b>
        <ul>
        {{#repeat 4}}
            <li class="{{class}}">{{@../index}}.{{@index}} / {{count}} of {{of}}</li>
        {{/repeat}}
        </ul>
    </li>
    {{/repeat}}
</ul>
