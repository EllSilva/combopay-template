<?php 

class EndDoacao {
    static function email_success() {
        $body = "
            Olá {{nome_doador}}, sua Doação foi concluída com sucesso.
            Somos imensamente gratos por sua doação. 
            Ela ajuda a manter todo projeto vivo e com pleno funcionamento
            Deus lhe abençoe poderosamente.
        ";
        $title = "Doação Concluída";
    }
    
    static function email_error() {
        $body = "
            Olá {{nome_doador}}, sua Doação foi concluída com sucesso.
            Somos imensamente gratos por sua doação. 
            Ela ajuda a manter todo projeto vivo e com pleno funcionamento
            Deus lhe abençoe poderosamente.
        ";
        $title = "Doação Concluída";
    }
}