angular.module("start-angular").controller("estadosServController", function($scope, estadosServAPI) {
    $scope.estadosServ = [];

    //Função para carregar os EstadosServ do Banco de Dados
    var carregarEstadosServ = function() {
        estadosServAPI.getEstadosServ()
        .then(function(response) {
            $scope.estadosServ = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };
    //Método para salvar novo EstadoServ no Banco de Dads
    $scope.adicionarEstadoServ = function(estadoServ) {
        var novoEstadoServ = angular.copy(estadoServ);
        estadosServAPI.saveEstadosServ(novoEstadoServ)
        .then(function(response) {
            delete $scope.estadoServ;
            $scope.estadoServForm.$setPristine();
            carregarEstadosServ();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Utilizado para remover um EstadoServ
    $scope.removerEstadoServ = function(estadoServParaRemover) {
        if(!confirm("Deseja mesmo deletar a estadoServ: " + estadoServParaRemover.nome)){
            return;
        };
        estadosServAPI.removeEstadosServ(estadoServParaRemover)
        .then(function(response) {
            carregarEstadosServ();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Function to fill inputs of update Modal with EstadoServ data
    $scope.botaoEditarEstadoServ = function(estadoServParaEditar) {
            $scope.editarEstadoServ = estadoServParaEditar;        
    };
    //Function to update a single estadoServ at a time
    $scope.updateEstadoServ = function(estadoServ) {
        var editEstadoServ = angular.copy(estadoServ);
        estadosServAPI.updateEstadosServ(editEstadoServ)
        .then(function(response) {
            delete $scope.estadoServ;
            $scope.estadoServEditForm.$setPristine();
            carregarEstadosServ();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Teste de preenchimento
    $scope.testeRequiredNome = function(){
        if($scope.estadoServForm.nome.$untouched || $scope.estadoServForm.nome.$pristine){
            return false;
        }else{
            return true;
        };
    };

    //Call load Function for EstadosServ
    carregarEstadosServ();
});