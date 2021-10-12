<?php

include __DIR__ . "/../models/PagarMe.php";
include __DIR__ . "/../models/PagarMePix.php";

$pay = new PagarMePix();

$res = $pay->pay(5000);

var_dump($res);