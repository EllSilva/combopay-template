$(document).ready(function() {

  $(".quero, .quero_seta").on('click',function(){
    desliza('doar_agora');
  });

  if( $(".fotos ul").length > 0 && $(window).width() > 1100 ){
    $(".fotos ul").carouFredSel({
      width  : 720,
      height: 167,
      circular: false,
      infinite: false,
      swipe : {
        onMouse: true,
        onTouch: true
      },
      auto    : true,
      prev: '#p1', 
      next: '#n1',
      scroll: {
        items: 1,
        duration: 1000,
        timeoutDuration: 3000
      }
    });
  }

  $("#vnome").on('change blur focus',function(){
    if( $("#vnome").val().length > 3 && $("#vnome").val().indexOf(" ") == -1 ){
      mensagem('Informe o seu nome completo');
    }
  });

  $(".valores ul li").on('click',function(){
    $("#vvalor").val($(this).attr('data-value'));
    $("#valorfinal").val($(this).text().replace("R$","R$ "));
    $(".doacao #formulario .valores ul li").removeClass("ativo");
    $(this).addClass("ativo");
  });

  // MASCARA TELEFONE
  $("#vtelefone").inputmask({
    mask: ["99 9999-9999", "99 99999-9999", ],
    keepStatic: true
  });

  $('.doe').on('click',function(){
    $('.carregando').fadeIn();
  });

  $("#vcpf").inputmask({
    mask: ["999.999.999-99" ],
    keepStatic: true
  });
  $("#vcpf").on('blur',function(){
    $("#vcpf").validacpf();
  });

   //VALIDA CPF
    jQuery.fn.validacpf = function(){
        this.change(function(){
            CPF = $(this).val();
            if(!CPF){ return false;}
            ms  = new String;
            cpfv  = CPF;
            if(cpfv.length == 14 || cpfv.length == 11){
                cpfv = cpfv.replace('.', '');
                cpfv = cpfv.replace('.', '');
                cpfv = cpfv.replace('-', '');
                var nonNumbers = /\D/;
                if(nonNumbers.test(cpfv)){
                    ms = "Apenas numeros";
                }else{
                    if (cpfv == "00000000000" ||
                        cpfv == "11111111111" ||
                        cpfv == "22222222222" ||
                        cpfv == "33333333333" ||
                        cpfv == "44444444444" ||
                        cpfv == "55555555555" ||
                       cpfv == "66666666666" ||
                        cpfv == "77777777777" ||
                        cpfv == "88888888888" ||
                        cpfv == "99999999999") {
                        ms = "CPF inválido"
                    }
                    var a = [];
                    var b = new Number;
                    var c = 11;
                    for(i=0; i<11; i++){
                        a[i] = cpfv.charAt(i);
                        if (i < 9) b += (a[i] * --c);
                    }
                    if((x = b % 11) < 2){
                        a[9] = 0
                    }else{
                        a[9] = 11-x
                    }
                    b = 0;
                    c = 11;
                    for (y=0; y<10; y++) b += (a[y] * c--);
                   if((x = b % 11) < 2){
                        a[10] = 0;
                    }else{
                        a[10] = 11-x;
                    }
                    if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
                        ms = "CPF inválido";
                   }
                }
            }else{
                if(cpfv.length == 0){
                    return false;
                }else{
                    ms = "CPF inválido";
                }
            }
            if (ms.length > 0){
                $("#erro-cpf").html(ms).show();
                mensagem(ms,'errado');
                return false;
            } else {
              $("#erro-cpf").html('').hide();
            }
            return $(this);
        });
    }

});
// ENVIA DOAÇÃO
function enviaDoacao(id){
  if( $("#vnome").val().indexOf(" ") == -1 ){
    mensagem('Informe o seu nome completo');
    $('#vnome').focus();
    $('.carregando').fadeOut();
    return false;
  } else if($('#vnome').val()==''){
    mensagem('Informe o seu nome','erro');
    $('#vnome').focus();
    $('.carregando').fadeOut();
    return false;
  } else if($('#vcpf').val()==''){
    mensagem('Informe o seu CPF','erro');
    $('#vcpf').focus();
    $('.carregando').fadeOut();
    return false;
  } else if($('#vemail').val()==''){
    mensagem('Informe o seu e-mail','erro');
    $('#vemail').focus();
    $('.carregando').fadeOut();
    return false;
  } else if( document.formulario.vemail.value.search(/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/) == -1) {
    mensagem('Informe um e-mail valido','erro');
    $('#vemail').focus();
    $('.carregando').fadeOut();
    return false;
  } else if($('#vtelefone').val()==''){
    mensagem('Informe o seu telefone','erro');
    $('#vtelefone').focus();
    $('.carregando').fadeOut();
    return false;
  } else {
    $("#vcpf").validacpf();
    $('.carregando').fadeOut();
    $("#"+id).submit();
  }
}