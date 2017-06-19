
let localI18N = localStorage.getItem("locale") || undefined;

requirejs.config({
    baseUrl: './',
    paths: {
        'jquery': "bower_components/jquery/dist/jquery.min",
        'angular': "bower_components/angular/angular.min",
        'angularAnimate': "bower_components/angular-animate/angular-animate.min",
        'angularAria': "bower_components/angular-aria/angular-aria.min",
        'angularMessages': "bower_components/angular-messages/angular-messages.min",
        'angularRoute': "bower_components/angular-route/angular-route.min",
        'angularRouteSegment': "bower_components/angular-route-segment/build/angular-route-segment",
        'angularMaterial': "bower_components/angular-material/angular-material.min",
        'domReady': "bower_components/requirejs/domReady",
        'i18n': "bower_components/requirejs/i18n",
        'nls': "scripts/nls",
        'app': "scripts/app"
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularAnimate': ['angular'],
        'angularAria': ['angular'],
        'angularMessages': ['angular'],
        'angularRoute': ['angular'],
        'angularRouteSegment': ['angular', 'angularRoute'],
        'angularMaterial': ['angular', 'angularAnimate', 'angularAria', 'angularMessages']
    },
    config: {
        i18n: {
            locale: localI18N
        }
    }
});

require(['domReady!','angular','i18n','app'], function (document, angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

});

