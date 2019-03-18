angular.module("start-angular").controller("marcasController", function($scope, marcasAPI) {
    $scope.marcas = [];

    //Função para carregar os Marcas do Banco de Dados
    var carregarMarcas = function() {
        marcasAPI.getMarcas()
        .then(function(response) {
            $scope.marcas = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };
    //Método para salvar novo Marca no Banco de Dads
    $scope.adicionarMarca = function(marca) {
        var novoMarca = angular.copy(marca);
        marcasAPI.saveMarcas(novoMarca)
        .then(function(response) {
            delete $scope.marca;
            $scope.marcaForm.$setPristine();
            carregarMarcas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Utilizado para remover um Marca
    $scope.removerMarca = function(marcaParaRemover) {
        if(!confirm("Deseja mesmo deletar a marca: " + marcaParaRemover.nome)){
            return;
        };
        marcasAPI.removeMarcas(marcaParaRemover)
        .then(function(response) {
            carregarMarcas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Function to fill inputs of update Modal with Marca data
    $scope.botaoEditarMarca = function(marcaParaEditar) {
            $scope.editarMarca = marcaParaEditar;        
    };
    //Function to update a single marca at a time
    $scope.updateMarca = function(marca) {
        var editMarca = angular.copy(marca);
        marcasAPI.updateMarcas(editMarca)
        .then(function(response) {
            delete $scope.marca;
            $scope.marcaEditForm.$setPristine();
            carregarMarcas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Teste de preenchimento
    $scope.testeRequiredNome = function(){
        if($scope.marcaForm.nome.$untouched || $scope.marcaForm.nome.$pristine){
            return false;
        }else{
            return true;
        };
    };

    //Call load Function for Marcas
    carregarMarcas();
});