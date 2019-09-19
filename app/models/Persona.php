<?php


class Persona extends Eloquent{

    protected $table = 'tb_persona';

    protected $primaryKey = 'id_persona';

    public $timestamps = false;

    public $remember_token = false;
} 