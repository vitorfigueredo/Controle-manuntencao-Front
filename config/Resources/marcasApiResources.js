// Passa os objetos a serem salvados, editados, removidos e faz o chamado de todos os dados do banco

angular.module("start-angular").factory("marcasAPI", function($http, configBackEnd) {
    var _getMarcas = function() {
        return $http.get(configBackEnd.resourceMarcas);
    };

    var _saveMarcas = function(marca) {
        return $http.post(configBackEnd.resourceMarcas,marca);
    };

    var _updateMarcas = function(marca) {
        return $http.put(configBackEnd.resourceMarcas,marca);
    };

    var _removeMarcas = function(marcaParaRemover) {
        var url = configBackEnd.resourceMarcas + "/" + marcaParaRemover.idMarca;
        return $http.delete(url);
    }

    return {
        getMarcas: _getMarcas,
        saveMarcas: _saveMarcas,
        updateMarcas: _updateMarcas,
        removeMarcas: _removeMarcas
    };
});