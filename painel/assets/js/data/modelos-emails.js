export default [
    {
        id: "1",
        cron: "recuperar_senha",
        nivel: 1,
        cat: "RECUPERAR SENHA",
        title: "Recuperação de Senha",
        text: "Olá {{nome_instituicao}}, você solicitou a recuperação de sua senha, segue abaixo sua nova senha: {{senha}}, Caso não tenha sido você quem solicitou a recuperação de senha por favor reencaminhe esse e-mail para nos informando que não foi solicitado. Obrigado",
    },
    {
        id: "2",
        cron: "paga_fatura",
        nivel: 1,
        cat: "FATRURA PAGA (Quando renova assinatura)",
        title: "Sua Assinatura foi Renovada!",
        text: "Olá {{nome_instituicao}}, seu pagamento da fatura referente ao {{mes_vigente}}  está paga. Qualquer necessidade ficamos à disposição, obrigado!",
    },
    {
        id: "3",
        cron: "falha_fatura",
        nivel: 1,
        cat: "FALHA NO PAGAMENTO DA FATURA (Quando não consegue renovar o pagamento da fatura)",
        title: "Falha no Pagamento da Assinatura",
        text: "Olá {{nome_instituicao}}, seu pagamento da fatura referente ao {{mes_vigente}} falhou, por gentileza tente novamente. Qualquer necessidade ficamos á disposição, obrigado!",
    },
    {
        id: "4",
        cron: "2_dias",
        nivel: 1,
        cat: "SUA FATURA ESTÁ EM ATRASO 2 DIAS ",
        title: "Fatura em Atraso",
        text: "Olá {{nome_instituicao}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem. Qualquer necessidade ficamos à disposição, obrigado!",
    },
    {
        id: "5",
        cron: "7_dias",
        nivel: 1,
        cat: "SUA FATURA ESTÁ EM ATRASO 7 DIAS ",
        title: "Fatura em Atraso",
        text: "Olá {{nome_instituicao}}, sua fatura venceu a {{dias_de_atraso_fatura}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem.  Qualquer necessidade ficamos à disposição, obrigado!",

    },
    {
        id: "6",
        cron: "14_dias",
        nivel: 1,
        cat: "SUA FATURA ESTÁ EM ATRASO 14 DIAS ",
        title: "Fatura em Atraso",
        text: "Olá {{nome_instituicao}}, sua fatura venceu a {{dias_de_atraso_fatura}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem. Qualquer necessidade ficamos à disposição, obrigado!",

    },
    {
        id: "7",
        cron: "30_dias",
        nivel: 1,
        cat: "SUA FATURA ESTÁ EM ATRASO 30 DIAS (INFORMANDO BLOQUEIO)",
        title: "Fatura atrasada - Conta Bloqueada",
        text:  "Olá {{nome_instituicao}}, sua fatura venceu a {{dias_de_atraso_fatura}}, seu pagamento da fatura referente ao {{mes_vigente}} ainda não foi identificado. Sua conta está atualmente bloqueada. Para liberar sua conta realize o pagamento da fatura acessando seu painel e a renovação ocorrerá automaticamente. Caso já tenha efetuado o pagamento favor desconsiderar essa mensagem. Qualquer necessidade ficamos à disposição, obrigado!"
    },
    {
        id: "",
        cron: "",
        nivel: 1,
        cat: "Doação Processada (Aguardando)",
        title: "Doação Processada (Aguardando)",
        text: "Sua Doação está sendo processada. Estamos felizes por sua colaboração, e no aguardo de sua conclusão. Agradecemos imensamente por sua doação."
    },
    {
        id: "",
        cron: "",
        nivel: 1,
        cat: "Doação Concluída",
        title: "Doação Concluída",
        text:  "Sua Doação foi concluída com sucesso.  Somos imensamente gratos por sua doação. Ela ajuda a manter todo projeto vivo e com pleno funcionamento."
    },
    {
        id: "",
        cron: "",
        nivel: 1,
        cat: "Doação Falhada",
        title: "Doação Falhada",
        text:  "Sua Doação não foi concluída.  Houve alguma falha no processamento de sua doação. Pedimos a gentileza de verificar se houve algum dado digitado trocado ou faltando algum número. Ou se preferir pode nos chamar no suporte para que nossa equipe possa te auxiliar em sua doação."
    },
    {
        id: "",
        cron: "15_min",
        nivel: 1,
        cat: "Recuperação de Carrinho",
        title: "Obrigado por ser providência para (instituição)",
        text:  "Olá {{cart_billing_first_name}}, Obrigada por visitar nossa página! Somos uma instituição que vive exclusivamente das doações recebidas, para manter a obra funcionando. Os recursos são escassos e a providência divina tem tocado muitos corações desejosos de fazer essa experiência da doação, para que tudo se mantenha ativo e que mais vidas sejam salvas para Jesus! Por vezes queremos fazer muito mais, entretanto temos que aguardar que as promessas de Deus se cumpram, no tempo dele e não no nosso. Mas Ele nos surpreende e cuida de nós com muito carinho, quando você chega até nós e se mostra interessado em ajudar. Apenas por você ter nos visitado aqui, já somos gratos. Esperamos que a providência divina também se faça presente na sua vida e que você consiga finalizar a intenção de fazer parte dos doadores. Já rezamos muito nas necessidades de cada um, pois acreditamos que juntos podemos fazer maravilhas pelos que precisam. Nós não existiríamos sem vocês e todo nosso trabalho ficaria sem sentido se não tivéssemos a ajuda de irmãos tão comprometidos! Estamos falando de um exército de doadores, fortalecidos pelo poder da oração, sustentando filhos necessitados de amor e atenção, gerando mais e mais almas restauradas para o reino de Deus. Obrigada por estar conosco! Um abraço fraterno"
    },
    {
        id: "",
        cron: "48_hs",
        nivel: 1,
        cat: "Recuperação de Carrinho",
        title: "Você já faz parte desta missão!",
        text:  "Olá Amigo da  {instituição}}. Hoje temos um recadinho de nosso fundador para você. Em tempos tão difíceis, sua doação é para nós sinal de Deus como providência divina. Um amor que motiva todos nós a continuar firme. Pois através de sua doação, conseguimos restaurar vidas no país todo. Quando você faz sua doação, você está fazendo parte da restauração de vidas, sendo na evangelização ou nos cuidados com o próximo que chega até nós. Contamos muito com você, Deus te abençoe poderosamente."
    },
    {
        id: "",
        cron: "96_hs",
        nivel: 1,
        cat: "Recuperação de Carrinho",
        title: "Você é Pedra Viva para a missão",
        text:  "Olá {{first_name}}. Seja parte viva desta missão tão linda que pertencemos. Hoje você pode ser parte integrante e muito fundamental para nós. Ninguém pode mudar sonhos, mas podemos ajudar a concretizá-los com forte e vitalidade. Venha e seja mais uma pessoa feliz junto a nós. Contamos muito com você, Deus te abençoe poderosamente. Clique e finalize sua doação."
    },
    {
        id: "",
        cron: "48_hs",
        nivel: 1,
        cat: "Recuperação de Boleto",
        title: "Você tem a chave?",
        text:  "Você tem uma chave poderosa que pode nos abrir muito caminhos entre as dificuldades da vida. Sua doação transforma vidas, leva Amor, Caridade, Esperança. Sentimentos que só você pode ajudar a construir nessa fase difícil em que vivemos. Obrigado por sua Doação, ela move montanhas."
    },
    {
        id: "",
        cron: "96_hs",
        nivel: 1,
        cat: "Recuperação de Boleto",
        title: "Estamos te chamando, você viu?",
        text:  "Seu coração batu mais forte para estar unido conosco nesta missão. Ouça sua voz e seja força viva junto a nossa missão. Você já faz parte de uma grande exército de pessoas do bem que ajudam a transformar o mundo com pequenos gestos de Amor e Gratidão. Venha, continue caminhando conosco."
    },
    {
        id: "",
        cron: "144_hs",
        nivel: 1,
        cat: "Recuperação de Boleto",
        title: "Sua promessa já chegou?",
        text:  "Todos nós temos uma promessa Bíblica que logo chegará, cedo ou tarde. Porém os que souberem o momento certo de olhar e mergulhar nela viverão algo extraordinário do Céu. Você já percebeu? Quando ajudamos mais, notamos em nossa vida o quanto somos mais gratos, mais pacientes, mais amados. A gratidão provém de exercícios do nosso ser junto aos irmãos, missões e trabalhos unidos ao coração de Deus. Seja um provedor em nossa missão e viva também uma grande transformação pessoal de gratidão."
    },
    {
        id: "",
        cron: "24_hs",
        nivel: 1,
        cat: "Boleto Vencido",
        title: "Estamos esperando sua presença, você vem?",
        text:  "Olá (fulano) Estamos ansiosos e contando os minutos para que você esteja conosco nessa missão maravilhosa que vivemos. Amar é nosso lema e servir nossa missão. Seja você também parte integrante dessa grande missão, contribua com nossa obra e veja os frutos que ela gera. Contamos com você! Seu boleto:"
    },
    {
        id: "",
        cron: "72_hs",
        nivel: 1,
        cat: "Boleto Vencido",
        title: "Bençãos para você",
        text:  "Olá (fulano). Ainda não conseguimos identificar o seu pagamento. Podemos ajudar de alguma forma?  Estamos orando por você para que muitas bençãos sejam derramadas sobre você. Pois você merece muitas e muitas bençãos. Seu boleto:"
    },
    {
        id: "",
        cron: "144_hs",
        nivel: 1,
        cat: "Boleto Vencido",
        title: "Precisamos de você",
        text:  "Oi (fulano). Nossa (instituição) precisa muito de sua ajuda e por isso queremos te convidar a estar presente conosco em cada momento para viver também as graças que recebemos. Mesmo não estando fisicamente, você já está espiritualmente. Por isso toda ajuda para mantermos a obra é bem vinda. Contamos com você, Deus te abençoe poderosamente. Graça e paz! Seu boleto:"
    }
]