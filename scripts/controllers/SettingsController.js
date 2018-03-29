define(['angular', '../modules/Main'],
    function (angular) {
        angular.module('ngMain').controller('SettingsController',
            ['$http', '$log', '$scope', '$snackbar', '$user', '$i18n', '$rootScope', '$config',
                function ($http, $log, $scope, $snackbar, $user, $i18n, $rootScope, $config) {
                    const self = this;

                    self.changeUserSignUpPolicy = $config.enable.userSignUp;
                    // self.processes = {};

                    self.processes = {

                    };

                    self.loadProcesses = function () {
                        self.processes = $process.processes.forEach(p => {
                            $http.get(`/res/petrinet/${p.id}/roles`).then(response => {
                                response.$request().$get('roles').then(resources => {
                                    resources.forEach(r => {
                                        self.processes[p.id] = p;
                                        self.processes[p.id].roles = r;
                                        self.processes[p.id].selected = [];
                                    })

                                }, () => {

                                })
                            }, error => {

                            })
                        })
                    };

                    // self.loadProcesses();
                }
            ]
        );
    });