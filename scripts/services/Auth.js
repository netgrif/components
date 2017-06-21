
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$auth',function ($http, $location, $rootScope ,$log, $timeout, $user, $snackbar) {
        const auth = {
            authenticated: false,

            loginPath: "/login",
            userPath: "user",
            logoutPath: "/logout",
            signupPath: "/login/signup",
            appPath: "/",
            path: $location.path(),

            authenticate: function (credentials, callback) {
                $log.debug(credentials);
                const headers = credentials && credentials.username ? {
                    'Authorization' : "Basic " + btoa(credentials.username + ":" + credentials.password)
                } : {};

                $log.debug(headers);
                // $http.get(auth.userPath,{
                //     headers: headers
                // }).then(function (response) {
                //     $log.debug(response);
                //     auth.authenticated = !!response.name;
                //
                //     let principal = response.principal;
                //     $user.id = principal.id;
                //     $user.login = principal.username;
                //     $user.authority = principal.authorities[0].authority;
                //     $user.name = principal.fullName;
                //     $user.roles = principal.processRoles;
                //
                //     callback && callback(auth.authenticated);
                //     $location.path(auth.path == auth.loginPath ? auth.appPath : auth.path);
                //
                // },function (response) {
                //     $log.debug(response);
                //     auth.authenticated = false;
                //     callback && callback(false);
                // });
                // auth.authenticated = true;
                auth.authenticated = false;
                $user.id = 1;
                $user.login = "user@netgrif.com";
                $user.authority = "ROLE_USER";
                $user.name = "User Something";
                $user.roles = ["0","1"];
                callback && callback(auth.authenticated);
                $location.path(auth.path === auth.loginPath ? auth.appPath : auth.path);
            },
            logout: function () {
                // $http.post(auth.logoutPath,{}).then(function () {
                //     $log.debug("Logout successful");
                //     auth.authenticated = false;
                //     $user.clear();
                //     $location.path(auth.loginPath);
                // }, function () {
                //     $log.debug("Logout failed");
                // });
                auth.authenticated = false;
                $user.clear();
                $location.path(auth.loginPath);
            },
            signup: function (formData, callback) {
                $http.post(auth.signupPath, formData)
                .then(function (response) {
                    $log.debug(response);
                    callback(response);
                    $timeout(function () {
                        auth.path = auth.loginPath;
                        $location.path(auth.loginPath);
                    },2000);
                }, function () {
                    $log.debug("Sign up failed!");
                    callback(false);
                });
            },
            init: function () {
                if(!auth.isLoginPath()) {
                    this.authenticate({}, function (isLoggedIn) {
                        if (isLoggedIn) $location.path(auth.path);
                    });
                }

                $rootScope.$on('$locationChangeStart',function () {
                    if(!auth.isLoginPath()){
                        auth.path = $location.path();
                        if(!auth.authenticated) $location.path(auth.loginPath);
                    } else {
                        auth.authenticated = false;
                        $user.clear();
                    }
                    $snackbar.hide();
                });
            },
            isLoginPath: function () {
                return $location.path().startsWith(auth.loginPath);
            }
        };
        return auth;
    });
});
