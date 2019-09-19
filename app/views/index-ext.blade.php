<!DOCTYPE html>
<html>

<head id="meta" lang="en">
    <meta charset="UTF-8">
    <title>Geper 4- {{str_replace('/login', '', URL::previous())}}</title>

<!-- CSS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!-- CSS-->
    {{ HTML::style('/ext-3.2.1/resources/css/ext-all.css'); }}

    <!-- FILTERS-->
    {{ HTML::style('app/plugin/filter/css/GridFilters.css'); }}
    {{ HTML::style('app/plugin/filter/css/RangeMenu.css'); }}



    <!-- MENSAGE-->
        {{ HTML::style('app/plugin/mensages/css/examples.css'); }}
        {{ HTML::style('app/plugin/fileuploadfield/css/fileuploadfield.css'); }}

    <!-- LOGO-->
        <link rel="icon" type="image/x-icon" href="{{URL::to('imags/logo_geper.jpg')}}" />

    <!-- MENSAGE-->
            {{ HTML::style('app/view/css/icons.css'); }}
            {{ HTML::style('app/view/css/principal.css'); }}
<!-- JS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!-- EXT 3.2.1 -->
    {{ HTML::script('ext-3.2.1/adapter/ext/ext-base.js'); }}
    {{ HTML::script('ext-3.2.1/ext-all-debug.js'); }}
    {{ HTML::script('ext-3.2.1/src/locale/ext-lang-es.js'); }}

     {{ HTML::script('app/plugin/fileuploadfield/FileUploadField.js'); }}


    <!-- MENSAGE
             {{ HTML::script('app/plugin/mensages/js/examples.js'); }}-->

    <!-- VISTA -->
    {{ HTML::script('app/view/Principal.js'); }}
    {{ HTML::script('app/view/Viewport.js'); }}

    <!-- FILTERS -->
        {{ HTML::script('app/plugin/filter/js/menu/RangeMenu.js'); }}
        {{ HTML::script('app/plugin/filter/js/menu/ListMenu.js'); }}
        {{ HTML::script('app/plugin/filter/js/GridFilters.js'); }}
        {{ HTML::script('app/plugin/filter/js/Filter.js'); }}
        {{ HTML::script('app/plugin/filter/js/StringFilter.js'); }}
        {{ HTML::script('app/plugin/filter/js/DateFilter.js'); }}
        {{ HTML::script('app/plugin/filter/js/ListFilter.js'); }}
        {{ HTML::script('app/plugin/filter/js/NumericFilter.js'); }}
        {{ HTML::script('app/plugin/filter/js/BooleanFilter.js'); }}



    <!-- MODULOS APP -->
    @if(isset($CONFIGURACION))
     {{ HTML::script('app/view/persona/Persona.js'); }}
          {{ HTML::script('app/view/configuracion/Configuracion.js'); }}
             {{ HTML::script('app/view/persona/CrudPersona.js'); }}
     <!-- Usuarios -->
      {{ HTML::script('app/view/configuracion/CrudUsuario.js'); }}
      {{ HTML::script('app/store/configuracion/StUsuario.js'); }}
      {{ HTML::script('app/store/configuracion/StPersona.js'); }}
      <!-- Rol -->
      {{ HTML::script('app/view/configuracion/CrudRol.js'); }}
      {{ HTML::script('app/store/configuracion/StRol.js'); }}
    @endif


</head>
<body>
 <input type="hidden" id="base" value="{{str_replace('/login', '', URL::previous())}}"/>
 <input type="hidden" id="acciones" value="{{$objAcciones}}"/>
</body>
</html>