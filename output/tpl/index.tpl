{{$include 'commons/head'}}

<h1>Equal Helper</h1>
{{#equal 10 0}}
<p>egale</p>
{{else}}
<p>not egale</p>
{{/equal}}




{{@outputExtension}}


<h1>Random Helper</h1>
<p>{{$random 0}}</p>
<p>{{$random 10 20}}</p>

<h1>Lorem Helper</h1>
<p>{{$lorem 10}}</p>

<h1>Image Helper</h1>
<p>{{$image 300}}</p>
<p>{{$image 400 300}}</p>

<h1>Timestamp Helper</h1>
<p>{{$timestamp}}</p>

<h1>Repeat Helper</h1>
<ul>
    {{#repeat 4}}
    <li class="{{@classes}}">Repeat {{@index}} {{@odd}} {{@even}} {{@first}} {{@last}}</li>
    {{/repeat}}
</ul>

{{$include 'commons/footer'}}
