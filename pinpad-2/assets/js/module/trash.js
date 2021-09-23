//
// ZoopWebSocketClientjs  
//
// Last update: Regis Silva #20191208# : classe Zoop e m�todos.
// Last update: Regis Silva #20200925# : suporte ao Zoop WebSocket Windows Service .
//


class Zoop {

    constructor(
        websocketHostIp,
        websocketHostPort,
        serialPort,
        callbackDisplayMessage,
        callbackLogTransaction
    ) {


        window.callbackDisplayMessage = callbackDisplayMessage;
        window.callbackLogTransaction = callbackLogTransaction;
        window.serialPort = serialPort !== null && typeof (serialPort) !== "undefined" ? serialPort : null;

        if (typeof websocketHostIp === "undefined") websocketHostIp = "localhost";
        if (typeof websocketHostPort === "undefined") websocketHostPort = "1337";

        window.wsUri = "ws://" + websocketHostIp + ":" + websocketHostPort;

        window.zoopGotMessage = function (msg) { console.log(msg); window.callbackDisplayMessage(msg); };

        window.zoopLog = function (log) {

            var dt = new Date();

            log = "[" + dt.getDate() + "] " + dt.getHours() + "h" + dt.getMinutes() + "m" + dt.getSeconds() + "s :" + log;
            console.log(log);
            window.callbackLogTransaction(log);
        };

    }

    setMarketPlaceId(marketplaceId) {

        window.marketplaceId = marketplaceId;

    }

    setSellerId(sellerId) {

        window.sellerId = sellerId;

    }

    setPublishableKey(publishableKey) {
        window.publishableKey = publishableKey;
    }

    Init() {

        window.isWebSocketConnected = false;

        window.ZoopOnOpen = function (evt) {
            zoopGotMessage("WEBSOCKET CONECTADO");
            window.isWebSocketConnected = true;
        };


        window.ZoopOnClose = function (evt) {
            zoopGotMessage("WEBSOCKET DESCONECTADO");
            window.isWebSocketConnected = false;
        };

        window.ZoopOnMessage = function (evt) {
            try {
                console.log("Recebido do Servidor ");
                console.log(JSON.parse(evt.data));

            }
            catch (e) {
                console.log(e.message);
            }


            zoopLog(JSON.stringify(JSON.parse(evt.data)));

            switch (JSON.parse(evt.data).mid) {

                case "paymentSuccessful":

                    setTimeout(function () {

                        zoopGotMessage("TRANSACAO APROVADA");
                        zoopLog(JSON.stringify((JSON.parse(evt.data))));
                        window.minhaCallbackChargeResult(JSON.parse(evt.data));
                        setTimeout(() => {
                            zoopGotMessage("RETIRE O CARTAO");
                        }, 4000);

                    }, 0);

                    break;

                case "paymentFailed":

                    setTimeout(function () {

                        zoopGotMessage("TRANSACAO FALHOU");
                        zoopLog(JSON.stringify((JSON.parse(evt.data))));
                        window.minhaCallbackChargeResult(JSON.parse(evt.data));
                        setTimeout(zoopGotMessage("RETIRE O CARTAO"), 4000);

                    }, 0);
                    break;

                case "paymentAborted":

                    setTimeout(function () {

                        zoopGotMessage("PAGAMENTO ABORTADO");
                        zoopLog(JSON.stringify((JSON.parse(evt.data))));
                        window.minhaCallbackChargeResult(JSON.parse(evt.data));
                        setTimeout(zoopGotMessage("RETIRE O CARTAO"), 4000);

                    }, 0);

                    break;

                case "showMessage":

                    zoopGotMessage(JSON.parse(evt.data).message);
                    break;

                case "endOfTransaction":
                    zoopLog(JSON.stringify((JSON.parse(evt.data))));
                    break;


                case "voidTransactionSuccessful":

                    setTimeout(function () {

                        zoopGotMessage("ESTORNO REALIZADO");
                        zoopLog(JSON.stringify((JSON.parse(evt.data))));
                        window.minhaCallbackVoidResult(JSON.parse(evt.data));
                        setTimeout(zoopGotMessage("RETIRE O CARTAO"), 4000);

                    }, 0);


                    break;

                case "voidTransactionFailed":


                    setTimeout(function () {

                        zoopGotMessage("ESTORNO FALHOU");
                        zoopLog(JSON.stringify((JSON.parse(evt.data))));
                        window.minhaCallbackVoidResult(JSON.parse(evt.data));
                        setTimeout(zoopGotMessage("RETIRE O CARTAO"), 4000);

                    }, 0);
                    break;

            }

        };

        window.ZoopOnError = function (evt) {

            zoopLog("Zoop WebSocket service parado ou rodando em porta diferente de 1337.");
            window.isWebSocketConnected = false;
            console.log(evt.data);

        };

    }

