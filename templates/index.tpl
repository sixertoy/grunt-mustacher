<ul>
    {{#repeat 2}}
    <li>
        <b>{{@zindex}}</b>
        <ul>
            {{#repeat 4}}
            <li class="{{@class}}">item {{@../zindex}} {{@zindex}} {{@index}} of {{@of}} - {{@first}} {{@last}}</li>
            {{/repeat}}
        </ul>
    </li>
    {{/repeat}}
</ul>

<p>
    <img src="http://placehold.it/300?{{$timestamp}}" alt="" title="" />
</p>

{{#equal 3 4 class="hashes"}}
<span>Egal</span>
{{else}}
<span>Pas egal</span>
{{/equal}}
