define(['angular', '../modules/Main', '../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController', ['$http', '$auth', '$loading', '$log', '$snackbar', '$routeSegment', '$i18n',
        function ($http, $auth, $loading, $log, $snackbar, $routeSegment, $i18n) {
            const self = this;
            let dataLoadingStarted = false;

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
            self.retypedPassword = "";
            self.signUpError = {
                match: false
            };
            self.loading = false;

            self.viewLoaded = function () {
                if (dataLoadingStarted) return;
                dataLoadingStarted = true;

                if (self.signupUser.token) {
                    $http.post("/signup/token", self.signupUser.token)
                        .then(function (response) {
                            $log.debug("Login loaded");
                            self.signupUser.email = response.success;
                            $loading.showLoading(false);

                        }, function () {
                            $log.debug("Email retrieval failed");
                            $loading.showLoading(false);
                            $snackbar.error($i18n.block.snackbar.failedToIdentifyToken);
                        });
                } else {
                    $log.debug("Login loaded");
                    $loading.showLoading(false);
                }
            };

            self.login = function () {
                $auth.authenticate(self.credentials, function (authenticated) {
                    if (authenticated) {
                        $log.debug("Login succeeded");
                    } else {
                        $log.debug("Login failed");
                        $snackbar.error($i18n.block.snackbar.wrongUserCredentials);
                        self.credentials.password = "";
                    }
                })
            };

            self.signup = function () {
                if (!self.signupUser.email) {
                    $snackbar.error($i18n.block.snackbar.userIsNotVerified);
                    return;
                }

                if (self.signupUser.password === self.retypedPassword) {
                    self.loading = true;
                    self.signupUser.password = btoa(self.signupUser.password);
                    const jsonSignupData = JSON.stringify(self.signupUser);
                    //$log.debug("formData: " + jsonSignupData);
                    $auth.signup(jsonSignupData, function (response) {
                        if (response) {
                            angular.element("form#signup-form").trigger("reset");
                        } else {
                            $snackbar.error($i18n.block.snackbar.registrationFailed);
                        }
                        self.loading = false;
                    });
                } else {
                    $snackbar.error($i18n.block.snackbar.passwordFieldsDoNotMatch);
                    self.loading = false;
                }
            };

            self.fireInfoSnackbar = function (msg) {
                $snackbar.info(msg);
            };

            self.matchPasswords = function () {
                self.signUpError.match = self.signupUser.password === self.retypedPassword;
            };

            self.viewLoaded();
        }]);
});
