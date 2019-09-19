<?php

class RolController extends BaseController {

    public function insertar()
    {
        $resp = ['success' => false,'msg'=>"No se puede insertar el rol ".Input::get("rol")."en el Sistema"];
        $campos = [
            'rol'=>Input::get("nombre"),
            'descripcion'=>Input::get("descripcion")
        ];
        $reglas = [
            'rol'=>'required|unique:tb_rol,rol',
            'descripcion'=>'required'
        ];
        $mensajesError = [
            'rol.required'=>'El nombre de rol es requerido',
            'rol.unique'=>'El rol '.$campos['rol'].' ya existe en el Sistema"',
            'descripcion.required'=>'La descripcion es requerido'
        ];
        $validar = Validator::make($campos, $reglas,$mensajesError);
        if(!$validar->passes())
        {
            $resp['msg'] = $validar->errors()->all()[0];
        }
        else
        {
            $newRol = new Rol();
            $newRol->rol = $campos['rol'];
            $newRol->descripcion = $campos['descripcion'];
            if($newRol->save())
            {
                $arrIdAcciones = json_decode(stripslashes($_POST['acciones']),true);
                $newRol->acciones()->sync($arrIdAcciones);
                /*if(isset($arrIdAcciones[0]))
                {
                    foreach($arrIdAcciones as $id_accion)
                    {
                        $newRol->acciones()->attach($id_accion);
                    }
                }*/
                $resp['success'] = true;
                $resp['msg'] = "El rol ".$campos['rol']." se inserto en el Sistema";
            }
        }
        return Response::json($resp);
    }

    public function eliminar()
    {
        $resp = ['success' => false,'msg'=>"No se puede eliminar el rol del Sistema"];
        $campos = [
            'id_rol'=>Input::get("id_rol")
        ];
        $reglas = [
            'id_rol'=>'required|exists:tb_rol,id_rol'
        ];
        $mensajesError = [
            'id_rol.required'=>'El id del rol es requerido',
            'rol.exists'=>'No existe en el Sistema un rol con ese identificador'
        ];
        $validar = Validator::make($campos, $reglas,$mensajesError);
        if(!$validar->passes())
        {
            $resp['msg'] = $validar->errors()->all()[0];
        }
        else
        {
            $rol = Rol::find($campos['id_rol']);
            if($rol->delete())
            {
                $resp = ['success' => true,'msg'=>"El rol ".$rol->rol." se elimino correctamente del Sistema"];
            }
        }
        return Response::json($resp);
    }

    public function modificar()
    {
        $resp = ['success' => false,'msg'=>"No se puede modificar el rol ".Input::get("nombre")." en el Sistema"];
        $campos = [
            'rol'=>Input::get("nombre"),
            'descripcion'=>Input::get("descripcion"),
            'id_rol'=>Input::get("id")
        ];
        $reglas = [
            'rol'=>'required',
            'descripcion'=>'required',
            'id_rol'=>'required|exists:tb_rol,id_rol'
        ];
        $mensajesError = [
            'rol.required'=>'El nombre de rol es requerido',
            'descripcion.required'=>'La descripcion es requerido',
            'id_rol.required'=>'El identificador del rol es requerido',
            'id_rol.exists'=>'El identificador del rol no es valido en el Sistema'
        ];
        $validar = Validator::make($campos, $reglas,$mensajesError);
        if(!$validar->passes())
        {
            $resp['msg'] = $validar->errors()->all()[0];
        }
        elseif(Rol::where('id_rol','<>',$campos['id_rol'])->where('rol','=',$campos['rol'])->first())
        {
            $resp['msg'] = "Existe ya un rol con el nombre ".$campos['rol']." en el Sistema";
        }
        else
        {
            $rolUpdate = Rol::find($campos['id_rol']);
            $rolUpdate->rol = $campos['rol'];
            $rolUpdate->descripcion = $campos['descripcion'];
            DB::table('tb_acciones_roles')->where('id_rol','=',$campos['id_rol'])->delete();
            $arrIdAcciones = json_decode(stripslashes($_POST['acciones']),true);
            if($rolUpdate->save() && $rolUpdate->acciones()->sync($arrIdAcciones))
            {
                $resp['success'] = true;
                $resp['msg'] = "Se modifico con exito en el sistema el rol ".$rolUpdate->rol;
            }
        }
        return Response::json($resp);
    }

    public function listar_todos()
    {
        $todosRoles = Rol::all();
        $cant = 0;
        $arrRoles = [];
        foreach($todosRoles as $r)
        {
            $arrRoles[] = $r->toarray();
            $cant++;
        }
        $data = array(
            'success' => true,
            'total' => $cant,
            'data' => $arrRoles);
        return Response::json($data);
    }

    public function arbol_modulosy_acciones()
    {
        $id = Input::get("node");
        //$id_rol = Input::get("id_rol");
        $id_rol = 7;
        $nodes = [];
        $modulos = [];
        $numModulo = [];
        if(is_numeric($id_rol))
        {
            $accionesRol = Rol::find($id_rol)->acciones()->get();
            foreach($accionesRol as $acc)
            {
                $moduloAcc = $acc->modulo()->first();
                if(!in_array($moduloAcc->nomb_modulo, $modulos))
                {
                    $modulo = [
                        'id'=>$moduloAcc->id_modulo,
                        'text'=>$moduloAcc->nomb_modulo,
                        'files'=>[[
                            'id'=>$acc->id_accion,
                            'text'=>$acc->nombre,
                            'checked'=>false,
                            'leaf'=>true
                        ]]];
                    $nodes[] = $modulo;
                    $modulos[] = $moduloAcc->nomb_modulo;
                    $numModulo[$moduloAcc->nomb_modulo] = count($nodes)-1;
                }
                else
                {
                    $nodes[$numModulo[$moduloAcc->nomb_modulo]]['files'][] = [
                        'id'=>$acc->id_accion,
                        'text'=>$acc->nombre,
                        'checked'=>false,
                        'leaf'=>true
                    ];
                }
            }
        }
        if(is_numeric($id)){
            $nodes = isset($nodes[$id-1]['files'])?$nodes[$id-1]['files']:array();
        }
        return Response::json($nodes);
    }










}