    executeCharge(paymentType, valueInCents, numberOfInstallments, metadata, referenceId, callbackChargeResult, serialPort) {

        var paramsCharge = {

            mid: 'charge',
            marketplaceId: window.marketplaceId,
            sellerId: window.sellerId,
            publishableKey: window.publishableKey,
            paymentType: paymentType,
            valueInCents: valueInCents,
            numberOfInstallments: numberOfInstallments,
            metadata: metadata !== null ? metadata : "",
            referenceId: referenceId !== null ? referenceId : "",
            serialPort: window.serialPort

        };


        window.callbackChargeResult = callbackChargeResult;

        zoopGotMessage("VENDA");

        doSend(JSON.stringify(paramsCharge));
    }


    executeVoid(transactionid, callbackVoidResult) {

        var params = {
            mid: 'void',
            marketplaceId: window.marketplaceId,
            sellerId: window.sellerId,
            transactionId: transactionid,
            serialPort: window.serialPort,
            publishableKey: window.publishableKey
        };

        window.callbackVoidResult = callbackVoidResult;

        zoopGotMessage("ESTORNO");
        doSend(JSON.stringify(params));
    }


    startWebSocket() {

        try {

            window.websocket = new WebSocket(wsUri);

            websocket.onopen = function (evt) { ZoopOnOpen(evt); };
            websocket.onclose = function (evt) { ZoopOnClose(evt); };
            websocket.onmessage = function (evt) { ZoopOnMessage(evt); };
            websocket.onerror = function (evt) { ZoopOnError(evt); };

            window.doSend = function (message) {
                zoopLog("Enviando para o Servidor ==>" + prettyfyJsonString(message));
                websocket.send(message);
            };
        }
        catch (e) {
            console.log("erro ao inicializar WebSocket()");
            console.log(e.message);
        }

    }


}
//----------------------Utils

function prettyfyJsonString(jsonStringToPretty) {
    //truque pra formatar o JSON de forma elegante.
    return JSON.stringify(JSON.parse(jsonStringToPretty), null, '\t');
}











































// implementando suas interfaces de callback

// callback functions {

function prettyfyJsonString(jsonStringToPretty) {
    //truque pra formatar o JSON de forma elegante.
    return JSON.stringify(JSON.parse(jsonStringToPretty), null, '\t');
}

function minhaCallbackLogRecebida(log) {
    document.getElementById("logTransaction").innerHTML += "\n" + log + "\n";
}

function minhaCallbackMensagemRecebida(msg) {
    document.getElementById("DISPMSG").innerHTML = msg;

    if (msg === "RETIRE O CARTAO") {
        setTimeout(() => {
            window.myPaymentGateway.startWebSocket();
        }, 3000);
    }
}


function minhaCallbackChargeResult(jsonResult) {

    document.getElementById('idTransaction').value = jsonResult.id;

    saveCredentials();

    $("#HistoricoList").append(new Option(jsonResult.id, jsonResult.id));

    document.getElementById('resultTransaction').value = prettyfyJsonString(JSON.stringify(jsonResult));

    $("#HistoricoList option").on("click", function () {
        $("#idTransaction").val(this.value);
        $("#btnESTORNO").show();
        $("#btnRED").hide();

    });

    if ($("#idTransaction").val().length === 32) {
        $("#btnESTORNO").show();
        $("#btnRED").hide();

    } else {
        $("#btnESTORNO").hide();
        $("#btnRED").show();
    }

}

function minhaCallbackVoidResult(jsonResult) {
    document.getElementById('resultTransaction').value = JSON.stringify(jsonResult);
}



function setCredentials(paymentGateway) {

    paymentGateway.setMarketPlaceId(document.getElementById("txtmarketplaceId").value);
    paymentGateway.setSellerId(document.getElementById("txtsellerId").value);
    paymentGateway.setPublishableKey(document.getElementById("txtpublishableKey").value);

}

function checkDefaultCredentials() {


    var txtmarketplaceid = document.getElementById("txtmarketplaceId");
    var txtsellerId = document.getElementById("txtsellerId");
    var txtpublishableKey = document.getElementById("txtpublishableKey");

    var defaultmarketplaceid = localStorage.getItem("marketplaceId");
    var defaultsellerId = localStorage.getItem("sellerId");
    var defaultpublishableKey = localStorage.getItem("publishableKey");

    defaultmarketplaceid = defaultmarketplaceid !== null ? defaultmarketplaceid : "3249465a7753536b62545a6a684b0000";
    defaultsellerId = defaultsellerId !== null ? defaultsellerId : "1e5ee2e290d040769806c79e6ef94ee1";
    defaultpublishableKey = defaultpublishableKey !== null ? defaultpublishableKey : "zpk_test_EzCkzFFKibGQU6HFq7EYVuxI";

    //default:  mktid = Eleonor Carruth (conta de teste que não cobra no cartão)
    if (txtmarketplaceid.value === "" || txtmarketplaceid.value === null) txtmarketplaceid.value = defaultmarketplaceid;
    if (txtsellerId.value === "" || txtsellerId.value === null) txtsellerId.value = defaultsellerId;
    if (txtpublishableKey.value === "" || txtpublishableKey.value === null) txtpublishableKey.value = defaultpublishableKey;

}

