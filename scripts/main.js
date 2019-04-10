
let localI18N = localStorage.getItem("locale") || undefined;

requirejs.config({
    baseUrl: './',
    paths: {
        'jquery': "bower_components/jquery/dist/jquery.min",
        'angular': "bower_components/angular/angular.min",
        'angularAnimate': "bower_components/angular-animate/angular-animate.min",
        'angularAria': "bower_components/angular-aria/angular-aria.min",
        'angularMessages': "bower_components/angular-messages/angular-messages.min",
        'angularHal':"bower_components/angular-hal/dist/angular-hal.min",
        'angularCurrencyFormat':"bower_components/angular-currency-format/dist/currency-format.min",
        'angularInView':"bower_components/angular-inview/angular-inview",
        'angularRoute': "bower_components/angular-route/angular-route.min",
        'angularRouteSegment': "bower_components/angular-route-segment/build/angular-route-segment",
        'angularMaterial': "bower_components/angular-material/angular-material.min",
        'angularMaterialExpansionPanels': "bower_components/angular-material-expansion-panel/dist/md-expansion-panel.min",
        'domReady': "bower_components/requirejs-domReady/domReady",
        'i18n': "bower_components/requirejs-i18n/i18n",
        'nls': "scripts/nls",
        'config': "scripts/config",
        'app': "scripts/app",
        'version': "scripts/version"
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
        'angularCurrencyFormat': ['angular'],
        'angularInView': ['angular'],
        'angularRoute': ['angular'],
        'angularRouteSegment': ['angular', 'angularRoute'],
        'angularMaterial': ['angular', 'angularAnimate', 'angularAria', 'angularMessages'],
        'angularMaterialExpansionPanels': ['angular', 'angularAnimate', 'angularAria', 'angularMessages','angularMaterial']
    },
    config: {
        i18n: {
            locale: localI18N
        }
    }
});

require(['domReady!','angular', 'config', 'i18n','app'], function (document, angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

});

