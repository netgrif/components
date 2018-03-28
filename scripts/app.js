/*  Top level module
    map all application components
 */
define('app', ['angular', 'config', 'angularMaterial', 'angularHal','angularRouteSegment', 'angularMaterialExpansionPanels','angularInView',
         'scripts/directives/DirectivesLoader',
         'scripts/filters/FiltersLoader',
         'scripts/services/ServicesLoader',
         'scripts/controllers/ControllersLoader'],
    function (angular, config) {
        // console.log(angular.version);
        let app = angular.module('app', ['ngMaterial', 'ngMessages', 'angular-hal', 'ngRoute', 'route-segment', 'material.components.expansionPanels', 'view-segment','angular-inview',
            'ngMain', 'ngCases', 'ngAdmin', 'ngTasks', 'ngWorkflow']); // Here add modules that you defined
        app.config(function ($mdThemingProvider, $routeProvider, $routeSegmentProvider, $locationProvider, $httpProvider, $mdDateLocaleProvider, $compileProvider) {

            const theme = config.themes[config.theme];

            if(theme.primary instanceof Object)
                $mdThemingProvider.definePalette('mainPalette', theme.primary);
            if(theme.accent instanceof Object)
                $mdThemingProvider.definePalette('accentPalette', theme.accent);
            if(theme.warn instanceof Object)
                $mdThemingProvider.definePalette('warnPalette', theme.warn);

            const theming = $mdThemingProvider.theme('default');
            if(typeof theme.primary === "string")
                theming.primaryPalette(theme.primary);
            else
                theming.primaryPalette('mainPalette');

            if(typeof theme.accent === "string")
                theming.accentPalette(theme.accent);
            else
                theming.accentPalette('accentPalette');

            if(typeof theme.warn === "string")
                theming.warnPalette(theme.warn);
            else
                theming.warnPalette('warnPalette');

            $routeSegmentProvider
                .when('/', 'app')
                .when('/login', 'login')
                .when('/signup/:token', 'signup')
                .when('/dashboard', 'app.dashboard')
                .when('/cases', 'app.cases')
                .when('/console', 'app.console')
                .when('/profile', 'app.profile')
                .when('/tasks', 'app.tasks')
                .when('/workflow', 'app.workflow')
                .when('/settings', 'app.settings')

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
                .segment('settings', {
                    templateUrl: 'views/app/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'settCtrl'
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
                if(date) return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
                else return null;
            };

            $compileProvider.preAssignBindingsEnabled(true);

            //$qProvider.errorOnUnhandledRejections(false);
        });
        app.run(function ($log, $auth, $rootScope, $i18n, $user, $config, $snackbar) {
            $log.debug("App is running...");
            $auth.init();
            $rootScope.$i18n = $i18n;
            $rootScope.$user = $user;
            $rootScope.$config = $config;
            $rootScope.$snackbar = $snackbar;
        });

        return app;
    });