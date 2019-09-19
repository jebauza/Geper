<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


/*Route::get('/', function()
{
    return View::make('persona.persona');
});*/

Route::any('/login', [
    "as"=>"showlogin",
    "uses"=>"AuthController@login"
]);


Route::group(array('before'=>'authUsuario'),function(){

    Route::any('/', [
        "as"=>"index",
        "uses"=>"AuthController@index"
    ]);

    Route::any('/logout', [
        "as"=>"logout",
        "uses"=>"AuthController@logOut"
    ]);

    Route::group(array('before'=>'moduloConfiguracion'),function(){
        //USUARIO
        Route::post('/configuracion/usuario/insertar', [
            "as"=>"insertar_usuario",
            "uses"=>"UsuarioController@insertar"
        ]);
        Route::any('/configuracion/usuario/datos', [
            "as"=>"mostrar_datos",
            "uses"=>"UsuarioController@datos"
        ]);
        Route::post('/configuracion/usuario/editar', [
            "as"=>"insertar_usuario",
            "uses"=>"UsuarioController@insertar"
        ]);
        Route::any('/configuracion/usuario/listar', [
            "as"=>"listar_usuarios",
            "uses"=>"UsuarioController@listar_todos"
        ]);
        Route::any('/configuracion/usuario/eliminar', [
            "as"=>"eliminar_usuarios",
            "uses"=>"UsuarioController@eliminar"
        ]);
        Route::post('/configuracion/usuario/cambiar_pass', [
            "as"=>"cambiar_password_usuario",
            "uses"=>"UsuarioController@cambiar_password"
        ]);
        Route::post('/configuracion/usuario/asignar_rol', [
            "as"=>"asignar_rol",
            "uses"=>"UsuarioController@asignar_rol"
            //espero un id_usuarioy un id_rol
        ]);

        //ROL
        Route::post('/configuracion/rol/insertar', [
            "as"=>"insertar_rol",
            "uses"=>"RolController@insertar"
        ]);
        Route::any('/configuracion/rol/listar', [
            "as"=>"listar_rol",
            "uses"=>"RolController@listar_todos"
        ]);
        Route::any('/configuracion/rol/eliminar', [
            "as"=>"eliminar_rol",
            "uses"=>"RolController@eliminar"
        ]);
        Route::post('/configuracion/rol/modificar', [
            "as"=>"modificar_rol",
            "uses"=>"RolController@modificar"
        ]);


        //MODULO
        Route::any('/configuracion/modulo/arbol_modulos_con_acciones', [
            "as"=>"arbol_modulos_con_acciones",
            "uses"=>"ModuloController@arbol_modulos_con_acciones"
        ]);
        Route::any('/configuracion/modulo/arbol_modulos_con_acciones_marcadas_rol', [
            "as"=>"arbol_modulos_con_acciones_marcadasLasDeRol",
            "uses"=>"ModuloController@arbol_modulos_con_acciones_marcadasLasDeRol"
        ]);
        Route::any('/configuracion/modulo/permisos_usuario_modulo', [
            "as"=>"permisos_usuario_modulo",
            "uses"=>"AuthController@permisosUsuarioPorModulo"
        ]);


    });

    Route::group(array('before'=>'moduloRRHH'),function(){

        Route::any('/rrhh/personas/personas-del-dominio-sin-sistema', [
            "as"=>"personasDominioSinSistema",
            "uses"=>"PersonaController@personas_Dominio_Sin_Sistemas"
        ]);

        Route::any('/rrhh/personas/all', [
            "as"=>"all_personas",
            "uses"=>"PersonaController@todas_Personas"
        ]);

        Route::any('/rrhh/personas/save-foto-temp', [
            "as"=>"save_foto_temp",
            "uses"=>"PersonaController@save_foto_temp"
        ]);

        Route::any('/rrhh/personas/insertar', [
            "as"=>"insertar_persona",
            "uses"=>"PersonaController@insertar"
        ]);

    });

});

App::missing(function($exception){
    echo "No encontro Ruta";die;
    return Response::view('error.error404',[],404);
});




