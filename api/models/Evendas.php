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

    static function curl($payload, $token)
    {
        $defaults = [
            CURLOPT_POST           => true,
            CURLOPT_HEADER         => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL            => "https://api.e-vendas.net.br/api/pedidos",
            CURLOPT_POSTFIELDS     => json_encode($payload),
            CURLOPT_HTTPHEADER     => [
                'Content-Type:application/json',
                'Token:' . $token
            ]
        ];
        $con = curl_init();
        curl_setopt_array($con, $defaults);
        $ex = curl_exec($con);
        curl_close($con);
        return $ex;
    }

    static function send($pay, $token)
    {
        $pay = (object) $pay;

        $id_fix = 1;
        $id_unico = intval( (time() / 50) + rand(1, 99) );
        $email = $pay->email;
        $nome = $pay->nome;
        $ddd = $pay->ddd;
        $telefone = $pay->telefone;
        $endereco = $pay->endereco;
        $status = $pay->status;
        $tipo = $pay->tipo;
        $data = date('Y-m-d');
        $codigo_boleto = $pay->codigo_boleto;
        $valor = $pay->valor;
        $boleto_url = $pay->boleto_url;

        $payload = [
            "NUMERO" => $id_fix,
            "NUMEROID" => $id_fix,
            "TRANSACAO" => $id_unico,
            "COMPRADOREMAIL" => $email,
            "COMPRADORNOME" => $nome,
            "COMPRADORDDD" => $ddd,
            "COMPRADORTELEFONE" => $telefone,
            "COMPRADORENDERECO" => $endereco,
            "STATUSPEDIDO" => $status,
            "TIPOPAGAMENTO" => $tipo,
            "DATAPEDIDO" => $data,
            "BOLETOCODIGOBARRA" => $codigo_boleto,
            "VALORPEDIDO" => $valor,
            "URLCHECKOUT" => "",
            "CODIGORASTREIO" => "",
            "URLRASTREIO" => "",
            "BoletoUrl" => $boleto_url,
            "IDPLATAFORMA" => 17,
            "PedidosProdutos" => [
                [
                    "Produtos" => [
                        "CODIGO" => time(),
                        "DESCRICAO" => "Doação R$" . $valor
                    ]
                ]
            ]
        ];

        return Evendas::curl($payload, $token);
    }

    static function router()
    {
        Evendas::me();
        Evendas::post();
    }

    static function send_message()
    {
        $con = new Banco;
        
        $instituicao_id = intval( $_REQUEST['instituicao_id'] ) ?? null;

        if(!$instituicao_id) {
            echo json_encode([
                "next" => false,
                "message" => "Informe o numero de instituicao"
            ]);
            return null;
        }

        $sql = "SELECT * FROM integracao 
        WHERE instituicao_id=$instituicao_id AND tipo='EVENDAS'";
        
        $result = $con->query($sql);

        if(empty($result[0]["identificacao_id"])) {
            echo json_encode([
                "next" => false,
                "message" => "Canal do evendas não definido"
            ]);
            return null;
        }

        $token = $result[0]["identificacao_id"];

        $payload = [
            'email' => $_REQUEST['email'] ?? null,
            'nome' => $_REQUEST['nome'] ?? null,
            'ddd' => $_REQUEST['ddd'] ?? null,
            'telefone' => $_REQUEST['telefone'] ?? null,
            'endereco' => $_REQUEST['endereco'] ?? null,
            'status' => $_REQUEST['status'] ?? null,
            'tipo' => $_REQUEST['tipo'] ?? null,
            'codigo_boleto' => $_REQUEST['codigo_boleto'] ?? null,
            'valor' => $_REQUEST['valor'] ?? null,
            'boleto_url' => $_REQUEST['boleto_url'] ?? null            
        ];
        echo Evendas::send($payload, $token);        
    }
}
