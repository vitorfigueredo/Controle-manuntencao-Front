// Passa os objetos a serem salvados, editados, removidos e faz o chamado de todos os dados do banco

angular.module("start-angular").factory("clientesAPI", function($http, configBackEnd) {
    var _getClientes = function() {
        return $http.get(configBackEnd.resourceClientes);
    };

    var _saveClientes = function(cliente) {
        return $http.post(configBackEnd.resourceClientes,cliente);
    };

    var _updateClientes = function(cliente) {
        return $http.put(configBackEnd.resourceClientes,cliente);
    };

    var _removeClientes = function(clienteParaRemover) {
        var url = configBackEnd.resourceClientes + "/" + clienteParaRemover.idCliente;
        return $http.delete(url);
    }

    return {
        getClientes: _getClientes,
        saveClientes: _saveClientes,
        updateClientes: _updateClientes,
        removeClientes: _removeClientes
    };
});