// Passa os objetos a serem salvados, editados, removidos e faz o chamado de todos os dados do banco

angular.module("start-angular").factory("enderecosAPI", function($http, configBackEnd) {
    var _getEnderecos = function() {
        return $http.get(configBackEnd.resourceEnderecos);
    };

    var _saveEnderecos = function(endereco) {
        return $http.post(configBackEnd.resourceEnderecos,endereco);
    };

    var _updateEnderecos = function(endereco) {
        return $http.put(configBackEnd.resourceEnderecos,endereco);
    };

    var _removeEnderecos = function(enderecoParaRemover) {
        var url = configBackEnd.resourceEnderecos + "/" + enderecoParaRemover.idEndereco;
        return $http.delete(url);
    };

    var _buscaEndereco = function(enderecoParaBuscar) {
        var urlBusca = configBackEnd.resourceEnderecos + "/busca?nome=" + enderecoParaBuscar;
        return $http.get(urlBusca);
    }

    return {
        getEnderecos: _getEnderecos,
        saveEnderecos: _saveEnderecos,
        updateEnderecos: _updateEnderecos,
        removeEnderecos: _removeEnderecos,
        buscaEndereco: _buscaEndereco
    };
});