<?php

class ModuloController extends BaseController {

    public function arbol_modulos_con_acciones()
    {
        $id = Input::get("node");
        $modulos = Modulo::all();
        $nodes = [];
        foreach($modulos as $m)
        {
            if($m->acciones()->count()<1)
            {
                $nodes[] =  array('id'=>$m->id_modulo,'text'=>$m->nomb_modulo);
            }
            else
            {
                $modulo = array('id'=>$m->id_modulo,'text'=>$m->nomb_modulo,'files'=>[]);
                $acciones = $m->acciones()->get();
                foreach($acciones as $a)
                {
                    $modulo['files'][] = [
                        'id'=>$a->id_accion,
                        'text'=>$a->nombre,
                        'checked'=>false,
                        'leaf'=>true
                    ];
                }
                $nodes[] = $modulo;
            }
        }
        if(is_numeric($id)){	//Paso 3
            $nodes = isset($nodes[$id-1]['files'])?$nodes[$id-1]['files']:array();
        }
        return Response::json($nodes);
    }

    public function arbol_modulos_con_acciones_marcadasLasDeRol()
    {
        $id = Input::get("node");
        $id_rol = Input::get("id_rol");
        $nodes = [];
        $modulos = Modulo::with(array('acciones', 'acciones.roles'))->get();
        if(is_numeric($id_rol))
        {
            foreach($modulos as $m)
            {
                if($m->acciones()->count()<1)
                {
                    $nodes[] =  array('id'=>$m->id_modulo,'text'=>$m->nomb_modulo);
                }
                else
                {
                    $modulo = array('id'=>$m->id_modulo,'text'=>$m->nomb_modulo,'files'=>[]);
                    $acciones = $m->acciones()->get();
                    foreach($acciones as $a)
                    {
                        $checked = false;
                        if($a->roles()->find($id_rol))
                            $checked = true;
                        $modulo['files'][] = [
                            'id'=>$a->id_accion,
                            'text'=>$a->nombre,
                            'checked'=>$checked,
                            'leaf'=>true
                        ];
                    }
                    $nodes[] = $modulo;
                }
            }

        }
        if(is_numeric($id)){
            $nodes = isset($nodes[$id-1]['files'])?$nodes[$id-1]['files']:array();
        }
        return Response::json($nodes);
    }



}
