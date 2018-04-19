define(['angular', 'angularRoute', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$auth', function ($http, $location, $rootScope, $log, $timeout, $user, $snackbar, $i18n, $process, $config) {

        const appPath = "/";
        const loginPath = "/login";
        const signupPath = "/signup";

        const serverLoginUrl = "/api/auth/login";
        const logoutUrl = "/api/auth/logout";
        const signupUrl = "/api/auth/signup";
        const tokenVerificationUrl = "/api/auth/token/verify";
        const invitationUrl = "/api/auth/invite";

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
                            callback && callback(auth.authenticated);
                            $location.path(auth.path === loginPath ? appPath : auth.path);
                        });
                    }

                }, function (response) {
                    auth.authenticated = false;
                    callback && callback(false);
                });
            },
            logout: function () {
                $http.post(logoutUrl, {}).then(function () {
                    $log.debug("Logout successful");
                    auth.authenticated = false;
                    $user.clear();
                    $location.path(loginPath);
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
            invite: function (email, callback = angular.noop) {
                $http.post(invitationUrl, {email: email, groups: [], processRoles: []}).then(response => {
                    if (response.success)
                        callback(true);
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
            init: function () {
                if (!auth.isExcluded()) {
                    this.authenticate({}, function (isLoggedIn) {
                        if (isLoggedIn) $location.path(auth.path);
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
            isExcluded: function () {
                return $location.path().startsWith(loginPath) || $location.path().startsWith(signupPath);
            }
        };
        return auth;
    });
});
