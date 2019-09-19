<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
        $saluda = 'Pasando datos a la vista hello';
		return View::make('hello', array('saluda'=>$saluda));
	}

    public function mostrarIndex()
    {
        $numeros = array('1','2','3','4');
        return View::make('HomeController.vista', array('numeros'=>$numeros));
    }

    public function mostrarContacto()
    {
        $mensg = null;
        if(isset($_POST['contacto']))
        {
          //Parametros de la plantilla Html que va en el corrreo
          $data = array(
              'name'=>Input::get('name'),
              'correo'=>Input::get('correo'),
              'asunto'=>Input::get('asunto'),
              'msg'=>Input::get('msg')
          );
          $fromEmail = 'mdproducionesweb@gmail.com';
          $fromName = 'administr';

          Mail::send('emails.contacto',$data,function($message) use ($fromName,$fromEmail)
          {
              $message->to($fromEmail,$fromName);
              $message->from($fromEmail,$fromName);
              $message->subject('Nuevo email de contacto');
          });
          $mensg = '<div class="text-info">Mensage enviado con exito</div>';
        }
        return View::make('HomeController.contacto', array('mensage'=>$mensg));
    }

}
