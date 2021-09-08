<?php

class Evendas
{
    public $key;
    function __construct()
    {
        $this->key = "33804c49-42c0-4488-9e10-8ba5ab2b357e";
    }
    function curl($payload)
    {
        $defaults = [
            CURLOPT_POST           => true,
            CURLOPT_HEADER         => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL            => "http://servicos.e-vendas.net.br/api/woocommerce/{$this->key}",
            CURLOPT_POSTFIELDS     => json_encode($payload),
            CURLOPT_HTTPHEADER     => ['Content-Type:application/json']
        ];
        $con = curl_init();
        curl_setopt_array($con, $defaults);
        $ex = curl_exec($con);
        curl_close($con);
        return $ex;
    }
    function status($status)
    {
        $lib = [
            "waiting_payment" => "on-hold",
            "paid" => "completed",
            "refused" => "failed",
        ];
        return $lib[$status] ?? $status;
    }
    function send($pay)
    {
        $pay = (object) $pay;
        $payload = [
            "id"           => rand(1, 999),
            "number"       => rand(1, 999),
            "status"       => $this->status($pay->status),
            "date_created" => date('Y-m-d'),
            "total"        => $pay->total,
            "barcode"      => $pay->code,
            "boleto_link"  => $pay->url,
            "billing" => [
                "first_name" => $pay->name,
                "last_name"  => "",
                "email"      => $pay->email,
                "phone"      => $pay->phone,
            ],
            "payment_method" =>  $this->tipo($pay->tipo),
            "meta_data" => [
                [
                    [
                        "id" => rand(111, 999),
                        "key" => "pagamento_metodo",
                        "value" => $this->tipo($pay->tipo)
                    ],
                    [
                        "id" => rand(111, 999),
                        "key" => "ORDER_REF",
                        "value" => rand(1, 999)
                    ],
                    [
                        "id" => rand(111, 999),
                        "key" => "ORDER_BARCODE",
                        "value" => $pay->code
                    ],
                    [
                        "id" => rand(111, 999),
                        "key" => "ORDER_BOLETO",
                        "value" => $pay->url
                    ]
                ]
            ]
        ];
        return $this->curl($payload);
    }
    function tipo($tipo)
    {
        return  $tipo == "boleto" ?  'digital_combo_pay_boleto' : 'digital_combo_pay_cartao';
    }
}
