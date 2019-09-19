<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class Usuario extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	protected $table = 'tb_usuario';

    protected $primaryKey = 'id_usuario';

    public $timestamps = false;

    public $remember_token = false;

    public function rol()
    {
        return $this->belongsTo('Rol','id_rol');
    }


}
