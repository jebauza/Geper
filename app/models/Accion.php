<?php
/**
 * Created by PhpStorm.
 * User: jorge
 * Date: 20/03/2016
 * Time: 12:43
 */

class Accion extends Eloquent{

    protected $table = 'tb_accion';

    protected $primaryKey = 'id_accion';

    public $timestamps = false;

    public $remember_token = false;

    public function modulo()
    {
        return $this->belongsTo('Modulo','id_modulo');
    }

    public function roles()
    {
        return $this->belongsToMany('Rol','tb_acciones_roles','id_accion','id_rol');
    }

} 