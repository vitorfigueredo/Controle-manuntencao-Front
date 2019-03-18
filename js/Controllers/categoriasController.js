angular.module("start-angular").controller("categoriasController", function($scope, categoriasAPI) {
    $scope.categorias = [];

    //Função para carregar os Categorias do Banco de Dados
    var carregarCategorias = function() {
        categoriasAPI.getCategorias()
        .then(function(response) {
            $scope.categorias = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };
    //Método para salvar novo Categoria no Banco de Dads
    $scope.adicionarCategoria = function(categoria) {
        var novoCategoria = angular.copy(categoria);
        categoriasAPI.saveCategorias(novoCategoria)
        .then(function(response) {
            delete $scope.categoria;
            $scope.categoriaForm.$setPristine();
            carregarCategorias();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Utilizado para remover um Categoria
    $scope.removerCategoria = function(categoriaParaRemover) {
        if(!confirm("Deseja mesmo deletar a categoria: " + categoriaParaRemover.nome)){
            return;
        };
        categoriasAPI.removeCategorias(categoriaParaRemover)
        .then(function(response) {
            carregarCategorias();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Function to fill inputs of update Modal with Categoria data
    $scope.botaoEditarCategoria = function(categoriaParaEditar) {
            $scope.editarCategoria = categoriaParaEditar;        
    };
    //Function to update a single categoria at a time
    $scope.updateCategoria = function(categoria) {
        var editCategoria = angular.copy(categoria);
        categoriasAPI.updateCategorias(editCategoria)
        .then(function(response) {
            delete $scope.categoria;
            $scope.categoriaEditForm.$setPristine();
            carregarCategorias();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Teste de preenchimento
    $scope.testeRequiredNome = function(){
        if($scope.categoriaForm.nome.$untouched || $scope.categoriaForm.nome.$pristine){
            return false;
        }else{
            return true;
        };
    };

    //Call load Function for Categorias
    carregarCategorias();
});