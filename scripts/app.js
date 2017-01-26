/**
 * Created by Milan on 26.1.2017.
 */
/*  Top level module
    map all application modules
 */
define('app',['angular','angularMaterial','angularHal'], function (angular) {
    // console.log(angular.version);
    var app = angular.module('app',['ngMaterial','angular-hal','ngMessages']);
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
