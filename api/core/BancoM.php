<?php
class BancoM
{
    private $host, $db, $user, $pass;
    function __construct()
    {
        $this->host = 'server17.i7host.com.br';
        $this->db = 'doardi27_api';
        $this->user = 'doardi27_digital';
        $this->pass = 'Seraph@121';
    }
    function query(string $sql): array
    {
        $con = new PDO("mysql:host={$this->host};dbname={$this->db}", $this->user, $this->pass);
        $query = $con->query($sql);
        $result = $query->fetchAll();
        $con = null;
        return $result;
    }
    function exec(string $sql): void
    {
        $con = new PDO("mysql:host={$this->host};dbname={$this->db}", $this->user, $this->pass);
        $query = $con->query($sql);
        $con = null;
    }
}