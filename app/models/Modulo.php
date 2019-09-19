<?php
/**
 * Created by PhpStorm.
 * User: jorge
 * Date: 20/03/2016
 * Time: 12:43
 */

class Modulo extends Eloquent{

    protected $table = 'tb_modulo';

    protected $primaryKey = 'id_modulo';

    public $timestamps = false;

    public $remember_token = false;

    public function acciones()
    {
        return $this->hasMany('Accion','id_modulo');
    }

    
} 