<?php

class AuthController extends BaseController {


    public function login()
    {
        if(Auth::usuario()->check())
        {
            return Redirect::route("index");
        }
        elseif(Input::server("REQUEST_METHOD") == "GET" || $_SERVER['HTTP_REFERER'] != URL::previous())
        {
            return View::make("login-ext");
        }
        elseif(Request::ajax() && Input::server("REQUEST_METHOD") == "POST")
        {
            $info = array(
                'success' => false
            );
            $campos = [
                'user'=>Input::get("user"),
                'password'=>Input::get("pass")
            ];
            $reglas = [
                "user" => 'required|min:3|max:32',
                "password" => "required|min:6"
            ];
            $mensajesError = [
                'user.required' => "El campo usuario es requerido",
                'user.min' => "El usuario debe tener como minimo 3 caracteres",
                'user.max' => "El usuario debe tener como maximo 32 caracteres",
                'password.required' => "El campo password es requerido",
                'password.min' => "El password debe tener como minimo 6 caracteres"
            ];
            $validarCampos = Validator::make($campos, $reglas,$mensajesError);
            if($validarCampos->passes())
            {
                $campos['deleted'] = 0;
                if(Auth::usuario()->attempt($campos))
                {
                    $info['success'] = true;
                }
                $info['msg'] = "El Usuario o Password son incorectos";
                return Response::json($info);
            }
            //print_r($validarCampos->errors()->first('password'));die;
            //print_r($validarCampos->errors());die;
            $info['msg'] = $validarCampos->errors()->all()[0];
        }
        return Response::json($info);
    }

    public function index()
    {
        /*$userLogin = Auth::usuario()->get();
        $acciones =$userLogin->rol->acciones;
        $arrResp = ['modulos'=>[],'acciones'=>""];
        foreach($acciones as $acc)
        {
           $arrResp['acciones'] .= $acc->id_accion."-";
        }
        $arrResp['acciones'] = substr($arrResp['acciones'], 0, -1);
        $arrResp['modulos']['configuracion'] = true;
        return View::make("index-ext",$arrResp);*/


        $userLogin = Auth::usuario()->get();
        $acciones = DB::table('tb_accion')
            ->join('tb_modulo', 'tb_accion.id_modulo', '=', 'tb_modulo.id_modulo')
            ->join('tb_acciones_roles', 'tb_accion.id_accion', '=', 'tb_acciones_roles.id_accion')
            ->join('tb_rol', 'tb_acciones_roles.id_rol', '=', 'tb_rol.id_rol')
            ->where('tb_rol.id_rol', '=', $userLogin->rol->id_rol)
            ->orderby('tb_accion.id_modulo', 'asc')
            ->get(array('tb_modulo.nomb_modulo', 'tb_accion.id_accion'));
        $arrResp = [];
        $modulo = "";
        $stringResp = "{";
        foreach($acciones as $acc)
        {
            if($modulo != $acc->nomb_modulo)
            {
                $modulo = $acc->nomb_modulo;
                $arrResp[$modulo] = array($acc->id_accion);
            }
            else
            {
                $arrResp[$modulo][] = $acc->id_accion;
            }
        }
        foreach ($arrResp as $k => $v)
        {
            $stringResp .= $k.":[".implode(",",$v)."],";
        }
        $stringResp = substr($stringResp, 0, -1)."}";
        $arrResp['objAcciones'] = $stringResp;
        //print_r($arrResp);die;
        //echo $stringResp;die;
        return View::make("index-ext",$arrResp);
    }

    public function permisosUsuarioPorModulo()
    {
        $userLogin = Auth::usuario()->get();
        $acciones = DB::table('tb_accion')
            ->join('tb_modulo', 'tb_accion.id_modulo', '=', 'tb_modulo.id_modulo')
            ->join('tb_acciones_roles', 'tb_accion.id_accion', '=', 'tb_acciones_roles.id_accion')
            ->join('tb_rol', 'tb_acciones_roles.id_rol', '=', 'tb_rol.id_rol')
            ->where('tb_rol.id_rol', '=', $userLogin->rol->id_rol)
            ->orderby('tb_accion.id_modulo', 'asc')
            ->get(array('tb_modulo.nomb_modulo', 'tb_accion.id_accion'));
        $arrResp = [];
        $modulo = "";
        foreach($acciones as $acc)
        {
            if($modulo != $acc->nomb_modulo)
            {
                $modulo = $acc->nomb_modulo;
                $arrResp[$modulo] = array($acc->id_accion);
            }
            else
            {
                $arrResp[$modulo][] = $acc->id_accion;
            }
        }
        return Response::json($arrResp);
    }

    public function logOut()
    {
        Auth::usuario()->logout();
        $resp = ['success'=>false];
        if(Auth::usuario()->guest())
        {
            $resp['success'] = true;
        }
        return Response::json($resp);
    }

    public function showLogin()
    {
        // Verificamos que el usuario no esté autenticado
        if (Auth::operador()->check())
        {
            // Si está autenticado lo mandamos a la raíz donde estara el mensaje de bienvenida.
            return Redirect::to('/');
            //echo "Principal";die;
        }
        // Mostramos la vista login.blade.php (Recordemos que .blade.php se omite.)
        return View::make('login');

        //echo "Vista login";die;
    }

    public function postLogin()
    {
        // Guardamos en un arreglo los datos del usuario.
        $userdata = array(
            'usuario' => Input::get('username'),
            'password'=> Input::get('password')
        );
        // Validamos los datos y además mandamos como un segundo parámetro la opción de recordar el usuario.
        //echo Hash::make('qwe1234');die;
        /*if(Auth::user()->attempt($userdata, Input::get('remember-me', 0)))
        {
            // De ser datos válidos nos mandara a la bienvenida
            return Redirect::to('/');
        }*/
        if(Auth::operador()->attempt($userdata,false))
        {
            // De ser datos válidos nos mandara a la bienvenida
            return Redirect::to('/');
        }
        // En caso de que la autenticación haya fallado manda un mensaje al formulario de login y también regresamos los valores enviados con withInput().
        return Redirect::to('login')
            ->with('mensaje_error', 'Tus datos son incorrectos')
            ->withInput();
    }




}
