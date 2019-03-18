// Passa os objetos a serem salvados, editados, removidos e faz o chamado de todos os dados do banco

angular.module("start-angular").factory("equipamentosAPI", function($http, configBackEnd) {
    var _getEquipamentos = function() {
        return $http.get(configBackEnd.resourceEquipamentos);
    };

    var _saveEquipamentos = function(equipamento) {
        return $http.post(configBackEnd.resourceEquipamentos,equipamento);
    };

    var _updateEquipamentos = function(equipamento) {
        return $http.put(configBackEnd.resourceEquipamentos,equipamento);
    };

    var _removeEquipamentos = function(equipamentoParaRemover) {
        var url = configBackEnd.resourceEquipamentos + "/" + equipamentoParaRemover.idEquipamento;
        return $http.delete(url);
    }

    return {
        getEquipamentos: _getEquipamentos,
        saveEquipamentos: _saveEquipamentos,
        updateEquipamentos: _updateEquipamentos,
        removeEquipamentos: _removeEquipamentos
    };
});