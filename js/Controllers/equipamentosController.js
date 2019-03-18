angular.module("start-angular").controller("equipamentosController", function($scope, equipamentosAPI, marcasAPI) {
    $scope.equipamentos = [];

    //Função para carregar os Equipamentos do Banco de Dados
    var carregarEquipamentos = function() {
        equipamentosAPI.getEquipamentos()
        .then(function(response) {
            $scope.equipamentos = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };

    //Call Marcas
    $scope.marcas = [];
    var trazerAsMarcasDoBanco = function() {
        marcasAPI.getMarcas()
        .then(function(response) {
            $scope.marcas = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };

    //Método para salvar novo Equipamento no Banco de Dads
    $scope.adicionarEquipamento = function(equipamento) {
        var novoEquipamento = angular.copy(equipamento);
        equipamentosAPI.saveEquipamentos(novoEquipamento)
        .then(function(response) {
            delete $scope.equipamento;
            $scope.equipamentoForm.$setPristine();
            carregarEquipamentos();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };
    //Utilizado para remover um Equipamento
    $scope.removerEquipamento = function(equipamentoParaRemover) {
        if(!confirm("Deseja mesmo deletar o Equipamento: " + equipamentoParaRemover.nome)){
            return;
        };
        equipamentosAPI.removeEquipamentos(equipamentoParaRemover)
        .then(function(response) {
            carregarEquipamentos();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };
    //Function to fill inputs of update Modal with Equipamento data
    $scope.botaoEditarEquipamento = function(equipamentoParaEditar) {
            $scope.editarEquipamento = equipamentoParaEditar;        
    };
    //Function to update a single equipamento at a time
    $scope.updateEquipamento = function(equipamento) {
        var editEquipamento = angular.copy(equipamento);
        equipamentosAPI.updateEquipamentos(editEquipamento)
        .then(function(response) {
            delete $scope.equipamento;
            $scope.equipamentoEditForm.$setPristine();
            carregarEquipamentos();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };

    //Teste de preenchimento
    $scope.testeRequiredNome = function(){
        if($scope.equipamentoForm.nome.$untouched || $scope.equipamentoForm.nome.$pristine){
            return false;
        }else{
            return true;
        };
    };

    //Call Function to load data for Equipamentos and marcas
    carregarEquipamentos();
    trazerAsMarcasDoBanco();
});