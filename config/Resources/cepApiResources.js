// Passa cep a ser buscado pela API ViaCEP

angular.module("start-angular").factory("cepAPI", function($http, configOutBackEnd) {
    var _getCep = function(cepParaBuscar) {
        var url = configOutBackEnd.buscaCep + "/" + cepParaBuscar + "/json";
        return $http.get(url);
    };

    return {
        getCep: _getCep
    };
});