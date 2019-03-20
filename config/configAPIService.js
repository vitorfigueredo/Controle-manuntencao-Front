// Para utilizar o WildFly deixe a variável nomeProjeto com o valor "controle.manuntencao/", para utilizar o Swarm, deixe a variável nomeProjeto com o valor ""

var dominio_porta = "http://localhost:8080/";
var nomeProjeto = "controle.manuntencao2/";
var rotaAPI = "controle-manutencao/";

//Urls de conexão com o Aplicação Java
angular.module("start-angular").value("configBackEnd", {
    resourceClientes: dominio_porta + nomeProjeto + rotaAPI + "clientes",
    resourceMarcas: dominio_porta + nomeProjeto + rotaAPI + "marcas",
    resourceEnderecos: dominio_porta + nomeProjeto + rotaAPI + "enderecos",
    resourceEquipamentos: dominio_porta + nomeProjeto + rotaAPI + "equipamentos",
    resourceEstadosServ: dominio_porta + nomeProjeto + rotaAPI + "estadoservs",
    resourceOrdensServ: dominio_porta + nomeProjeto + rotaAPI + "ordens"
});