<?php

class RecuperacaoDoacao
{
    static function agendar()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') return null;

        $con = new Banco;

        $instituicao_id = $_REQUEST['instituicao_id'] ?? null;
        $token = $_REQUEST['token'] ?? null;
        $email = $_REQUEST['email'] ?? null;
        $valor = $_REQUEST['valor'] ?? null;
        $callback = $_REQUEST['callback'] ?? null;
        $data_para_envio = '';

        if (!$instituicao_id) {
            echo json_encode([
                "next" => false,
                "message" => "Informe uma instituição"
            ]);
            return null;
        }

        if (!$token) {
            echo json_encode([
                "next" => false,
                "message" => "Informe uma token"
            ]);
            return null;
        }        
        
        $horarios = [
            // RecuperacaoDoacao::somar_minutos(15),
            // RecuperacaoDoacao::somar_minutos(24*60),
            // RecuperacaoDoacao::somar_minutos(48*60),
        ];

        foreach( $horarios as $data_hora ) {
            $data_para_envio = $data_hora;
            $sql = "INSERT INTO  recuperacao_doacao ( instituicao_id, token, email, valor, callback, data_para_envio )  
            VALUES ($instituicao_id, '$token', '$email', '$valor',' $callback',' $data_para_envio') ";
            $con->exec($sql);
        }      

        echo json_encode([
            "next" => true,
            "message" => "Salvo com sucesso!"
        ]);
    }

    static function somar_minutos($minutos) {
        return date('Y-m-d H:i', strtotime("+{$minutos} min", strtotime(date('Y-m-d H:i'))));
    }
}
