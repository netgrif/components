
define(['angular','../modules/Main','../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController',['$auth', '$loading','$log', '$snackbar',
    function ($auth, $loading, $log, $snackbar) {
        var self = this;

        self.credentials = {
            username: "",
            password: ""
        };
        self.error = {
            error: false
        };

        //$loading.registerLoadWatcher("/login", loaded);

        self.viewLoaded = loaded;
        function loaded() {
            $log.debug("Login loaded");
            $loading.showLoading(false);
        }

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
        };

		self.showToast = function(msg) {
            $snackbar.show(msg);
		};
    }]);
});
