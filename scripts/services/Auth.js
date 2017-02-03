/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$auth',function ($http, $location, $rootScope ,$log) {
        var auth = {
            authenticated: false,

            loginPath: "/login",
            userPath: "user",
            logoutPath: "/logout",
            signupPath: "/login/signup",
            appPath: "/",
            path: $location.path(),

            authenticate: function (credentials, callback) {
                $log.debug(credentials);
                var headers = credentials && credentials.username ? {
                    'Authorization' : "Basic " + btoa(credentials.username + ":" + credentials.password)
                } : {};

                $log.debug(headers);
                $http.get(auth.userPath,{
                    headers: headers
                }).then(function (response) {
                    $log.debug(response);
                    auth.authenticated = !!response.name;
                    callback && callback(auth.authenticated);
                    $location.path(auth.path == auth.loginPath ? auth.appPath : auth.path);

                },function (response) {
                    $log.debug(response);
                    auth.authenticated = false;
                    callback && callback(false);
                });
            },
            logout: function () {
                $location.path(auth.loginPath);
                auth.authenticated = false;

                $http.post(auth.logoutPath,{}).then(function () {
                    $log.debug("Logout successful");
                }, function () {
                    $log.debug("Logout failed");
                });
            },
            signup: function (formData) {
                $http.post(auth.signupPath, {
                    data: formData
                }).then(function (response) {
                    $log.debug(response);
                });
            },
            init: function () {
                if($location.path() == '/test') return;

                if($location.path() != auth.loginPath && $location.path() != auth.signupPath) {
                    this.authenticate({}, function (isLoggedIn) {
                        if (isLoggedIn) $location.path(auth.path);
                    });
                }

                $rootScope.$on('$locationChangeStart',function () {
                    if($location.path() != auth.loginPath && $location.path() != auth.signupPath){
                        auth.path = $location.path();
                        if(!auth.authenticated) $location.path(auth.loginPath);
                    }
                });
            }
        };
        return auth;
    });
});
