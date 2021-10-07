<?php

class EndDoacao
{
    static function email_success()
    {
        $status = $_REQUEST['status'];
        $instituicao_id = $_REQUEST['instituicao_id'];
        $to = $_REQUEST['to'];
        $nome = $_REQUEST['nome'];
        $conteudo = "
            Olá $nome, sua Doação foi concluída com sucesso.
            Somos imensamente gratos por sua doação. 
            Ela ajuda a manter todo projeto vivo e com pleno funcionamento
            Deus lhe abençoe poderosamente.
        ";
        $title = "Doação Concluída";
        if ($status == 'error') return null;
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

    static function route()
    {
        EndDoacao::email_success();
        EndDoacao::email_error();
        echo  json_encode([
            'next' => true,
            'message' => 'Notificação enviada com sucesso'
        ]);
    }
}
