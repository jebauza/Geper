<?php


class Rol extends Eloquent{

    protected $table = 'tb_rol';

    protected $primaryKey = 'id_rol';

    public $timestamps = false;

    public $remember_token = false;

    public function acciones()
    {
        return $this->belongsToMany('Accion','tb_acciones_roles','id_rol','id_accion');
    }

    public function usuarios()
    {
        return $this->hasMany('Usuario','id_rol');
    }
} 