export default [
    {
        id: "0",
        cron_minuntos: 0,
        assunto: "Doar Digital - SEJA BEM VINDO!",
        titulo: "SEJA BEM VINDO!",
        text: "Olá {{nome_admin}}, você solicitou a recuperação de sua senha, segue abaixo sua nova senha: {{senha}}, Caso não tenha sido você quem solicitou a recuperação de senha por favor reencaminhe esse e-mail para nos informando que não foi solicitado. ObrigadoSeu cadastro foi realizado com sucesso! A partir de agora você pode iniciar sua jornada digital para captação de recursos, nós estaremos juntos para te auxiliar em todos os processos. Clique no botão a baixo para finalizar o seu cadastro e colocar sua landing page de captações no ar! {{ACESSAR_LINK_PAINEL}}",
    },
    {
        id: "1",
        cron_minuntos: 0,
        assunto: "Doar Digital - Recuperação de Senha",
        titulo: "Recuperação de Senha",
        text: "Olá {{nome_instituicao}}, você solicitou a recuperação de sua senha, segue abaixo sua nova senha: {{senha}}, Caso não tenha sido você quem solicitou a recuperação de senha por favor reencaminhe esse e-mail para nos informando que não foi solicitado. Obrigado",
    },
    {
        id: "2",
        cron_minuntos: 0,
        assunto: "Doar Digital - Sua Assinatura foi Renovada!",
        titulo: "Sua Assinatura foi Renovada!",
        text: "Olá {{nome_instituicao}}, seu pagamento da fatura referente ao {{mes_vigente}}  está paga. Qualquer necessidade ficamos à disposição, obrigado!",
    },
    {
        id: "3",
        cron_minuntos: 0,
        assunto: "Doar Digital - Falha no Pagamento da Assinatura",
        titulo: "Falha no Pagamento da Assinatura",
        text: "Olá {{nome_instituicao}}, seu pagamento da fatura referente ao {{mes_vigente}} falhou, por gentileza tente novamente. Qualquer necessidade ficamos á disposição, obrigado!",
    },
    {
        id: "4",
        cron_minuntos: 2880,
        assunto: "Doar Digital - Fatura em Atraso",
        titulo: "Fatura em Atraso",
        text: "Olá {{nome_instituicao}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem. Qualquer necessidade ficamos à disposição, obrigado!",
    },
    {
        id: "5",
        cron_minuntos: 10080,
        assunto: "Doar Digital - Fatura em Atraso",
        titulo: "Fatura em Atraso",
        text: "Olá {{nome_instituicao}}, sua fatura venceu a {{dias_de_atraso_fatura}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem.  Qualquer necessidade ficamos à disposição, obrigado!",

    },
    {
        id: "6",
        cron_minuntos: 20160,
        assunto: "Doar Digital - Fatura em Atraso",
        titulo: "Fatura em Atraso",
        text: "Olá {{nome_instituicao}}, sua fatura venceu a {{dias_de_atraso_fatura}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem. Qualquer necessidade ficamos à disposição, obrigado!",

    },
    {
        id: "7",
        cron_minuntos: 43200,
        assunto: "Doar Digital - Fatura atrasada - Conta Bloqueada",
        titulo: "Fatura atrasada - Conta Bloqueada",
        text: "Olá {{nome_instituicao}}, sua fatura venceu a {{dias_de_atraso_fatura}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Sua conta está atualmente bloqueada. Para liberar sua conta realize o pagamento da fatura acessando seu painel e a renovação ocorrerá automaticamente. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem. Qualquer necessidade ficamos à disposição, obrigado!"
    }
]