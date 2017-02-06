/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$auth',function ($http, $location, $rootScope ,$log,$timeout) {
        var auth = {
            authenticated: false,
            loggedUser: {},

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
                    auth.loggedUser.authority = response.authorities[0].authority;
                    auth.loggedUser.login = response.name;
                    callback && callback(auth.authenticated);
                    $location.path(auth.path == auth.loginPath ? auth.appPath : auth.path);

                },function (response) {
                    $log.debug(response);
                    auth.authenticated = false;
                    callback && callback(false);
                });
            },
            logout: function () {
                $http.post(auth.logoutPath,{}).then(function () {
                    $log.debug("Logout successful");
                    auth.authenticated = false;
                    $location.path(auth.loginPath);
                }, function () {
                    $log.debug("Logout failed");
                });
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
                if($location.path() == '/test') return;

                if(!auth.isLoginPath()) {
                    this.authenticate({}, function (isLoggedIn) {
                        if (isLoggedIn) $location.path(auth.path);
                    });
                }

                $rootScope.$on('$locationChangeStart',function () {
                    if(!auth.isLoginPath()){
                        auth.path = $location.path();
                        if(!auth.authenticated) $location.path(auth.loginPath);
                    }
                });
            },
            isLoginPath: function () {
                return $location.path().startsWith(auth.loginPath);
            }
        };
        return auth;
    });
});
