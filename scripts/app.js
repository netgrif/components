/**
 * Created by Milan on 26.1.2017.
 */
/*  Top level module
    map all application components
 */
define('app', ['angular', 'angularMaterial', 'angularHal', 'angularRoute', 'angularRouteSegment',
     'scripts/directives/DirectivesLoader',
     'scripts/filters/FiltersLoader',
     'scripts/services/ServicesLoader',
     'scripts/controllers/ControllersLoader'],
    function (angular) {
        // console.log(angular.version);
        var app = angular.module('app', ['ngMaterial', 'angular-hal', 'ngMessages', 'ngRoute', 'route-segment', 'view-segment',
         'ngMain', 'ngDashboard','ngTasks']); //here add modules that you defined
        app.config(function ($mdThemingProvider, $routeProvider, $routeSegmentProvider, $locationProvider, $httpProvider, $qProvider) {
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
                .primaryPalette('fmService')
                .accentPalette('grey');

            $routeSegmentProvider
                .when('/', 'app')
                .when('/login', 'login')
                .when('/login/signin', 'login.signin')
                .when('/login/signup', 'login.signup')
                .when('/dashboard', 'app.dashboard')
                .when('/tasks', 'app.tasks')
                .when('/profile', 'app.profile')
                .when('/console', 'app.console')
                .when('/test', 'test')

            .segment('app', {
                    templateUrl: "views/app/main.html",
                    controller: 'MainController',
                    controllerAs: 'mainCtrl'
                })
                .within()
                .segment('dashboard', {
                    default: true,
                    templateUrl: "views/app/dashboard.html",
                    controller: 'DashboardController',
                    controllerAs: 'dashCtrl'
                })
                .segment('profile', {
                    templateUrl: "views/app/profile.html",
                    controller: 'ProfileController',
                    controllerAs: 'profCtrl'
                })
                .segment('tasks', {
                    templateUrl: "views/app/tasks.html",
                    controller: 'TasksController',
                    controllerAs: 'tasksCtrl'
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
                .within()
                .segment('signin', {
                    default: true,
                    templateUrl: "views/login/signin_form.html"
                })
                .segment('signup', {
                    templateUrl: "views/login/signup_form.html"
                })
                .up()
                .segment('test', {
                    templateUrl: "views/test.html",
                    controller: 'MainController',
                    controllerAs: 'mainCtrl'
                });

            $locationProvider.html5Mode(true);
            $httpProvider.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";

            //$qProvider.errorOnUnhandledRejections(false);
        });
        app.run(function ($log, $auth, $rootScope, $i18n) {
            $log.debug("App is running...");
            $auth.init();
            $rootScope.$i18n = $i18n;
        });

        return app;
    });