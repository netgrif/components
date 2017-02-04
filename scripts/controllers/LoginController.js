
define(['angular','../modules/Main','../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController',['$auth', '$loading','$log', '$snackbar',
    function ($auth, $loading, $log, $snackbar) {
        var self = this;

        self.credentials = {
            username: "",
            password: ""
        };
        self.signupUser = {
            token: "",
            email: "",
            password: "",
            name: "",
            surname: ""
        };
        self.error = {
            error: false
        };

        self.viewLoaded = loaded;
        function loaded() {
//			setTimeout(function() {
//				$log.debug("Login loaded");
//				$loading.showLoading(false);
//			}, 3000);
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

        self.signup = function () {
            var jsonSignupData = JSON.stringify(self.signupUser);
            $log.debug("formData: "+jsonSignupData);
            $auth.signup(jsonSignupData);
        };

		self.showToast = function(msg) {
            $snackbar.show(msg);
		};
    }]);
});
