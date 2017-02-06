
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
        self.error = {
            error: false
        };
        self.signupMsg = undefined;

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
                        self.signupMsg = "Failed to identify token! Try again with the right token.";
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
            self.signupUser.password = btoa(self.signupUser.password);
            var jsonSignupData = JSON.stringify(self.signupUser);
            $log.debug("formData: "+jsonSignupData);
            $auth.signup(jsonSignupData,function (response) {
                if(response){
                    self.signupMsg = "Registration succeeded! Redirecting to login page.";
                    angular.element("form#signup-form").trigger("reset");
                } else {
                    self.signupMsg = "Registration failed!";
                }
            });
        };

		self.showToast = function(msg) {
            $snackbar.show(msg);
		};
    }]);
});
