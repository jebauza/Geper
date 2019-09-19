<?php

class PersonaController extends BaseController {

    public function todas_Personas()
    {
        /*$start = isset($_POST['start']) ? Input::get("start") : 0; //posición a iniciar
        $limit = isset($_POST['limit']) ? Input::get("limit") : 10;*/
       $todasPersonas = Persona::where('deleted','=',0)
           ->orderby('nombre_completo')
           //->take($limit)
           //->skip($start)
           ->get();

        $cant = Persona::where('deleted','=',0)
            ->count();

        $arrPersonas = [];
        foreach($todasPersonas as $p)
        {
            $arrPersonas[] = $p->toarray();
        }
        $data = array(
            'success' => true,
            'total' => $cant,
            'data' => $arrPersonas);
        return Response::json($data);
    }

    public function personas_Dominio_Sin_Sistemas()
    {
        /*$start = isset($_POST['start']) ? Input::get("start") : 0; //posición a iniciar
        $limit = isset($_POST['limit']) ? Input::get("limit") : 10;*/
        $todasPersonasDominio = Persona::where('deleted','=',0)
            ->where('user_dominio','<>','')
            ->where('id_usuario','=',null)
            ->orderby('nombre_completo')
            //->take($limit)
            //->skip($start)
            ->get();

        $cant = Persona::where('deleted','=',0)
            ->where('user_dominio','<>','')
            ->where('id_usuario','=',null)
            ->count();

        $arrPersonas = [];
        foreach($todasPersonasDominio as $p)
        {
            $arrPersonas[] = $p->toarray();
        }
        $data = array(
            'success' => true,
            'total' => $cant,
            'data' => $arrPersonas);
        return Response::json($data);
    }

    public function save_foto_temp()
    {
        $resp = ['success' => "false",'msg'=>"",'dir'=>"",'nomb_foto'=>""];
        if($_FILES['photo-path']['error']==true)
        {
            $resp['msg'] = "La imagen no puede ser superior a los 2 MB.";
        }
        else
        {
            //print_r($_FILES['photo-path']);die;
            $file = Input::file('photo-path');
            //echo $file->getClientSize()."sd";die;
            $arr = explode(".",$file->getClientOriginalName());
            $nombre_file_temp = mt_rand(0,99999).".".strtolower($arr[count($arr)-1]);
            if( $file->move("temp",$nombre_file_temp))
            {
                $resp['success']="true";
                $resp['dir'] = "temp/".$nombre_file_temp;
                $resp['nomb_foto'] = $nombre_file_temp;
            }
            else
                $resp['msg'] = "No se puede archivar la imagen.";
        }
        echo '{success:'.$resp['success'].', msg:'.json_encode($resp['msg']).', dir:'.json_encode($resp['dir']).', nom:'.json_encode($resp['nomb_foto']).'}';
        //return Response::json($resp);
    }

    public function insertar()
    {
        $resp = ['success' => false];
        $campos = [
            //Personameles
            'ci'=>Input::get("ci"),
            'nombre'=>Input::get("nombre"),
            'pri_apellido'=>Input::get("pri_apellido"),
            'seg_apellido'=>Input::get("seg_apellido"),
            'sexo'=>Input::get("sexo"),
            'fecha_naci'=>Input::get("fechanacimiento"),
            'estado_civil'=>Input::get("estadocivil"),
            'tomo'=>Input::get("tomo"),
            'escolaridad'=>Input::get("escolaridad"),
            'anno_graduacion'=>Input::get("annograduacion"),
            'especialidad'=>Input::get("especialidad"),
            'idiomas_domina'=>Input::get("idioma"),
            'pais_graduacion'=>Input::get("paisgraduacion"),
            'grado_cientifico'=>Input::get("gradocientifico"),
            'nomb_madre'=>Input::get("madre"),
            'folio'=>Input::get("folio"),
            'nomb_padre'=>Input::get("padre"),
            //'escolaridad'=>Input::get("registrocivil"),
            'piel'=>Input::get("piel"),
            'cintura'=>Input::get("cintura"),
            'color_pelo'=>Input::get("pelo"),
            'medida_zapato'=>Input::get("zapato"),
            'altura'=>Input::get("alto"),
            'medida_camisa'=>Input::get("camisa"),
            //'cant_hijos'=>Input::get("cant_hijos"),PONER FRANCIS
            //'domina_computacion'=>Input::get("domina_computacion"),PONER FRANCIS
            //'organizaciones'=>Input::get("organizaciones"),PONER FRANCIS
            //'nacionalidad'=>Input::get("nacionalidad"),PONER FRANCIS
            //'no_solapin'=>Input::get("no_solapin"),PONER FRANCIS
            //'foto_nombre'=>Input::get("foto_nombre"),PONER FRANCIS


            'direccion_carnet'=>Input::get("direccioncarnet"),
            'municipio_carnet'=>Input::get("mun2"),
            'provincia_carnet'=>Input::get("provinciacarnet"),

            'direccion_actual'=>Input::get("direccionactual"),
            'municipio_actual'=>Input::get("mun"),
            'provincia_actual'=>Input::get("provinciaactual"),

            'telef_contacto'=>Input::get("telefonoactual"),

            //Centro
            'cargo'=>Input::get("cargo"),
            'area'=>Input::get("area"),
            'salario_escala'=>Input::get("salarioescala"),
            'grupo'=>Input::get("grupo"),
            'grupo_escala'=>Input::get("grupoescala"),
            'categoria_ocupacional'=>Input::get("categoriaocupacional"),

            'fecha_alta'=>date('Y-m-d'),


           // 'direccion_actual'=>

        ];




       /* $reglas = [
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
        $validarOperador = Validator::make($campos, $reglas,$mensajesError);*/
        echo "Ya estas en el insertar persona";die;
    }



}
