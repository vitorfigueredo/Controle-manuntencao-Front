// Passa os objetos a serem salvados, editados, removidos e faz o chamado de todos os dados do banco

angular.module("start-angular").factory("ordensServAPI", function($http, configBackEnd) {
    var _getOrdens = function() {
        return $http.get(configBackEnd.resourceOrdensServ);
    };

    var _saveOrdens = function(ordem) {
        return $http.post(configBackEnd.resourceOrdensServ,ordem);
    };

    var _updateOrdens = function(ordem) {
        return $http.put(configBackEnd.resourceOrdensServ,ordem);
    };

    var _removeOrdens = function(ordemParaRemover) {
        var url = configBackEnd.resourceOrdensServ + "/" + ordemParaRemover.idOrdem;
        return $http.delete(url);
    };

    var _buscaOrdem = function(idDaOrdem) {
        var urlBusca = configBackEnd.resourceOrdensServ + "/" + idDaOrdem;
        return $http.get(urlBusca);
    };

    return {
        getOrdens: _getOrdens,
        saveOrdens: _saveOrdens,
        updateOrdens: _updateOrdens,
        removeOrdens: _removeOrdens,
        buscarOrdemPorId: _buscaOrdem
    };
});