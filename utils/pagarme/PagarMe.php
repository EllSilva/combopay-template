<?php
class PagarMe
{
    public $key;
    public function __construct()
    {
        $this->key = "ak_test_zcP5r3XuiDCVdnbcnH5wB2vMOqsPFl";
    }
    function send($path, $payload)
    {
        $full_url = "https://api.pagar.me/core/v5{$path}";
        $defaults = [
            CURLOPT_POST           => true,
            CURLOPT_HEADER         => false,
            CURLOPT_URL            => $full_url,
            CURLOPT_FRESH_CONNECT  => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FORBID_REUSE   => true,
            CURLOPT_TIMEOUT        => 12,
            CURLOPT_POSTFIELDS     => json_encode($payload),
            // CURLOPT_USERPWD        => "$this->key:",
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER     => [
                "Content-Type" => "application/json",
                // "Authorization" => "Basic " . base64_encode("$this->key:"),
            ]
        ];
        $ch = curl_init();
        curl_setopt_array($ch, $defaults);
        $result = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($result);
        return $result;
    }
    function criar_saque($recipient_id, $amount) {
        $path = "/recipients/recipient_id/withdrawals";
        $payload = [
            "api_key" => "ak_test_zcP5r3XuiDCVdnbcnH5wB2vMOqsPFl",
            "recipient_id" => $recipient_id,
            "amount" => $amount
        ];
        return $this->send( $path, $payload );
    }
}
