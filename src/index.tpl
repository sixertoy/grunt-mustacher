<!DOCTYPE html>
<html>

<head>
    {{$include 'commons/head'}}
</head>

<body>
    <div id="page">
        <section>
            <h2>Literal (AngularJS)</h2>
            <ul>
                <li>{{$ldim}}$ldim $rdim{{$rdim}}</li>
            </ul>
        </section>
        <section>
            <h2>Random Helper</h2>
            <ul>
                <li>{{$ldim}}$random 30{{$rdim}}: <b>{{$random 30}}</b></li>
                <li>{{$ldim}}$random 30{{$rdim}}: <b>{{$random 30}}</b></li>
                <li>{{$ldim}}$random 30{{$rdim}}: <b>{{$random 30}}</b></li>
                <li>{{$ldim}}$random 30 true{{$rdim}}: <b><span>{{$random 30 true}}</span></b></li>
                <li>{{$ldim}}$random 10 20{{$rdim}}: <b>{{$random 10 20}}</b></li>
            </ul>
        </section>
        <section>
            <h2>Include Templates</h2>
            {{$include 'commons/conditions/or_and_equal'}}
            <h2>Include With Root Variables</h2>
            {{$include 'commons/includes/variables'}}
            <h2>Include Error</h2>
            {{$include 'commons/non_exists'}}
        </section>
        <section>
            <h2>Timestamp Helper</h2>
            <p>First timestamp is less than second by ~10ms</p>
            <p>{{$timestamp}} < {{$timestamp 10}}</p>
            <p>First timestamp is less than second by ~100ms</p>
            <p>{{$timestamp}} < {{$timestamp 100}}</p>
        </section>
        <section>
            <h2>Repeat Helper Nested With Variables</h2>
            <ul>
                {{#repeat 3}}
                <li>
                    <b>{{count}} of {{of}}</b>
                    <ul>
                        {{#repeat 4}}
                        <li class="{{class}} {{#if @../first}}{{#if @first}}default{{/if}}{{/if}}">
                            <span>{{@../index}}.{{@index}} / {{count}} of {{of}}</span> {{#repeat 20}}
                            <a href="{{class}}">{{@../../index}}.{{@../index}}.{{@index}}</a> {{/repeat}}
                        </li>
                        {{/repeat}}
                    </ul>
                </li>
                {{/repeat}}
            </ul>
            {{$livereload 1337}}
        </section>
    </div>
</body>

</html>