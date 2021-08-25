<?php
ini_set('SMTP','myserver');
ini_set('smtp_port',25);

$to = $_GET["email"] ?? "br.rafael@outlook.com";
$subject = "Birthday Reminders for August";
$headers = "";
$headers .= "MIME-Version: 1.0 \r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1 \r\n";

$message = file_get_contents(__DIR__ . "/../../painel/email/doar-digital.html");

$body = "";
$link_painel = "https://painel.doardigital.com.br/painel";
$link = "<a 
        href=\"$link_painel\" 
        target=\"_blank\"
        style=\"text-decoration: none; font-family:sans-serif; font-size: 18px; color: #ffffff; border-style: solid; border-color: #0681F3; border-width: 15px 30px; border-radius: 8px; background: #0681F3; font-weight: bold; font-style: normal; line-height: 22px; text-align: center;\">
        ACESSAR LINK
    </a>";

$headers .= "To: User <{$to}> \r\n";
$headers .= "From: Doar Digital <sac@doradigital.com.br> \r\n";

try {
    mail($to, $subject, $message, $headers);
} catch (\Throwable $th) {
}

echo $message;
