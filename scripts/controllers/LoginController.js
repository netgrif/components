
define(['angular','../modules/Main','../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController',['$auth', '$loading','$log',
    function ($auth, $loading, $log) {
        var self = this;

        self.credentials = {
            username: "",
            password: ""
        };
        self.error = {};

        self.loaded = function () {
            $loading.showLoading(false);
        };

        self.login = function () {
            $auth.authenticate(self.credentials, function (authenticated) {
                if(authenticated){
                    $log.debug("Login succeeded");
                    self.error = {
                        error: false
                    };
                } else {
                    $log.debug("Login failed");
                    self.error = {
                        error: true,
                        msg: "Wrong user name or password"
                    };
                    $log.debug(self.error.msg);
                }
            })
        };

        self.logout = function () {
            $auth.logout();
        }
    }]);
});