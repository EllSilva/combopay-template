<?php
class Email
{
    function send($payload, $print = false)
    {
        $payload = (object) $payload;
        $subject = "{$payload->instituicao_nome} - Doação Processada";
        $headers = "MIME-Version: 1.0 \r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $message = file_get_contents(__DIR__ . "/template.html");
        $message = $this->template($payload, $message);
        $headers .= "To: User <{$payload->email}> \r\n";
        $headers .= "From: Doar Digital <contato@doradigital.com.br> \r\n";
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
        return $html;
    }
}
