<?php

include __DIR__ . "/core/Banco.php";
include __DIR__ . "/core/BancoM.php";
include __DIR__ . "/models/Instituicao.php";
include __DIR__ . "/models/Email.php";
include __DIR__ . "/models/EndDoacao.php";
include __DIR__ . "/models/Evendas.php";

/**
 * id=418288074&fingerprint=8aa04cf49895db85e53d90eb410942ce12a8f66f&event=transaction_status_changed&old_status=processing&desired_status=waiting_payment&current_status=waiting_payment&object=transaction&transaction%5Bobject%5D=transaction&transaction%5Bstatus%5D=waiting_payment&transaction%5Brefuse_reason%5D=&transaction%5Bstatus_reason%5D=acquirer&transaction%5Bacquirer_response_code%5D=&transaction%5Bacquirer_name%5D=pagarme&transaction%5Bacquirer_id%5D=60d3a18c2b919500119d03fd&transaction%5Bauthorization_code%5D=&transaction%5Bsoft_descriptor%5D=&transaction%5Btid%5D=418288074&transaction%5Bnsu%5D=418288074&transaction%5Bdate_created%5D=2021-10-25T17%3A26%3A50.711Z&transaction%5Bdate_updated%5D=2021-10-25T17%3A26%3A51.609Z&transaction%5Bamount%5D=1&transaction%5Bauthorized_amount%5D=1&transaction%5Bpaid_amount%5D=0&transaction%5Brefunded_amount%5D=0&transaction%5Binstallments%5D=1&transaction%5Bid%5D=418288074&transaction%5Bcost%5D=0&transaction%5Bcard_holder_name%5D=&transaction%5Bcard_last_digits%5D=&transaction%5Bcard_first_digits%5D=&transaction%5Bcard_brand%5D=&transaction%5Bcard_pin_mode%5D=&transaction%5Bcard_magstripe_fallback%5D=false&transaction%5Bcvm_pin%5D=false&transaction%5Bpostback_url%5D=http%3A%2F%2F877f-200-237-149-53.ngrok.io%2Fhook-pagarme%2F&transaction%5Bpayment_method%5D=pix&transaction%5Bcapture_method%5D=ecommerce&transaction%5Bantifraud_score%5D=&transaction%5Bboleto_url%5D=&transaction%5Bboleto_barcode%5D=&transaction%5Bboleto_expiration_date%5D=&transaction%5Breferer%5D=api_key&transaction%5Bip%5D=200.237.149.53&transaction%5Bsubscription_id%5D=&transaction%5Bphone%5D=&transaction%5Baddress%5D=&transaction%5Bcustomer%5D=&transaction%5Bbilling%5D=&transaction%5Bshipping%5D=&transaction%5Bcard%5D=&transaction%5Bsplit_rules%5D=&transaction%5Breference_key%5D=&transaction%5Bdevice%5D=&transaction%5Blocal_transaction_id%5D=&transaction%5Blocal_time%5D=&transaction%5Bfraud_covered%5D=false&transaction%5Bfraud_reimbursed%5D=&transaction%5Border_id%5D=&transaction%5Brisk_level%5D=unknown&transaction%5Breceipt_url%5D=&transaction%5Bpayment%5D=&transaction%5Baddition%5D=&transaction%5Bdiscount%5D=&transaction%5Bprivate_label%5D=&transaction%5Bpix_qr_code%5D=00020101021226820014br.gov.bcb.pix2560pix.stone.com.br%2Fpix%2Fv2%2F65419899-1b7c-4f8b-9566-8fbb3027b67052040000530398654040.015802BR5914Conta%20primaria6014RIO%20DE%20JANEIRO622905256dc1c733cef34fe2931e7c50b6304FA6B&transaction%5Bpix_expiration_date%5D=2021-10-28T02%3A59%3A59.000Z
 * 
 */

// var_dump($_REQUEST);

$con = new BancoM();

$id_trasaction = $_REQUEST['id'] ?? null;
$current_status = $_REQUEST['current_status'] ?? null;

