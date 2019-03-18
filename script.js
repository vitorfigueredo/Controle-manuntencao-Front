// Meu script

//Atua para mostrar o sidebar ou esconder, maximizand a tela de trabalho quando necessário
function mostraSidebar(){
    document.getElementById("my-sidebar-action").classList.toggle('active');
    document.getElementById("my-sidebar-action-menu").classList.toggle('active');
    document.getElementById("conteudo-pagina-mudar-espaco").classList.toggle('active');
    document.getElementById("menu-espaco-traseiro").classList.toggle('d-none');

    var menu = document.getElementById("my-sidebar-action");

    if( menu.classList.contains('active')){
        document.getElementById("conteudo-pagina-mudar-espaco").classList.remove("col-md-12");
        document.getElementById("conteudo-pagina-mudar-espaco").classList.add("col-md-9");

        document.getElementById("menu-espaco-traseiro").classList.remove("d-none");
    }else{
        document.getElementById("conteudo-pagina-mudar-espaco").classList.remove("col-md-9");
        document.getElementById("conteudo-pagina-mudar-espaco").classList.add("col-md-12");

        document.getElementById("menu-espaco-traseiro").classList.add("d-none");
    }
}

//Permite entrada apenas de números
function justNumbers(num) {
    var er = /[^0-9()-\s]/g;
    //er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value) || (campo.value < 0)) {
      campo.value = campo.value.replace(/.$/, '');
    }
}
//Permite entrada apenas de números
function justNumbersCNPJ(num) {
    var er = /[^0-9./-]/g;
    //er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value) || (campo.value < 0)) {
      campo.value = campo.value.replace(/.$/, '');
    }
}

//Permite entrada apenas de letras
function justLetters(caracter){
    var dig = /[^a-zA-Z\s]/g;
    var campoL = caracter;
    if(dig.test(campoL.value)){
        campoL.value = campoL.value.replace(/.$/, '');
    }
}