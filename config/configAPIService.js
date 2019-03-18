// Para utilizar o WildFly deixe a variável nomeProjeto com o valor "teste.estoque/", para utilizar o Swarm, deixe a variável nomeProjeto com o valor ""

var dominio_porta = "http://localhost:8080/";
var nomeProjeto = "controle.manuntencao/";
var rotaAPI = "controlemanutencao/";

//Urls de conexão com o Aplicação Java
angular.module("start-angular").value("configBackEnd", {
    resourceClientes: dominio_porta + nomeProjeto + rotaAPI + "clientes",
    resourceMarcas: dominio_porta + nomeProjeto + rotaAPI + "marcas",
    resourceEnderecos: dominio_porta + nomeProjeto + rotaAPI + "enderecos",
    resourceEquipamentos: dominio_porta + nomeProjeto + rotaAPI + "equipamentos"
});