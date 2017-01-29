/**
 * Created by Milan on 26.1.2017.
 */
/*  Top level module
    map all application components
 */
define('app',
    ['angular','angularMaterial','angularHal', 'angularRoute',
     'scripts/directives/DirectivesLoader',
     'scripts/filters/FiltersLoader',
     'scripts/services/ServicesLoader',
     'scripts/controllers/ControllersLoader'],
    function (angular) {
    // console.log(angular.version);
    var app = angular.module('app',
        ['ngMaterial','angular-hal','ngMessages','ngRoute',
         'ngMain','ngDashboard']); //here add modules that you defined
    app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
        $mdThemingProvider.definePalette('fmService', {
            '50': '#f3e0e6',
            '100': '#e0b3bf',
            '200': '#cc8095',
            '300': '#b74d6b',
            '400': '#a7264b',
            '500': '#98002b',
            '600': '#900026',
            '700': '#850020',
            '800': '#7b001a',
            '900': '#6a0010',
            'A100': '#ff99a1',
            'A200': '#ff6672',
            'A400': '#ff3343',
            'A700': '#ff1a2b',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100 A200',
            'contrastLightColors': undefined
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('fmService');

        $routeProvider
            .when('/',{
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dbc'
            })
            .when('/profile',{
                templateUrl: 'views/profile.html',
                controller: 'ProfileController'
            });

        $locationProvider.html5Mode(true);
    });
    // app.run(function ($log) {
    //     $log.debug("App is running...");
    // });

    return app;
});
