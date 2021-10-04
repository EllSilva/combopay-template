<?php

class Instituicao {
    function get($id) {
        $con = new BancoM;
        $sql = "SELECT * FROM instituicao WHERE id=$id";
        $result = $con->query($sql);
        return $result[0] ?? [];
    }
    function config($id) {
        $con = new BancoM;
        $sql = "SELECT * FROM `configuracao` WHERE instituicao_id=$id AND flag = 'CONFIG_SITE'";
        
        $result = $con->query($sql);
        if( empty($result[0]) ) return [];
        $result = $result[0]['base64'];
        $result = base64_decode($result);
        $result = utf8_encode($result);
        $result = json_decode($result);
        return $result;
    }
}