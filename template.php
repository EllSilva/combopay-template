<?php

$domain = $_SERVER['HTTP_HOST'];
$path_template = __DIR__ . "/template/{$domain}.html";
$path_template_padrao = __DIR__ . "/template/padrao.html";

if (file_exists($path_template)) {
    include $path_template;
} else {
    include $path_template_padrao;
}
