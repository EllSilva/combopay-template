<?php
class Evendas
{
    function post()
    {

        $instituicao_id = $_REQUEST['instituicao_id'];
        $identificacao_id = $_REQUEST['identificacao_id'] ?? '';
        $tipo = $_REQUEST['tipo'];
        $chave = $_REQUEST['chave'] ?? '';
        $token = $_REQUEST['token'] ?? '';

        $sql_exist = "SELECT * FROM integracao WHERE instituicao_id=$instituicao_id AND tipo=$tipo";

        $sql_create = "INSERT INTO  integracao (instituicao_id, tipo, identificacao_id, chave, token)  
        VALUES ($instituicao_id, '$tipo', '$identificacao_id', '$chave',' $token') ";

        $sql_update = "UPDATE integracao SET 
        instituicao_id=$instituicao_id,
        identificacao_id=$identificacao_id,
        tipo='$tipo',
        chave='$chave',
        token='$token'
        WHERE instituicao_id=$instituicao_id AND tipo=$tipo 
        ";

        echo json_encode([
            "next" => true,
            "message" => "Atualizado com sucesso!"
        ]);
    }
}
