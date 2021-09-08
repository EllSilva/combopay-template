<?php

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('UTC');

include __DIR__ . "/evendas.php";
include __DIR__ . "/email.php";

$evendas = new Evendas();
$email = new Email();

$payload = [
    "status" => $_POST["status"] ?? null,
    "total" => $_POST["total"] ?? null,
    "name" => $_POST["name"] ?? null,
    "email" => $_POST["email"] ?? null,
    "phone" => $_POST["phone"] ?? null,
    "tipo" => $_POST["tipo"] ?? null,
    "code" => $_POST["code"] ?? null,
    "url" => $_POST["url"] ?? null,
    "instituicao_id" => $_POST["instituicao_id"] ?? null,
    "instituicao_nome" => $_POST["instituicao_nome"] ?? null,
    "instituicao_logo" => $_POST["instituicao_logo"] ?? null,
    "instituicao_color" => $_POST["instituicao_color"] ?? null,
];

$email->send($payload, false);
echo $evendas->send($payload);