<?php
class Evendas
{
    static function post()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST')  return null;

        $con = new Banco;

        $instituicao_id = $_REQUEST['instituicao_id'];
        $identificacao_id = $_REQUEST['identificacao_id'] ?? '';
        $tipo = "EVENDAS";
        $chave = $_REQUEST['chave'] ?? '';
        $token = $_REQUEST['token'] ?? '';

        $sql_exist = "SELECT * FROM integracao 
        WHERE instituicao_id=$instituicao_id AND tipo='$tipo'";

        $res_exist = $con->query($sql_exist);

        if ($res_exist) {

            $sql_update = "UPDATE integracao SET 
            instituicao_id=$instituicao_id,
            tipo='$tipo',
            identificacao_id='$identificacao_id',
            chave='$chave',
            token='$token'
            WHERE instituicao_id=$instituicao_id AND tipo='$tipo' 
            ";

            $con->exec($sql_update);
        }

        if (!$res_exist) {

            $sql_create = "INSERT INTO  integracao (instituicao_id, tipo, identificacao_id, chave, token)  
            VALUES ($instituicao_id, '$tipo', '$identificacao_id', '$chave',' $token') ";

            $con->exec($sql_create);
        }

        echo json_encode([
            "next" => true,
            "message" => "Salvo com sucesso!"
        ]);
    }
    static function me()
    {

        if ($_SERVER['REQUEST_METHOD'] != 'GET') return null;

        $con = new Banco;
        $instituicao_id = $_REQUEST['instituicao_id'];

        $sql = "SELECT * FROM integracao 
        WHERE instituicao_id=$instituicao_id AND tipo='EVENDAS'";

        $res = $con->query($sql);

        $caso_nao_encontre = [
            "next" => true,
            "message" => null,
            "identificacao_id" => null,
            "chave" => null,
            "token" => null
        ];

        if (!$res) {
            echo json_encode($caso_nao_encontre);
            return null;
        }

        $caso_nao_encontre["identificacao_id"] = $res[0]["identificacao_id"];
        $caso_nao_encontre["chave"] = $res[0]["chave"];
        $caso_nao_encontre["token"] = $res[0]["token"];

        echo json_encode($caso_nao_encontre);
    }
    static function router()
    {
        Evendas::me();
        Evendas::post();
    }
}
