CREATE TABLE integracao (
    id int not null auto_increment primary key,
    instituicao_id int not null,
    tipo varchar(75),
    identificacao_id varchar(255),
    chave varchar(255),
    token varchar(255)
);