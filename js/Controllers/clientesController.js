angular.module("start-angular").controller("clientesController", function($scope, clientesAPI, cepAPI, enderecosAPI) {
    $scope.clientes = [];
    $scope.enderecoCompleto = [];
    $scope.novoEndereco = [];

    //Função para carregar os Clientes do Banco de Dados
    var carregarClientes = function() {
        clientesAPI.getClientes()
        .then(function(response) {
            $scope.clientes = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
            var mensagemUsuario = "Desculpe, não foi possível se conectar com o servidor, por favor tente mais tarde! Se o problema persistir, ligue para o suporte.";
            $scope.mensagemDeErro = mensagemUsuario;
        });
    };
    //Call Enderecos
    $scope.enderecos = [];
    var trazerOsEnderecosDoBanco = function() {
        enderecosAPI.getEnderecos()
        .then(function(response) {
            $scope.enderecos = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };
    //Método para salvar novo Cliente no Banco de Dados e salvar endereço caso não exista ainda
    $scope.adicionarCliente = function(cliente) {
        var novoCliente = angular.copy(cliente);
        enderecosAPI.buscaEndereco(novoCliente.endereco.cep).then(function(response){
            if(response.data == null || response.data.length == 0){
                enderecosAPI.saveEnderecos(novoCliente.endereco)
                .then(function(responseNovoEndereco) {
                    console.log(responseNovoEndereco);
                    $scope.novoEndereco = responseNovoEndereco.data;

                    novoCliente.endereco.idEndereco = $scope.novoEndereco.idEndereco;
                    console.log(novoCliente);
                    
                    clientesAPI.saveClientes(novoCliente)
                    .then(function(responseCliente) {
                        delete $scope.cliente;
                        $scope.clienteForm.$setPristine();
                        carregarClientes();
                    })
                    .catch(function(responseNovoEndereco) {
                        var mensagem = "Deu erro: " + responseNovoEndereco.status + " - " + responseNovoEndereco.statusText;
                        console.log(mensagem);
                    });
                })
                .catch(function(responseNovoEndereco2) {
                    var mensagem = "Deu erro: " + responseNovoEndereco2.status + " - " + responseNovoEndereco2.statusText;
                    console.log(mensagem);
                });
            }else{
                $scope.novoEndereco = response.data[0].idEndereco;
                console.log($scope.novoEndereco);
                novoCliente.endereco.idEndereco = $scope.novoEndereco;
                console.log(novoCliente);
                
                clientesAPI.saveClientes(novoCliente)
                .then(function(responseCliente) {
                    delete $scope.cliente;
                    $scope.clienteForm.$setPristine();
                    carregarClientes();
                })
                .catch(function(responseCliente) {
                    var mensagem = "Deu erro: " + responseCliente.status + " - " + responseCliente.statusText;
                    console.log(mensagem);
                });
            }
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
        
    };
    //Utilizado para remover um Cliente
    $scope.removerCliente = function(clienteParaRemover) {
        if(!confirm("Deseja mesmo deletar o cliente: " + clienteParaRemover.nome)){
            return;
        };
        clientesAPI.removeClientes(clienteParaRemover)
        .then(function(response) {
            carregarClientes();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };
    //Function to fill inputs of update Modal with Cliente data
    $scope.botaoEditarCliente = function(clienteParaEditar) {
            $scope.editarCliente = clienteParaEditar;        
    };
    //Function to update a single cliente at a time
    $scope.updateCliente = function(cliente) {
        var editCliente = angular.copy(cliente);
        clientesAPI.updateClientes(editCliente)
        .then(function(response) {
            delete $scope.cliente;
            $scope.clienteEditForm.$setPristine();
            carregarClientes();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };

    // Function with fill endereco inputs after search a CEP
    $scope.buscarCEP = function(cep) {
        var novoCep = angular.copy(cep);
        cepAPI.getCep(novoCep)
        .then(function(response) {
            $scope.enderecoCompleto = response.data;
            //console.log($scope.enderecoCompleto);
            passarEndereco($scope.enderecoCompleto);
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            console.log(mensagem);
        });
    };

    //Teste de preenchimento
    $scope.testeRequiredNome = function(){
        if($scope.clienteForm.nome.$untouched || $scope.clienteForm.nome.$pristine){
            return false;
        }else{
            return true;
        };
    };
    $scope.testeRequiredTelefone = function(){
        if($scope.clienteForm.telefone.$untouched || $scope.clienteForm.telefone.$pristine){
            return false;
        }else{
            return true;
        };
    };
    $scope.testeRequiredCelular = function(){
        if($scope.clienteForm.celular.$untouched || $scope.clienteForm.celular.$pristine){
            return false;
        }else{
            return true;
        };
    };
    $scope.testeRequiredEndereco = function(){
        if($scope.clienteForm.endereco.$untouched || $scope.clienteForm.endereco.$pristine){
            return false;
        }else{
            return true;
        };
    };

    carregarClientes();

    // Utiliza apenas os campos desejado da API ViaCEP para compor a tabela interna de endereco
    var passarEndereco = function(endCompleto){
        $scope.cliente.endereco.logradouro = endCompleto.logradouro;
        $scope.cliente.endereco.bairro = endCompleto.bairro;
        $scope.cliente.endereco.cidade = endCompleto.localidade;
        $scope.cliente.endereco.uf = endCompleto.uf;
        // console.log($scope.cliente.endereco);
        $scope.editarCliente.endereco.logradouro = endCompleto.logradouro;
        $scope.editarCliente.endereco.bairro = endCompleto.bairro;
        $scope.editarCliente.endereco.cidade = endCompleto.localidade;
        $scope.editarCliente.endereco.uf = endCompleto.uf;
        console.log($scope.editarCliente.endereco);
    };
});