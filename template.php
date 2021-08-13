<?php

$domain = $_SERVER['HTTP_HOST'];
$path_template = __DIR__ . "/{$domain}.html";
$path_template_padrao = __DIR__ . "/padrao.html";

if (file_exists($path_template)) {
    include $path_template;
} else {
    include $path_template_padrao;
}
