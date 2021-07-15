<?php
$to = $_GET["email"] ?? "br.rafael@outlook.com";
$subject = "Birthday Reminders for August";
$headers = "";
$headers .= "MIME-Version: 1.0 \r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1 \r\n";

$message = file_get_contents(__DIR__ . "/../../painel/email-modelo-doar-digital.html");
$headers .= "To: User <{$to}> \r\n";
$headers .= "From: Doar Digital <sac@doradigital.com.br> \r\n";

try {
    mail( $to, $subject, $message, $headers );
} catch (\Throwable $th) {
}

echo "enviado para {$to}";
