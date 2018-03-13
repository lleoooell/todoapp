angular.module('todoapp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider.state({
        name: 'todos',
        url: '/',
        templateUrl: 'app/templates/home.html',
        controller: 'home.ctrl'
    });

    // $stateProvider.state({
    //     name: 'profil',
    //     url: '/eleve/:id',
    //     templateUrl: 'app/templates/profil.html',
    //     controller: 'ProfilCtrl'
    // });
    // $stateProvider.state({
    //     name: 'add',
    //     url: '/eleve/add',
    //     templateUrl: 'app/templates/add.eleve.html',
    //     controller: 'add.eleve'
    // });
    // $stateProvider.state({
    //     name: 'edit',
    //     url: '/edit/:id',
    //     templateUrl: 'app/templates/edit.html',
    //     controller: 'EditCtrl'
    // });

    // $stateProvider.state({
    //     name: 'about',
    //     url: '/about',
    //     templateUrl: 'app/templates/about.html'
    // });
    // $stateProvider.state({
    //     name: 'articles',
    //     url: '/articles/:id',
    //     templateUrl: 'app/templates/about.html'

    // });
    // $stateProvider.state({
    //     name: 'currency',
    //     url: '/currency',
    //     templateUrl: 'app/templates/currency.html',
    //     controller: 'ctrl.devise'

    // });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

});