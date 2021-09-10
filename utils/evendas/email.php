<?php
class Email
{
    function send($payload, $print = false)
    {
        $payload = (object) $payload;
        $payload->link =  ' ';
        if($payload->tipo == 'boleto') {
            $payload->link = "
                Código Boleto: $payload->code <br>
                para obter o seu boleto basta 
                <a href='$payload->url' target='_blank'>Clicar aqui</a>
            ";            
        }
        $subject = "{$payload->instituicao_nome} - Doação Processada";
        $headers = "MIME-Version: 1.0 \r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $message = file_get_contents(__DIR__ . "/template.html");
        $message = $this->template($payload, $message);
        $headers .= "To: User <{$payload->email}> \r\n";
        $headers .= "From: Doar Digital <contato@doardigital.com.br> \r\n";
        try {
            @mail($payload->email, $subject, $message, $headers);
        } catch (\Throwable $th) {
        } 
        if( $print ) {
            echo $message;
        }
    }
    function template( $payload, $html ) {
        foreach( array_keys((array)$payload) as $k ) {
            $html = str_replace( "{{". $k ."}}", $payload->{$k} , $html);
        }
        $html = str_replace("%20", '', $html);
        return $html;
    }
}
