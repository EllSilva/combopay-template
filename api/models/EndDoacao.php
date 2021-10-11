<?php

class EndDoacao
{
    static function email_success()
    {
        $status = $_REQUEST['status'] ?? null;
        $instituicao_id = $_REQUEST['instituicao_id'] ?? null;
        $to = $_REQUEST['to'] ?? null;
        $nome = $_REQUEST['nome'] ?? null;
        $tipo = $_REQUEST['tipo'] ?? null;
        $conteudo = "
            Olá $nome, sua Doação foi concluída com sucesso.
            Somos imensamente gratos por sua doação. 
            Ela ajuda a manter todo projeto vivo e com pleno funcionamento
            Deus lhe abençoe poderosamente.
        ";
        $title = "Doação Concluída";
        if ($status == 'error') return null;
        if ($tipo == 'boleto') return null;
        EndDoacao::send($instituicao_id, $conteudo, $to, $title);
    }

    static function email_success_boleto()
    {

        $status = $_REQUEST['status'] ?? null;
        $instituicao_id = $_REQUEST['instituicao_id'] ?? null;
        $to = $_REQUEST['to'] ?? null;
        $nome = $_REQUEST['nome'] ?? null;

        $tipo = $_REQUEST['tipo'] ?? null; //boleto
        $boleto_url = $_REQUEST['boleto_url'] ?? null;
        $codigo_boleto = $_REQUEST['codigo_boleto'] ?? null;

        $conteudo = "
            Olá $nome, sua Doação foi concluída com sucesso. <br>
            Somos imensamente gratos por sua doação. <br>
            Ela ajuda a manter todo projeto vivo e com pleno funcionamento 
            Deus lhe abençoe poderosamente. <br>
            Codigo boleto: $codigo_boleto <br>
            <a href=\"$boleto_url\">Clique aqui para imprimir</a>
        ";
        $title = "Doação Concluída";
        if ($status == 'error') return null;
        if ($tipo != 'boleto') return null;
        EndDoacao::send($instituicao_id, $conteudo, $to, $title);
    }

    static function email_error()
    {
        $status = $_REQUEST['status'];
        $instituicao_id = $_REQUEST['instituicao_id'];
        $to = $_REQUEST['to'];
        $nome = $_REQUEST['nome'];
        $conteudo = "        
            Olá $nome, sua Doação não foi concluída.<br>
            Houve alguma falha no processamento de sua doação. <br>
            Pedimos a gentileza de verificar se houve algum dado digitado 
            trocado ou faltando algum número.<br>
            Ou se preferir pode nos chamar no suporte para que nossa equipe possa 
            te auxiliar em sua doação. 
        ";
        $title = "Doação Falhada";
        if ($status == 'success') return null;
        EndDoacao::send($instituicao_id, $conteudo, $to, $title);
    }

    static function send($instituicao_id, $conteudo, $to, $title)
    {
        $instituicao = new Instituicao;
        $email = new Email;
        $info = $instituicao->get($instituicao_id);
        $configuracao = $instituicao->config($instituicao_id);
        $payload = [
            "instituicao_color" => $configuracao->cor_main ?? '#CCC',
            "instituicao_nome" => $configuracao->title ?? 'Nome Instituição',
            "categoria" => $title,
            "instituicao_id" => $instituicao_id,
            "instituicao_logo" => $configuracao->logo ?? '',
            "from_email" => $info["email"] ?? '',
            "from_nome" => $configuracao->title ?? '',
            "email" => $to
        ];
        $payload['conteudo'] = $conteudo;
        $payload['link'] = "";
        $email->send($payload, false);
    }

    static function agendar()
    {
        $status = $_REQUEST['status'] ?? null;
        $instituicao_id = $_REQUEST['instituicao_id'] ?? null;
        $to = $_REQUEST['to'] ?? null;
        $nome = $_REQUEST['nome'] ?? null;

        $tipo = $_REQUEST['tipo'] ?? null; //boleto
        $boleto_url = $_REQUEST['boleto_url'] ?? null;
        $codigo_boleto = $_REQUEST['codigo_boleto'] ?? null;

        $token = $_REQUEST['token'] ?? 1;
        $email = $to ?? null;
        $valor = $_REQUEST['valor'] ?? null;
        $callback = $_REQUEST['callback'] ?? null;
        $data_para_envio = '';

        if ($status == 'error') return null;
        if ($tipo != 'boleto') return null;
        if (!$instituicao_id) return null;
        if (!$token) return null;

        $con = new Banco;

        $horarios = [
            EndDoacao::somar_minutos(2880),
            EndDoacao::somar_minutos(5760),
            EndDoacao::somar_minutos(8640),
        ];

        foreach ($horarios as $data_hora) {
            $data_para_envio = $data_hora;
            $sql = "INSERT INTO  recuperacao_doacao ( instituicao_id, token, email, valor, callback, data_para_envio )  
            VALUES ($instituicao_id, '$token', '$email', '$valor',' $callback',' $data_para_envio') ";
            $con->exec($sql);
        }
    }

    static function somar_minutos($minutos)
    {
        return date('Y-m-d H:i', strtotime("+{$minutos} min", strtotime(date('Y-m-d H:i'))));
    }


    static function route()
    {
        EndDoacao::email_success();
        EndDoacao::email_success_boleto();
        EndDoacao::email_error();
        EndDoacao::agendar();
        echo  json_encode([
            'next' => true,
            'message' => 'Notificação enviada com sucesso'
        ]);
    }
}
