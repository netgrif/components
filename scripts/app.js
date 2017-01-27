/**
 * Created by Milan on 26.1.2017.
 */
/*  Top level module
    map all application components
 */
define('app',
    ['angular','angularMaterial','angularHal',
     'scripts/directives/DirectivesLoader',
     'scripts/filters/FiltersLoader',
     'scripts/services/ServicesLoader',
     'scripts/controllers/ControllersLoader'],
    function (angular) {
    // console.log(angular.version);
    var app = angular.module('app',
        ['ngMaterial','angular-hal','ngMessages',
         'ngMain','ngDashboard']); //here add modules that you defined
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('amber');
    });
    // app.run(function ($log) {
    //     $log.debug("App is running...");
    // });

    return app;
});
