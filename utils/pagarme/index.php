<?php

include __DIR__ . "/PagarMe.php";

$pagar = new PagarMe();

$res = $pagar->criar_saque("re_ckrexpxzg018l0o9tviebrnue", "50000");

echo json_encode($res);
