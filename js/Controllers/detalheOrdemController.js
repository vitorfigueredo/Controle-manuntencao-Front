angular.module("start-angular").controller("detalheOrdemController", function($scope, ordensServAPI, equipamentosAPI, clientesAPI, estadosServAPI, $routeParams) {

    
    $scope.Ordem = [];
    $scope.estadosServicos = [];
    $scope.EstadosDisponiveis = [];
    
    //Função para carregar os Ordens do Banco de Dados
    var carregarOrdem = function() {
        ordensServAPI.buscarOrdemPorId($routeParams.idOrdem)
        .then(function(response) {
            $scope.Ordem = response.data;
            $scope.DatasdaOrdem = new Object;
            $scope.DatasdaOrdem.aberturaOrdem = new Date($scope.Ordem.aberturaOrdem);
            console.log($scope.Ordem)
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
    $scope.atualizarOrdem = function(ordemSalvar) {
        var ordemEditada = angular.copy(ordemSalvar);
        ordensServAPI.updateOrdens(ordemEditada)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };

    //Function to update a single ordem at a time
    $scope.SalvarStatus = function(ordemSalvar) {
        $scope.Ordem.estadoServ = ordemSalvar;
        if(ordemSalvar.idEstadoServ == 2){
            $scope.Ordem.inicioServico = new Date;
        }else if(ordemSalvar.idEstadoServ == 5){
            $scope.Ordem.terminoServico = new Date;
        }else if(ordemSalvar.idEstadoServ == 6 || ordemSalvar.idEstadoServ == 7){
            $scope.Ordem.fechamentoOrdem = new Date;
        }
        var ordemEditada = angular.copy($scope.Ordem);
        ordensServAPI.updateOrdens(ordemEditada)
        .then(function(response) {
            console.log(response);
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

    //Teste de preenchimento
    $scope.RequiredProduto = function(){
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

    carregarOrdem();
    trazerEquipamentosDoBanco();
    trazerClientesDoBanco();
    trazerEstadososDoBanco();

});