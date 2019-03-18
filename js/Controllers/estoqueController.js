angular.module("start-angular").controller("estoqueController", function($scope, movimentacaosAPI, layoutsAPI, produtosAPI, clientesAPI) {
    $scope.movimentacaos = [];
    $scope.produtos = [];
    $scope.clientes = [];
    $scope.estoqueDeProdutos = $scope.produtos;
    $scope.layouts = [];
    $scope.produtosAll = [];
    

    //Função para carregar os Movimentacoes do Banco de Dados
    var carregarMovimentacoes = function() {
        movimentacaosAPI.getMovimentacoes()
        .then(function(response) {
            $scope.movimentacaos = response.data;
            console.log($scope.movimentacaos)
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };

    var trazerProdutosDoBanco = function() {
        produtosAPI.getProdutos()
        .then(function(response) {
            var produtosGeral = response.data;
            produtosGeral.forEach(element => {
                if(element.quantidadeEstoque != null){
                    $scope.produtos.push(element);
                };
            $scope.produtosAll = response.data;
            });
            
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

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

    var montarEstoque = function(){
        $scope.estoqueDeProdutos = $scope.produtos;
        console.log($scope.estoqueDeProdutos);
    };

    var trazerClientesDoBanco = function() {
        clientesAPI.getClientes()
        .then(function(response) {
            $scope.clientes = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Método para salvar novo Movimentacao no Banco de Dads
    $scope.adicionarMovimentacao = function(movimentacao) {
        var novoMovimentacao = angular.copy(movimentacao);
        movimentacaosAPI.saveMovimentacoes(novoMovimentacao)
        .then(function(response) {
            delete $scope.estoque;
            $scope.movimentacaoForm.$setPristine();
            trazerProdutosDoBanco();
            montarEstoque();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Utilizado para remover um Movimentacao
    $scope.removerMovimentacao = function(movimentacaoParaRemover) {
        if(!confirm("Deseja mesmo deletar o movimentacao: " + movimentacaoParaRemover.nome)){
            return;
        };
        movimentacaosAPI.removeMovimentacoes(movimentacaoParaRemover)
        .then(function(response) {
            carregarMovimentacoes();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    //Function to fill inputs of update Modal with Movimentacao data
    $scope.botaoEditarMovimentacao = function(movimentacaoParaEditar) {
            $scope.editarMovimentacao = movimentacaoParaEditar;        
    };
    //Function to update a single movimentacao at a time
    $scope.updateMovimentacao = function(movimentacao) {
        var editMovimentacao = angular.copy(movimentacao);
        movimentacaosAPI.updateMovimentacoes(editMovimentacao)
        .then(function(response) {
            delete $scope.movimentacao;
            $scope.movimentacaoEditForm.$setPristine();
            carregarMovimentacoes();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Function to fill inputs of update Modal with Layout data
    $scope.botaoEditarLayout = function(produtoParaEditar) {
        carregarLayouts();
        console.log(produtoParaEditar);
        $scope.editarEstoque = produtoParaEditar;        
    };

    //Function to update a single movimentacao at a time
    $scope.updateEstoque = function(layout) {
        var editLayout = angular.copy(layout);
        produtosAPI.updateProdutos(editLayout)
        .then(function(response) {
            delete $scope.editarEstoque;
            $scope.estoqueEditForm.$setPristine();
            montarEstoque();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Teste de preenchimento
    $scope.RequiredProduto = function(){
        if($scope.movimentacaoForm.produto.$untouched || $scope.movimentacaoForm.produto.$pristine){
            return false;
        }else{
            return true;
        };
    };

    carregarMovimentacoes();
    trazerProdutosDoBanco();
    trazerClientesDoBanco();
    carregarLayouts();
    montarEstoque();

});