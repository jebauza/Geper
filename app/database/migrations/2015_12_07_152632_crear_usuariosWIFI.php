<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CrearUsuariosWIFI extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create("tb_usuario_wifi", function(Blueprint $table)
        {
            $table->increments("id_usuari_wifi");

            $table->string("username",32);

            $table->string("password",250);

            $table->string("nombre",200)
                  ->nullable()
                  ->default(null);

            $table->string("apellidos",250)
                  ->nullable()
                  ->default(null);

            $table->string("no_pasaporte",250)
                  ->nullable()
                  ->default(null);

            $table->string("no_identidad",250)
                  ->nullable()
                  ->default(null);

            $table->string("email",250)
                ->nullable()
                ->default(null);

            $table->string("telf_movil",250)
                ->nullable()
                ->default(null);

            $table->string("nacionalidad",250)
                ->nullable()
                ->default(null);

            $table->text("comentario")
                ->nullable()
                ->default(null);

            $table->timestamps();

        });

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::dropIfExists("tb_usuario_wifi");
	}

}
