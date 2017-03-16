
define(['angular','../modules/Main','../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController',['$http','$auth', '$loading','$log', '$snackbar','$routeSegment',
    function ($http, $auth, $loading, $log, $snackbar, $routeSegment) {
        var self = this;
        var dataLoadingStarted = false;

        self.credentials = {
            username: "",
            password: ""
        };
        self.signupUser = {
            token: $routeSegment.$routeParams.token,
            email: undefined,
            password: undefined,
            name: undefined,
            surname: undefined
        };

        self.viewLoaded = function () {
            if(dataLoadingStarted)return;
            dataLoadingStarted = true;

            if(self.signupUser.token) {
                $http.post("/login/token", self.signupUser.token)
                    .then(function (response) {
                        $log.debug("Login loaded");
                        self.signupUser.email = response.success;
                        $loading.showLoading(false);

                    }, function () {
                        $log.debug("Email retrieval failed");
                        $loading.showLoading(false);
						$snackbar.error("Failed to identify token");
                    });
            } else {
                $log.debug("Login loaded");
                $loading.showLoading(false);
            }
        };

        self.login = function () {
            $auth.authenticate(self.credentials, function (authenticated) {
                if(authenticated){
                    $log.debug("Login succeeded");
                } else {
                    $log.debug("Login failed");
					$snackbar.error("Wrong user credentials");
                }
            })
        };

        self.signup = function () {
            self.signupUser.password = btoa(self.signupUser.password);
            var jsonSignupData = JSON.stringify(self.signupUser);
            $log.debug("formData: "+jsonSignupData);
            $auth.signup(jsonSignupData,function (response) {
                if(response){
                    angular.element("form#signup-form").trigger("reset");
                } else {
					$snackbar.error("Registration failed");
                }
            });
        };

    }]);
});
