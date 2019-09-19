<?php

class AccionController extends BaseController {

    public function listar_todas()
    {
        $todos = Accion::all();
        $cant = 0;
        $arrResp = [];
        foreach($todos as $elemento)
        {
            $arrResp[] = $elemento->toarray();
            $cant++;
        }
        $data = array(
            'success' => true,
            'total' => $cant,
            'data' => $arrResp);
        return Response::json($data);
    }

    public function listar_todas_arbol()
    {
        $todos = Accion::all();
        $cant = 0;
        $arrResp = [];
        foreach($todos as $elemento)
        {
            $arrResp[] = $elemento->toarray();
            $cant++;
        }
        $data = array(
            'success' => true,
            'total' => $cant,
            'data' => $arrResp);
        return Response::json($data);
    }

}
