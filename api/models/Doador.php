<?php

class Doador
{
    static function gravatar()
    {
        Header('Content-Type: image/png');
        $email = $_GET['email'] ?? 'default@default.com.br';
        $email = md5(strtolower(trim($email)));
        $img = "https://www.gravatar.com/avatar/{$email}";
        echo file_get_contents($img);
    }
}
