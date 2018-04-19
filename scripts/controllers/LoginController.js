define(['angular', '../modules/Main', '../services/Auth'], function (angular) {
    angular.module('ngMain').controller('LoginController', ['$http', '$auth', '$loading', '$log', '$snackbar', '$routeSegment', '$i18n', '$timeout', '$location',
        function ($http, $auth, $loading, $log, $snackbar, $routeSegment, $i18n, $timeout, $location) {
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
                $auth.authenticate({username: this.username, password: this.password}, authenticated => {
                    if (authenticated) {
                        $log.debug("Login succeeded");
                    } else {
                        $log.debug("Login failed");
                        $snackbar.error($i18n.block.snackbar.wrongUserCredentials);
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
                    else
                        $snackbar.error($i18n.block.snackbar.failedToIdentifyToken);
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
                        $snackbar.info("Registration successful");
                        $timeout(() => {
                            $location.path("/login");
                        }, 500);
                    } else {
                        $snackbar.error($i18n.block.snackbar.registrationFailed);
                    }
                    self.loading = false;
                });
            };


            function Invitation() {
                this.name = "invite";
                this.email = undefined;
            }

            Invitation.prototype.invite = function () {
                if(!this.email)
                    return;
                self.loading = true;
                $auth.invite(this.email, (success, message) => {
                    if(success){
                        $snackbar.info("Invitation was successfully sent");
                        $timeout(() => {
                            self.displaySelfInvitation(false);
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

                if ($routeSegment.$routeParams.token) {
                    self.activeView = new SignUp($routeSegment.$routeParams.token);
                    self.activeView.verifyToken();
                } else {
                    self.activeView = new Login();
                    $loading.showLoading(false);
                }
            };

            self.displaySelfInvitation = function (show) {
                if(show)
                    self.activeView = new Invitation();
                else
                    self.activeView = new Login();
            };

            self.viewLoaded();
        }]);
});
