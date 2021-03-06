angular.module("start-angular").controller("ordensServicosController", function($scope, ordensServAPI, equipamentosAPI, clientesAPI, estadosServAPI) {
    $scope.ordensServicos = [];
    $scope.equipamentos = [];
    $scope.clientes = [];
    $scope.equipamentosAll = [];
    dataAtual = new Date;
    console.log("Data de Hoje é: " + dataAtual);
    $scope.ordemServicoDetalhada = [];
    $scope.EstadosDisponiveis = [];
    $scope.estadosServicos =[];
    

    //Função para carregar os Ordens do Banco de Dados
    var carregarOrdens = function() {
        ordensServAPI.getOrdens()
        .then(function(response) {
            $scope.ordensServicos = response.data;
            console.log($scope.ordensServicos)
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte."
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };

    //Função Para trazer os equipamentos do banco de dados
    var trazerEquipamentosDoBanco = function() {
        equipamentosAPI.getEquipamentos()
        .then(function(response) {
            var equipamentosGeral = response.data;
            equipamentosGeral.forEach(element => {
                if(element.quantidadeEstoque != null){
                    $scope.equipamentos.push(element);
                };
            $scope.equipamentosAll = response.data;
            });
            
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };

    //Função para trazer clientes
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

    //Método para salvar nova ordem de serviço no Banco de Dads
    $scope.adicionarNovaOrdem = function(novaOrdemFront) {
        var novaOrdemDeServico = angular.copy(novaOrdemFront);
        novaOrdemDeServico.aberturaOrdem = new Date;
        novaOrdemDeServico.estadoServ = new Object;
        novaOrdemDeServico.estadoServ.idEstadoServ = 1;
        console.log(novaOrdemDeServico);
        ordensServAPI.saveOrdens(novaOrdemDeServico)
        .then(function(response) {
            delete $scope.novaOrdemServico;
            $scope.ordemServicoForm.$setPristine();
            trazerEquipamentosDoBanco();
            carregarOrdens();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };
    
    //Function to fill inputs of update Modal with Movimentacao data
    $scope.botaoEditarMovimentacao = function(movimentacaoParaEditar) {
            $scope.editarMovimentacao = movimentacaoParaEditar;        
    };
    //Function to update a single ordem at a time
    $scope.updateMovimentacao = function(movimentacao) {
        var editMovimentacao = angular.copy(movimentacao);
        ordensServAPI.updateOrdens(editMovimentacao)
        .then(function(response) {
            delete $scope.movimentacao;
            $scope.movimentacaoEditForm.$setPristine();
            carregarMovimentacoes();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };


    //Function to update a single movimentacao at a time
    $scope.updateEstoque = function(layout) {
        var editLayout = angular.copy(layout);
        equipamentosAPI.updateProdutos(editLayout)
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

    //Função Para trazer os equipamentos do banco de dados
    var trazerEstadososDoBanco = function() {
        estadosServAPI.getEstadosServ()
        .then(function(response) {
            $scope.estadosServicos = response.data;
            
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };

    //Teste de preenchimento
    $scope.RequiredEquipamento = function(){
        if($scope.ordemServicoForm.$untouched || $scope.ordemServicoForm.$pristine){
            return false;
        }else{
            return true;
        };
    };

    $scope.passarOrdem = function(ordem){
        $scope.ordemServicoDetalhada = ordem;
        console.log($scope.ordemServicoDetalhada);
    }

    carregarOrdens();
    trazerEquipamentosDoBanco();
    trazerClientesDoBanco();
    trazerEstadososDoBanco();


    
});