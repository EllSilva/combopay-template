<?php

/**
 * https://developers.rdstation.com/pt-BR/overview
 */

class RdStation
{
    private
        $domain_base,
        $api_key;

    function __construct()
    {
        $this->domain_base =  "https://api.rd.services";
    }

}
