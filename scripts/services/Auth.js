define(['angular', 'angularRoute', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$auth', function ($http, $location, $rootScope, $log, $timeout, $user, $snackbar, $i18n, $process, $config, $filterRepository) {

        const appPath = "/";
        const loginPath = "/login";
        const signupPath = "/signup";
        const recoverPath = "/recover";

        const serverLoginUrl = "/api/auth/login";
        const logoutUrl = "/api/auth/logout";
        const signupUrl = "/api/auth/signup";
        const tokenVerificationUrl = "/api/auth/token/verify";
        const invitationUrl = "/api/auth/invite";
        const resetPasswordUrl = "/api/auth/reset";
        const newPasswordUrl = "/api/auth/recover";

        const auth = {
            authenticated: false,

            path: $location.path(),
            // Configuration
            userSignUp: $config.enable.userSignUp,

            authenticate: function (credentials, callback = angular.noop) {
                const headers = credentials && credentials.username ? {
                    'Authorization': "Basic " + btoa(credentials.username + ":" + credentials.password)
                } : {};

                $http.get(serverLoginUrl, {
                    headers: headers
                }).then(function (response) {
                    auth.authenticated = !!response.email;
                    $user.fromResource(response);

                    if (auth.authenticated) {
                        $process.init().then(() => {
                            $filterRepository.createDefaults();
                            callback && callback({
                                authenticated: auth.authenticated
                            });
                            $location.path(auth.isExcluded(auth.path) ? appPath : auth.path);
                        });

                        $user.loadPreferences();

                        let element = document.getElementById("browser-support-msg");
                        if (!element.classList.contains("hide"))
                            element.classList.add("hide");
                    }

                }, function (response) {
                    auth.authenticated = false;
                    callback && callback({
                        authenticated: auth.authenticated,
                        response: response
                    });
                });
            },
            logout: function () {
                $http.post(logoutUrl, {}).then(function () {
                    $log.debug("Logout successful");
                    auth.authenticated = false;
                    $user.clear();
                    $location.path(loginPath);

                    let element = document.getElementById("browser-support-msg");
                    if (element.classList.contains("hide"))
                        element.classList.remove("hide");
                }, function () {
                    $log.debug("Logout failed");
                });
            },
            signup: function (formData, callback = angular.noop) {
                formData.password = btoa(formData.password);
                $http.post(signupUrl, formData)
                    .then(function (response) {
                        $log.debug(response);
                        if (response.success) {
                            callback(response);
                            auth.path = loginPath;
                        } else if (response.error) {
                            callback(false);
                        }
                    }, function () {
                        $log.debug("Sign up failed!");
                        callback(false);
                    });
            },
            verifyToken: function (token, callback = angular.noop) {
                $http.post(tokenVerificationUrl, token).then(response => {
                    if (response.success)
                        callback(response.success);
                    else if (response.error) {
                        $log.error(response.error);
                        callback(undefined);
                    }
                }, error => {
                    $log.error("Token failed to verify");
                    $log.error(error);
                    callback(false);
                })
            },
            invite: function (invitation, callback = angular.noop) {
                if (!invitation.groups)
                    invitation.groups = [];
                if (!invitation.processRoles)
                    invitation.processRoles = [];
                $http.post(invitationUrl, invitation).then(response => {
                    if (response.success)
                        callback(true, response.success);
                    else if (response.error) {
                        $log.error(response.error);
                        callback(false, response.error);
                    }
                }, error => {
                    $log.error("Sending invitation has failed");
                    $log.error(error);
                    callback(false, "");
                });
            },
            sendResetPassword: function (email, callback = angular.noop) {
                $http.post(resetPasswordUrl, email).then(response => {
                    if (response.success)
                        callback(true, response.success);
                    else if (response.error) {
                        $log.error(response.error);
                        callback(false, response.error);
                    }
                }, error => {
                    $log.error("Sending password reset email has failed");
                    $log.error(error);
                    callback(false, "");
                });
            },
            setNewPassword: function (token, password, callback = angular.noop) {
                $http.post(newPasswordUrl, {
                    token: token,
                    password: btoa(password),
                    email: "",
                    name: "",
                    surname: ""
                }).then(response => {
                    if (response.success)
                        callback(true, response.success);
                    else if (response.error) {
                        $log.error(response.error);
                        callback(false, response.error);
                    }
                }, error => {
                    $log.error("Setting new password has failed");
                    $log.error(error);
                    callback(false, "");
                });
            },
            init: function () {
                if (!auth.isExcluded()) {
                    this.authenticate({}, function (isLoggedIn) {
                        if (isLoggedIn.authenticated) $location.path(auth.path);
                    });
                }

                $rootScope.$on('$locationChangeStart', function () {
                    if (!auth.isExcluded()) {
                        auth.path = $location.path();
                        if (!auth.authenticated) $location.path(loginPath);
                    } else {
                        auth.authenticated = false;
                        $user.clear();
                    }
                    $snackbar.hide();
                });
            },
            isExcluded: function (location) {
                if (!location)
                    location = $location.path();
                const excluded = [loginPath, signupPath, recoverPath];
                return excluded.some(path => location.startsWith(path));
            }
        };
        return auth;
    });
});
