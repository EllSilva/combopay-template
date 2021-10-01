<?php

class Smtp
{
    static function post()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST')  return null;

        $con = new Banco;

        $instituicao_id = $_REQUEST['instituicao_id'];
        $host = $_REQUEST['host'];
        $porta = $_REQUEST['porta'];
        $usuario = $_REQUEST['usuario'];
        $senha = $_REQUEST['senha'];
        $nome = $_REQUEST['nome'];


        $sql_exist = "SELECT * FROM smtp 
        WHERE instituicao_id=$instituicao_id";

        $res_exist = $con->query($sql_exist);

        if ($res_exist) {

            $sql_update = "UPDATE smtp SET 
            instituicao_id=$instituicao_id,
            host='$host',
            porta='$porta',
            usuario='$usuario',
            senha='$senha',
            nome='$nome'
            WHERE instituicao_id=$instituicao_id 
            ";

            $con->exec($sql_update);
        }

        if (!$res_exist) {

            $sql_create = "INSERT INTO  smtp (instituicao_id, host, porta, usuario, senha, nome)  
            VALUES ($instituicao_id, '$host', '$porta', '$usuario',' $senha',' $nome') ";

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

        $sql = "SELECT * FROM smtp 
        WHERE instituicao_id=$instituicao_id";

        $res = $con->query($sql);

        $caso_nao_encontre = [
            "next" => true,
            "message" => null,
            "host" => null,
            "porta" => null,
            "usuario" => null,
            "senha" => null,
            "nome" => null,
        ];

        if (!$res) {
            echo json_encode($caso_nao_encontre);
            return null;
        }

        $caso_nao_encontre["host"] = $res[0]["host"];
        $caso_nao_encontre["porta"] = $res[0]["porta"];
        $caso_nao_encontre["usuario"] = $res[0]["usuario"];
        $caso_nao_encontre["senha"] = $res[0]["senha"];
        $caso_nao_encontre["nome"] = $res[0]["nome"];

        echo json_encode($caso_nao_encontre);
    }

    static function router()
    {
        Smtp::me();
        Smtp::post();
    }
}
