<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Geper-{{str_replace('/login', '', URL::previous())}}</title>
<!-- CSS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <!-- CSS-->
        {{ HTML::style('/ext-3.2.1/resources/css/ext-all.css'); }}

        <!-- LOGO-->
        <link rel="icon" type="image/x-icon" href="{{URL::to('imags/logo_geper.jpg')}}" />

<!-- JS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!-- EXT 3.2.1 -->
    {{ HTML::script('ext-3.2.1/adapter/ext/ext-base.js'); }}
    {{ HTML::script('ext-3.2.1/ext-all-debug.js'); }}
    {{ HTML::script('ext-3.2.1/src/locale/ext-lang-es.js'); }}

    <!-- VISTA -->
    {{ HTML::script('app/view/Login.js'); }}

</head>
<body>
<input type="hidden" id="base" value="{{str_replace('/login', '', URL::previous())}}"/>

</body>
</html>