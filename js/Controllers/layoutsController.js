angular.module("start-angular").controller("layoutsController", function($scope, layoutsAPI) {
    $scope.layouts = [];

    //Função para carregar os Layouts do Banco de Dados
    var carregarLayouts = function() {
        layoutsAPI.getLayouts()
        .then(function(response) {
            $scope.layouts = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };
    //Método para salvar novo Layout no Banco de Dads
    $scope.adicionarLayout = function(layout) {
        var novoLayout = angular.copy(layout);
        layoutsAPI.saveLayouts(novoLayout)
        .then(function(response) {
            delete $scope.layout;
            $scope.layoutForm.$setPristine();
            carregarLayouts();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Utilizado para remover um Layout
    $scope.removerLayout = function(layoutParaRemover) {
        if(!confirm("Deseja mesmo deletar o Layout: " + layoutParaRemover.nome)){
            return;
        };
        layoutsAPI.removeLayouts(layoutParaRemover)
        .then(function(response) {
            carregarLayouts();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Function to fill inputs of update Modal with Layout data
    $scope.botaoEditarLayout = function(layoutParaEditar) {
            $scope.editarLayout = layoutParaEditar;
    };
    //Function to update a single categoria at a time
    $scope.updateLayout = function(layout) {
        var editLayout = angular.copy(layout);
        layoutsAPI.updateLayouts(editLayout)
        .then(function(response) {
            delete $scope.layout;
            $scope.layoutEditForm.$setPristine();
            carregarLayouts();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Teste de preenchimento
    $scope.testeRequiredNome = function(){
        if($scope.layoutForm.nome.$untouched || $scope.layoutForm.nome.$pristine){
            return false;
        }else{
            return true;
        };
    };

    //Call load Function for Layouts
    carregarLayouts();
});