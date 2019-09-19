<?php

class UsuarioController extends BaseController {

    public function insertar()
   {
       $resp = ['success' => false];
       $campos = [
           'user'=>Input::get("usuario"),
           'password'=>Input::get("password"),
           'conexion'=>Input::get("conexion"),
       ];
       $reglas = [
           'user'=>'required|min:4|max:20|unique:tb_usuario,user',
           'password'=>'required|min:7|max:50',
           'conexion'=>'required',
       ];
       $mensajesError = [
           'user.required'=>'El usuario es requerido',
           'user.min'=>'El usuario debe contener más de 3 caracteres',
           'user.max'=>'El usuario debe contener como máximo 20 caracteres',
           'user.unique'=>'El usuario '.$campos['user'].' ya existe en la Base de Datos',
           'password.required'=>'La contraseña es requerido',
           'password.min'=>'la contraseña debe contener como minimo 7 caracteres',
           'password.max'=>'la contraseña debe contener máximo 50 caracteres',
           'conexion.required'=>'El campo conexión es requerido',
       ];
       $validarOperador = Validator::make($campos, $reglas,$mensajesError);
       if(!$validarOperador->passes())
       {
           $resp['msg'] = $validarOperador->errors()->all()[0];
       }
       else
       {
           if($campos['conexion'] == "local")
           {
               $campos['password'] = Hash::make($campos['password']);
           }
           else
           {
               $campos['password'] = null;
           }
           $newUsuario = new Usuario();
           $newUsuario->user = $campos['user'];
           $newUsuario->password = $campos['password'];
           $newUsuario->fecha_creacion = date('Y-m-d');
           $newUsuario->conexion = $campos['conexion'];
           if($newUsuario->save())
           {
               $resp['success'] = true;
               $resp['msg'] = 'El usuario '.$newUsuario->user.' se inserto con exito.';
               if($campos['conexion'] == "dominio" && isset($_POST["id_persona"]))
               {
                   $persona = Persona::where('deleted','=',0)
                       ->where('id_persona','=',$_POST["id_persona"])
                       ->first();
                   $persona->id_usuario = $newUsuario->id_usuario;
                   $persona->save();
               }
           }
           else
           {
               $resp['msg'] = 'Existio un error a la hora de insertar el usuario '.$campos['user'].' en la Base de Datos';
           }
       }
       return Response::json($resp);
   }

    public function datos()
    {
        $resp = ['success' => false,'msg'=>"El id_usuario es invalido"];
        if(isset($_GET['id_usuario']))
        {
          $campos = [
              'id_usuario'=>Input::get("id_usuario")
          ];
          $reglas = [
              'id_usuario'=>'required|numeric'
          ];
          $mensajesError = [
              'id_usuario.required'=>'El campo id_usuario es requerido',
              'id_usuario.numeric'=>'El campo id_usuario no es un numero',
          ];
          $validarCampos = Validator::make($campos, $reglas,$mensajesError);
          if(!$validarCampos)
          {
              $resp['msg'] = $validarCampos->errors()->all()[0];
          }
          else
          {
              $usuario = Usuario::where('id_usuario', '=', $campos['id_usuario'])
                  ->first();
              if($usuario)
              {
                  $resp['success'] = true;
                  $resp['datos'] = $usuario->to_array();
              }
          }
        }
        return Response::json($resp);
    }

    public function editar()
    {

    }

    public function listar_todos()
    {
        $todosUsuarios = Usuario::where('deleted','=',0)
          ->orderby('user')
          ->get();

        $cant = Usuario::where('deleted','=',0)->count();

        $arrUsuarios = [];
        foreach($todosUsuarios as $u)
        {
            $arrUsuarios[] = $u->toarray();
        }
        $data = array(
            'success' => true,
            'total' => $cant,
            'data' => $arrUsuarios);
        return Response::json($data);
    }

    public function eliminar()
    {
        $resp = ['success' => false];
        $campos = [
            'id_usuario'=>Input::get("id_usuario"),
        ];
        $reglas = [
            'id_usuario'=>'required|exists:tb_usuario,id_usuario'
        ];
        $mensajesError = [
            'id_usuario.required'=>'El id_usuario es requerido',
            'id_usuario.exists'=>'El id_usuario no es valido',
        ];
        $validar = Validator::make($campos, $reglas,$mensajesError);
        if(!$validar->passes())
        {
            $resp['msg'] = $validar->errors()->all()[0];
        }
        else
        {
            $usuario = Usuario::find($campos['id_usuario']);
            $usuario->deleted = 1;
            if($usuario->save())
            {
                $resp['success'] = true;
                $resp['msg'] = 'Se elimino correctamente el usuario '.$usuario->user.' del Sistema';
            }
        }
        return Response::json($resp);
    }

    public function cambiar_password()
    {
        $resp = ['success' => false];
        $campos = [
            'id_usuario'=>Input::get("id_usuario"),
            'password'=>Input::get("clave")
        ];
        $reglas = [
            'id_usuario'=>'required|exists:tb_usuario,id_usuario',
            'password'=>'required|min:7|max:50'
        ];
        $mensajesError = [
            'id_usuario.required'=>'El id usuario es requerido',
            'id_usuario.exists'=>'El id usuario no existe en el sistema',
            'password.required'=>'La contraseña es requerido',
            'password.min'=>'la contraseña debe contener como minimo 7 caracteres',
            'password.max'=>'la contraseña debe contener máximo 50 caracteres'
        ];
        $validar = Validator::make($campos, $reglas,$mensajesError);
        if(!$validar->passes())
        {
            $resp['msg'] = $validar->errors()->all()[0];
        }
        else
        {
            $campos['password'] = Hash::make($campos['password']);
            $usuario = Usuario::find($campos['id_usuario']);
            $usuario->password = $campos['password'];
            if($usuario->save())
            {
                $resp['success'] = true;
                $resp['msg'] = "La contraseña del usuario ".$usuario->user." se cambio con exito";
            }
            else
                $resp['msg'] = "Hubo un error al cambiar la contraseña";

        }
        return Response::json($resp);
    }

    public function asignar_rol()
    {
        $resp = ['success' => false,'msg'=>"No se pudo asignar el rol al usuario"];
        $campos = [
            'id_usuario'=>Input::get("id_usuario"),
            'id_rol'=>Input::get("id_rol")
        ];
        $reglas = [
            'id_usuario'=>'required|exists:tb_usuario,id_usuario',
            'id_rol'=>'required|exists:tb_rol,id_rol'
        ];
        $mensajesError = [
            'id_usuario.required'=>'El id usuario es requerido',
            'id_usuario.exists'=>'El id usuario no existe en el sistema',
            'id_rol.required'=>'La contraseña es requerido',
            'id_rol.exists'=>'El id rol no existe en el sistema'
        ];
        $validar = Validator::make($campos, $reglas,$mensajesError);
        if(!$validar->passes())
        {
            $resp['msg'] = $validar->errors()->all()[0];
        }
        else
        {
            $usuario = Usuario::find($campos['id_usuario']);
            $usuario->id_rol = $campos['id_rol'];
            if($usuario->save())
            {
                $resp['success'] = true;
                $rol = Rol::find($campos['id_rol']);
                $resp['msg'] = "Se asigno con exíito el rol de ".$rol->rol." al usuario ".$usuario->user.".";
            }
        }
        return Response::json($resp);
    }








}
