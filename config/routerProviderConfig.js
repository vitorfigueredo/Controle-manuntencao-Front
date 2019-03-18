// Carrega os Ng-Views de acordo com as diretivas colocadas

angular.module("start-angular").config(AppConfig);

AppConfig.$inject = ['$routeProvider'];
function AppConfig($routeProvider) {
    

    $routeProvider
    .when('/', {
        templateUrl: 'Views/home.html',
        controller: 'homeController'
    })
    .when('/equipamentos', {
        templateUrl: 'Views/equipamentos.html',
        controller: 'equipamentosController'
    })
    .when('/equipamentos/marca', {
        templateUrl: 'Views/marcas.html',
        controller: 'marcasController'
    })
    .when('/estoque', {
        templateUrl: 'Views/estoque.html',
        controller: 'estoqueController'
    })
    .when('/estoque/layout', {
        templateUrl: 'Views/layout.html',
        controller: 'layoutsController'
    })
    .when('/estoque/movimentacoes', {
        templateUrl: 'Views/movimentacoes.html',
        controller: 'estoqueController'
    })
    .when('/clientes', {
        templateUrl: 'Views/clientes.html',
        controller: 'clientesController'
    })
    .otherwise({redirectTo: "/"});
}