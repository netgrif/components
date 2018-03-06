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
         'ngMain', 'ngCases', 'ngAdmin', 'ngTasks', 'ngWorkflow']); // Here add modules that you defined
        app.config(function ($mdThemingProvider, $routeProvider, $routeSegmentProvider, $locationProvider, $httpProvider, $mdDateLocaleProvider, $compileProvider) {
            $mdThemingProvider.definePalette('mainPalette', {
                // Default palette
                // '50': '#E0F2F1',
                // '100': '#B2DFDB',
                // '200': '#80CBC4',
                // '300': '#4DB6AC',
                // '400': '#26A69A',
                // '500': '#009688',
                // '600': '#00897B',
                // '700': '#00796B',
                // '800': '#00695C',
                // '900': '#004D40',
                // 'A100': '#A7FFEB',
                // 'A200': '#64FFDA',
                // 'A400': '#1DE9B6',
                // 'A700': '#00BFA5',
                //
                // 'contrastDefaultColor': 'light',
                // 'contrastDarkColors': '50 100 200 A100 A200',
                // 'contrastLightColors': undefined

                // Dark-blue palette
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
                // Default palette
                // .primaryPalette('mainPalette')
                // .accentPalette('grey')
                // .warnPalette('red');

                // Dark-blue palette
                .primaryPalette('mainPalette')
                .accentPalette('grey')
                .warnPalette('amber');


            $routeSegmentProvider
                .when('/', 'app')
                .when('/login', 'login')
                .when('/signup/:token', 'signup')
                .when('/dashboard','app.dashboard')
                .when('/cases', 'app.cases')
                .when('/console', 'app.console')
                .when('/profile', 'app.profile')
                .when('/tasks', 'app.tasks')
                .when('/workflow', 'app.workflow')

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
                .segment('cases', {
                    templateUrl: "views/app/cases.html",
                    controller: 'CasesController',
                    controllerAs: 'caseCtrl'
                })
                .segment('console', {
                    templateUrl: "views/app/console.html",
                    controller: 'AdminConsoleController',
                    controllerAs: 'adminCtrl'
                })
                .segment('profile', {
                    templateUrl: 'views/app/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'profCtrl'
                })
                .segment('tasks', {
                    templateUrl: 'views/app/tasks.html',
                    controller: 'TasksController',
                    controllerAs: 'tasksCtrl'
                })
                .segment('workflow', {
                    templateUrl: 'views/app/workflow.html',
                    controller: 'WorkflowController',
                    controllerAs: 'workCtrl'
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
            $httpProvider.defaults.headers.common['Accept-Language'] = localStorage.getItem("locale") || 'en-US';
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