function configureClicks() {

    $("#btnVENDA").on("click", function () {

        if (window.serialPort === null || window.serialPort.value == "AUTO") {
            alert("Selecione porta serial.");
            return;
        }

        if (window.isWebSocketConnected !== true) {
            alert("WebSocket nao conectado.");
            window.myPaymentGateway.startWebSocket();
            return;
        }

        $("#btnESTORNO").hide();
        $("#btnRED").show();
        $("#resultTransaction").val("");
        $("#idTransaction").val("");

        checkDefaultCredentials();
        setCredentials(myPaymentGateway);

        var valor = 1;
        try {
            valor = Number($("#txtvalor").val().replaceAll('.', '').replaceAll(',', ''));
        } catch (ex) { valor = 1; }

        var paymentType;

        switch (Number($("#tipoOperacao").val())) {

            case 0:
                paymentType = "credit";
                break;

            case 0:
                paymentType = "credit";
                break;

            case 1:
                paymentType = "debit";
                break;

            case 2:
                paymentType = "credit_with_installments";
                break;

            case 3:
                paymentType = "voucher";
                break;

            default:
                paymentType = "credit";
                break;
        }

        myPaymentGateway.executeCharge(paymentType, valor, Number($("#tipoParcela").val()), null, null, minhaCallbackChargeResult);


    });

    $("#tipoParcela").on("change", function () {
        if ($("#tipoParcela").val() != "1") {
            $("#tipoOperacao").val("2");
            alert("Valor mínimo = 2 parcelas de R$ 5,00");
            $("#txtvalor").val("10,00");
        }
    });

    $("#tipoOperacao").on("change",
        function () {
            if ($("#tipoOperacao").val() != "2") {
                $("#tipoParcela").val("1");
            }
        });

    $("#serialPortList").on("change",
        function () {
            getSerialPort();
        });


    $("#btnRESET").on("click", function () {

        var reset = prompt("Esta ação sobreporá as credenciais atuais salvas com as credenciais de teste que não faz cobrança real.\n Se é isso mesmo que você deseja, confirme digitando 'reset' ou cancele a ação.");

        if (reset.toLowerCase() === "reset") {

            document.getElementById("txtmarketplaceId").value = "3249465a7753536b62545a6a684b0000";
            document.getElementById("txtsellerId").value = "1e5ee2e290d040769806c79e6ef94ee1";
            document.getElementById("txtpublishableKey").value = "zpk_test_EzCkzFFKibGQU6HFq7EYVuxI";
            document.getElementById("txtvalor").value = "0,01";

            saveCredentials();
        }

    });

    $("#idTransaction").on("change",
        function () {
            if ($("#idTransaction").val().length == 32) {
                $("#btnESTORNO").show();
                $("#btnRED").hide();
            } else {
                $("#btnESTORNO").hide();
                $("#btnRED").show();
            }
        });

    $("#btnESTORNO").on("click",
        function () {

            if (window.serialPort === null || window.serialPort.value == "AUTO") {
                alert("Selecione porta serial.");
                return;
            }

            if (window.isWebSocketConnected !== true) {
                alert("WebSocket nao conectado.");
                window.myPaymentGateway.startWebSocket();
                return;
            }

            checkDefaultCredentials();
            setCredentials(myPaymentGateway);

            if (document.getElementById("txtmarketplaceId").value === "3249465a7753536b62545a6a684b0000") {

                alert("Não é possível fazer estorno na conta de teste porque a mesma não executa a transação de venda na conta real do cartão.");
                alert("Para testar estorno de valores use uma transação criada com credenciais reais.");
                return;
            }

            myPaymentGateway.executeVoid(document.getElementById('idTransaction').value, minhaCallbackVoidResult);
        });


    document.getElementById("btnVENDA").style.cursor = "pointer";
    document.getElementById("btnESTORNO").style.cursor = "pointer";
    document.getElementById("btnRESET").style.cursor = "pointer";


}

function getSerialPort() {

    window.serialPort = $("#serialPortList").val();

    window.serialPort = serialPort === "AUTO" ? null : serialPort;
}

function saveCredentials() {

    localStorage.setItem("marketplaceId", document.getElementById("txtmarketplaceId").value);
    localStorage.setItem("sellerId", document.getElementById("txtsellerId").value);
    localStorage.setItem("publishableKey", document.getElementById("txtpublishableKey").value);
}

$(document).ready(function () {

    checkDefaultCredentials();



    configureClicks();

    window.myPaymentGateway = new Zoop(
        "localhost",
        "1337",
        window.serialPort,
        minhaCallbackMensagemRecebida,
        minhaCallbackLogRecebida
    );


    window.myPaymentGateway.Init();
    window.myPaymentGateway.startWebSocket();

});





