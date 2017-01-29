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
    app.config(function ($mdThemingProvider, $routeProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('amber');

        $routeProvider
            .when('/',{
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/profile',{
                templateUrl: 'views/profile.html',
                controller: 'ProfileController'
            });

    });
    // app.run(function ($log) {
    //     $log.debug("App is running...");
    // });

    return app;
});
