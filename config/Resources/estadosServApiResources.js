// Passa os objetos a serem salvados, editados, removidos e faz o chamado de todos os dados do banco

angular.module("start-angular").factory("estadosServAPI", function($http, configBackEnd) {
    var _getEstadosServ = function() {
        return $http.get(configBackEnd.resourceEstadosServ);
    };

    var _saveEstadosServ = function(estadoServ) {
        return $http.post(configBackEnd.resourceEstadosServ,estadoServ);
    };

    var _updateEstadosServ = function(estadoServ) {
        return $http.put(configBackEnd.resourceEstadosServ,estadoServ);
    };

    var _removeEstadosServ = function(estadoServParaRemover) {
        var url = configBackEnd.resourceEstadosServ + "/" + estadoServParaRemover.idMarca;
        return $http.delete(url);
    }

    return {
        getEstadosServ: _getEstadosServ,
        saveEstadosServ: _saveEstadosServ,
        updateEstadosServ: _updateEstadosServ,
        removeEstadosServ: _removeEstadosServ
    };
});