CREATE TABLE integracao (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    tipo varchar(75),
    identificacao_id varchar(255),
    chave varchar(255),
    token varchar(255)
);

CREATE TABLE inscrito (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    nome varchar(145),
    telefone varchar(75),
    email varchar(145)
);

CREATE TABLE recuperacao_doacao (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    token int,
    nome varchar(175),
    email varchar(175),
    valor int,
    callback varchar(255),
    data_para_envio varchar(25)
);

CREATE TABLE doacao (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    pano_id int,
    token int,
    nome varchar(175),
    email varchar(175),
    telefone varchar(20),
    valor int,
    codigo varchar(175),
    status varchar(175),
    boleto_url varchar(255),
    boleto_codigo varchar(255),
    pix varchar(255),
    callback varchar(255)
    data_registro varchar(25)
);

CREATE TABLE smtp (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    host varchar(255),
    porta int,
    usuario varchar(255),
    senha varchar(255),
    nome varchar(75)
);



CREATE TABLE template_email (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    titulo varchar(75),
    conteudo text,
    categoria_id int,
    status int,
    minutos int
);

CREATE TABLE categoria (
    id int not null auto_increment primary key,
    titulo varchar(75),
);


CREATE TABLE instituicao (
    id
    razao_social
    nome_fantasia
    email
    telefone
    rua
    cidade
    estado
    bairro
    complemento
    cnpj
    subdominio
    dominio
    dominio_personalizado
    created_at
    updated_at
    ativo
    cep
    atividade
    recebedor_id
    admin_master
    anotacao
);

CREATE TABLE configuracao (
    id
    instituicao_id
    flag
    base64
    ativo
    created_at
    updated_at
);