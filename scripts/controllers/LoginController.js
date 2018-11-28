define(['angular', '../modules/Main', '../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController', ['$http', '$auth', '$loading', '$log', '$snackbar', '$routeSegment', '$i18n', '$timeout', '$location', '$cache',
        function ($http, $auth, $loading, $log, $snackbar, $routeSegment, $i18n, $timeout, $location, $cache) {
            const self = this;
            let dataLoadingStarted = false;

            self.loading = false;
            self.activeView = undefined;

            function Login() {
                this.name = "login";
                this.username = "";
                this.password = "";
            }

            Login.prototype.login = function () {
                $auth.authenticate({username: this.username, password: this.password}, authResponse => {
                    if (authResponse.authenticated) {
                        $log.debug("Login succeeded");
                    } else {
                        $log.debug("Login failed");
                        if (authResponse.response && authResponse.response.data) {
                            $log.error(authResponse.response.data);
                            if (authResponse.response.data.message)
                                $snackbar.error(authResponse.response.data.message);
                        } else {
                            $snackbar.error($i18n.block.snackbar.wrongUserCredentials);
                        }
                        this.password = "";
                    }
                });
            };


            function SignUp(token) {
                this.name = "signup";
                this.token = token;
                this.email = undefined;
                this.password = undefined;
                this.retypedPassword = undefined;
                this.name = undefined;
                this.surname = undefined;
                this.signUpError = {
                    passwordMatch: false
                }
            }

            SignUp.prototype.verifyToken = function () {
                $auth.verifyToken(this.token, email => {
                    if (email)
                        this.email = email;
                    else {
                        $snackbar.error($i18n.block.snackbar.failedToIdentifyToken);
                        $timeout(() => {
                            $location.path("/login");
                        }, 500);
                    }
                    $loading.showLoading(false);
                })
            };

            SignUp.prototype.matchPasswords = function () {
                this.signUpError.passwordMatch = this.password !== this.retypedPassword;
            };

            SignUp.prototype.signup = function () {
                if (!this.email) {
                    $snackbar.error($i18n.block.snackbar.userIsNotVerified);
                    return;
                }
                if (this.password !== this.retypedPassword) {
                    $snackbar.error($i18n.block.snackbar.passwordFieldsDoNotMatch);
                    return;
                }
                self.loading = true;
                $auth.signup({
                    token: this.token,
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    surname: this.surname
                }, response => {
                    if (response) {
                        angular.element("form#signup-form").trigger("reset");
                        $snackbar.success($i18n.block.snackbar.accountCreated);
                        $timeout(() => {
                            $location.path("/login");
                        }, 500);
                    } else {
                        $snackbar.error($i18n.block.snackbar.registrationFailed);
                    }
                    self.loading = false;
                });
            };


            function EmailField(name) {
                this.name = name;
                this.email = undefined;
            }

            EmailField.prototype.send = function () {
                if (!this.email)
                    return;
                self.loading = true;
                if (this.name === 'invite') {
                    $auth.invite({email: this.email}, (success, message) => {
                        if (success) {
                            $snackbar.success($i18n.block.snackbar.invitationEmailSent);
                            $timeout(() => {
                                self.displayEmailField(false);
                            }, 500);
                        } else {
                            $snackbar.error(message);
                        }
                        self.loading = false;
                    });
                } else if (this.name === 'reset') {
                    $auth.sendResetPassword(this.email, (success, message) => {
                        if (success) {
                            $snackbar.success($i18n.block.snackbar.pswRecoveryEmailSentTo + " " + this.email);
                            $timeout(() => {
                                self.displayEmailField(false);
                            }, 500);
                        } else {
                            $snackbar.error(message);
                        }
                        self.loading = false;
                    });
                }
            };

            function Recovery(token) {
                this.name = "recovery";
                this.token = token;
                this.password = undefined;
                this.retypedPassword = undefined;
                this.recoveryError = {
                    passwordMatch: false
                }
            }

            Recovery.prototype.matchPasswords = function () {
                this.recoveryError.passwordMatch = this.password !== this.retypedPassword;
            };

            Recovery.prototype.verifyToken = function () {
                $auth.verifyToken(this.token, email => {
                    if (email)
                        this.email = email;
                    else {
                        $snackbar.error($i18n.block.snackbar.failedToIdentifyToken);
                        $timeout(() => {
                            $location.path("/login");
                        }, 500);
                    }
                    $loading.showLoading(false);
                })
            };

            Recovery.prototype.recover = function () {
                if (this.password !== this.retypedPassword) {
                    $snackbar.error($i18n.block.snackbar.passwordFieldsDoNotMatch);
                    return;
                }
                self.loading = true;
                $auth.setNewPassword(this.token, this.password, (success, message) => {
                    if (success) {
                        angular.element("form#recovery-form").trigger("reset");
                        $snackbar.success($i18n.block.snackbar.newPswSet);
                        $timeout(() => {
                            $location.path("/login");
                        }, 500);
                    } else {
                        $snackbar.error(message);
                    }
                    self.loading = false;
                });
            };

            self.viewLoaded = function () {
                if (dataLoadingStarted) return;
                dataLoadingStarted = true;

                if ($routeSegment.$routeParams.token && $location.path().includes("/signup")) {
                    self.activeView = new SignUp($routeSegment.$routeParams.token);
                    self.activeView.verifyToken();
                } else if ($routeSegment.$routeParams.token && $location.path().includes("/recover")) {
                    self.activeView = new Recovery($routeSegment.$routeParams.token);
                    self.activeView.verifyToken();
                } else {
                    self.activeView = new Login();
                    $loading.showLoading(false);
                }
            };

            self.displayEmailField = function (show) {
                if (show)
                    self.activeView = new EmailField(show);
                else
                    self.activeView = new Login();
            };

            self.viewLoaded();
        }]);
});