$sql = "SELECT 	instituicao_id, doador_id, nome, id, tipo, codigo_barras, `url`, quantia FROM historico_compras WHERE id = $id_trasaction ";
$consulta = $con->query($sql);



$doador_id = $consulta[0]['doador_id'] ?? null;
$nome = $consulta[0]['nome'] ?? null;
$instituicao_id = $consulta[0]['instituicao_id'] ?? null;
$id = $consulta[0]['id'] ?? null;
$tipo = $consulta[0]['tipo'] ?? null;
$codigo_barras = $consulta[0]['codigo_barras'] ?? null;
$url = $consulta[0]['url'] ?? null;
$quantia = $consulta[0]['quantia'] ?? null;

$sql_doador =  "SELECT email, id, telefone, rua, cidade, estado FROM doador WHERE id = $doador_id";
$doador = $con->query($sql_doador);

$email = $doador[0]['email'] ?? null;
$telefone = $doador[0]['telefone'] ?? null;
$rua = utf8_encode($doador[0]['rua']) ?? null;
$cidade = utf8_encode($doador[0]['cidade']) ?? null;
$estado =  $doador[0]['estado'] ?? null;
// var_dump($doador);

$full_address = "{$rua} - {$cidade} - {$estado}";
$ddd = substr($telefone, 3, 2);
$telefone = substr($telefone, 5, 9);


echo json_encode([
    'next' => true,
    'message' => 'Dados Atualizado com sucesso',
    'id_trasaction' => $id_trasaction,
    'current_status' => $current_status,
    'doador_id' => $doador_id,
    'nome' => $nome,
    'instituicao_id' => $instituicao_id,
    'id' => $id,
    'email' => $email,
    'ddd' => $ddd,
    'telefone' => $telefone,
    'full_address' => $full_address,
    // 'history' => file( __DIR__  . '/.log' )
]);


$titulos = [
    'paid' => "Doação Concluida",
    'unpaid' => 'Doação Vencida',
    'canceled' => 'Doação cancelada',
];
$conteudo = [
    'paid' => "
        Olá $nome, sua Doação foi concluída com sucesso.
        Somos imensamente gratos por sua doação. 
        Ela ajuda a manter todo projeto vivo e com pleno funcionamento
        Deus lhe abençoe poderosamente.
    ",
    'unpaid' => "
        Olá $nome, sua Doação esta vencida.
        Somos imensamente gratos por sua doação. 
        Ela ajuda a manter todo projeto vivo e com pleno funcionamento
        Deus lhe abençoe poderosamente.
    ",
    'canceled' => "
        Olá $nome, sua Doação esta cancelada.
        Somos imensamente gratos por sua doação. 
        Ela ajuda a manter todo projeto vivo e com pleno funcionamento
        Deus lhe abençoe poderosamente.
    ",
];

EndDoacao::send($instituicao_id, $conteudo[$current_status] ?? '...', $email, $titulos[$current_status] ?? 'Doação');

$payload = [
    'email' => $email,
    'nome' => $nome,
    'ddd' => $ddd,
    'telefone' => $telefone,
    'endereco' => $full_address,
    'status' => $current_status,
    'tipo' => $tipo,
    'codigo_boleto' => $codigo_barras,
    'valor' => $quantia,
    'boleto_url' => $url
];

$banco = new Banco;
$sql = "SELECT * FROM integracao 
        WHERE instituicao_id=$instituicao_id AND tipo='EVENDAS'";

$result = $banco->query($sql);
$token = $result[0]["identificacao_id"] ?? "";



$json = json_encode($_REQUEST);
$data = date('Y-m-d H:i');

if (!empty($token)) {
    $respota =  Evendas::send($payload, $token);
    file_put_contents(__DIR__ . '/.log-evendas', "{$data} -> {$respota} \n", FILE_APPEND);
}

file_put_contents(__DIR__ . '/.log', "{$data} WEBHOOK -> {$json} \n", FILE_APPEND);
