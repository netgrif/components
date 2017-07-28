/*  Top level module
    map all application components
 */
define('app', ['angular', 'angularMaterial', 'angularHal','angularRouteSegment', 'angularMaterialExpansionPanels','angularInView',
     'scripts/directives/DirectivesLoader',
     'scripts/filters/FiltersLoader',
     'scripts/services/ServicesLoader',
     'scripts/controllers/ControllersLoader'],
    function (angular) {
        // console.log(angular.version);
        let app = angular.module('app', ['ngMaterial', 'ngMessages', 'angular-hal', 'ngRoute', 'route-segment', 'material.components.expansionPanels', 'view-segment','angular-inview',
         'ngMain', 'ngOffers', 'ngContacts', 'ngContracts',  'ngDocuments']); //here add modules that you defined
        app.config(function ($mdThemingProvider, $routeProvider, $routeSegmentProvider, $locationProvider, $httpProvider, $mdDateLocaleProvider, $compileProvider) {
            $mdThemingProvider.definePalette('mainPalette', {
                '50': '#e3f6fa',
                '100': '#b8e8f2',
                '200': '#89d9e9',
                '300': '#59c9e0',
                '400': '#36bed9',
                '500': '#12b2d2',
                '600': '#10abcd',
                '700': '#0da2c7',
                '800': '#0a99c1',
                '900': '#058ab6',
                'A100': '#e0f6ff',
                'A200': '#ade8ff',
                'A400': '#7adaff',
                'A700': '#60d2ff',

                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200 A100 A200',
                'contrastLightColors': undefined
            });

            $mdThemingProvider.theme('default')
                .primaryPalette('mainPalette')
                .accentPalette('grey')
                .warnPalette('amber');

            // TODO 19.6.2017 define views
            $routeSegmentProvider
                .when('/', 'app')
                .when('/login', 'login')
                .when('/signup/:token', 'signup')
                .when('/offers', 'app.offers')
                .when('/documents', 'app.documents')
                .when('/contracts', 'app.contracts')
                .when('/contacts', 'app.contacts')
                .when('/console', 'app.console')

            .segment('app', {
                    templateUrl: "views/app/main.html",
                    controller: 'MainController',
                    controllerAs: 'mainCtrl'
                })
                .within()
                .segment('offers', {
                    default: true,
                    templateUrl: "views/app/offers.html",
                    controller: 'OffersController',
                    controllerAs: 'offCtrl'
                })
                .segment('contacts', {
                    templateUrl: "views/app/contacts.html",
                    controller: 'ContactsController',
                    controllerAs: 'contCtrl'
                })
                .segment('contracts', {
                    templateUrl: "views/app/contracts.html",
                    controller: 'ContractsController',
                    controllerAs: 'contractCtrl'
                })
                .segment('documents', {
                    templateUrl: "views/app/documents.html",
                    controller: 'DocumentsController',
                    controllerAs: 'docCtrl'
                })
                .segment('console', {
                    templateUrl: "views/app/console.html",
                    controller: 'AdminConsoleController',
                    controllerAs: 'adminCtrl'
                })
                .up()
                .segment('login', {
                    templateUrl: "views/login/login.html",
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl'
                })
                .segment('signup', {
                    templateUrl: "views/login/signup.html",
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl',
                    dependencies: ['token']
                });

            $locationProvider.html5Mode(true);
            $httpProvider.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
            $httpProvider.interceptors.push('authHttpInterceptor');

            $mdDateLocaleProvider.firstDayOfWeek = 1;
            $mdDateLocaleProvider.formatDate = date => {
                if(date) return date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
                else return null;
            };

            $compileProvider.preAssignBindingsEnabled(true);

            //$qProvider.errorOnUnhandledRejections(false);
        });
        app.run(function ($log, $auth, $rootScope, $i18n, $user) {
            $log.debug("App is running...");
            $auth.init();
            $rootScope.$i18n = $i18n;
            $rootScope.$user = $user;
        });

        return app;
    });