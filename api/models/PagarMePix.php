<?php
class PagarMePix extends PagarMe
{
    function __construct()
    {
        parent::__construct();
    }
    function pay(int $amount): array
    {
        $payload = [
            'payment_method' => 'pix',
            'amount' => $amount,
            'pix_expiration_date' => date('Y-m-d', strtotime('+7 days')),
            'pix_additional_fields' => [
                [
                    'name' => 'Doação',
                    'value' => 'R$' . number_format($amount / 100, 2, ',', '.')
                ]
            ]
        ];
        return $this->post('/transactions', $payload);
    }
    static function route()
    {
        $pix = new PagarMePix();
        echo json_encode([
            'next' => true,
            'message' => null,
            'qr' => null,
            'id_transaction' => null
        ]);
    }
}
