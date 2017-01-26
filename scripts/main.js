/**
 * Created by Milan on 26.1.2017.
 */
requirejs.config({
    baseUrl: "bower_components",
    paths: {
        'jquery': "jquery/dist/jquery.min",
        'angular': "angular/angular.min",
        'angularAnimate': "angular-animate/angular-animate.min",
        'angularAria': "angular-aria/angular-aria.min",
        'angularMessages': "angular-messages/angular-messages.min",
        'angularHal': "angular-hal/dist/angular-hal.min",
        'angularMaterial': "angular-material/angular-material.min",
        'domReady': "requirejs/domReady",
        'app': "../scripts/app"
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularAnimate': ['angular'],
        'angularAria': ['angular'],
        'angularMessages': ['angular'],
        'angularHal': ['angular'],
        'angularMaterial': ['angular', 'angularAnimate', 'angularAria', 'angularMessages']
    }
});

require(['domReady!','angular','app'], function (document, angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

});

