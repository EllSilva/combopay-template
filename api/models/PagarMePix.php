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
        $quantia = intval( $_REQUEST['quantia'] );
        $resposta = $pix->pay($quantia);
        echo json_encode([
            'status' => 'success',
            'message' => 'Sucesso',
            'qr' => $resposta['pix_qr_code'],
            'id_transaction' => $resposta['id']
        ]);
    }
}
