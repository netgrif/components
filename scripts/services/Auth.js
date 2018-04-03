
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$auth',function ($http, $location, $rootScope ,$log, $timeout, $user, $snackbar, $i18n, $process) {
        var auth = {
            authenticated: false,

            loginPath: "/login",
            userPath: "user",
            logoutPath: "/logout",
            signupPath: "/signup",
            appPath: "/",
            path: $location.path(),
            // Configuration
            userSignUp: false,

            authenticate: function (credentials, callback) {
                //$log.debug(credentials);
                const headers = credentials && credentials.username ? {
                    'Authorization' : "Basic " + btoa(credentials.username + ":" + credentials.password)
                } : {};

                //$log.debug(headers);
                $http.get(auth.userPath,{
                    headers: headers
                }).then(function (response) {
                    //$log.debug(response);
                    auth.authenticated = !!response.name;

                    if(response.principal) {
                        let principal = response.principal;
                        $user.id = principal.id;
                        $user.login = principal.username;
                        $user.authority = principal.authorities.map(authority => authority.authority);
                        $user.name = principal.fullName;
                        $user.roles = principal.processRoles;
                    }

                    if(auth.authenticated){
                        $process.init().then(()=>{
                            callback && callback(auth.authenticated);
                            $location.path(auth.path === auth.loginPath ? auth.appPath : auth.path);
                        });
                    }

                },function (response) {
                    //$log.debug(response);
                    auth.authenticated = false;
                    callback && callback(false);
                });
            },
            logout: function () {
                $http.post(auth.logoutPath,{}).then(function () {
                    $log.debug("Logout successful");
                    auth.authenticated = false;
                    $user.clear();
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
                if(!auth.isExcluded()) {
                    this.authenticate({}, function (isLoggedIn) {
                        if (isLoggedIn) $location.path(auth.path);
                    });
                }

                $rootScope.$on('$locationChangeStart',function () {
                    if(!auth.isExcluded()){
                        auth.path = $location.path();
                        if(!auth.authenticated) $location.path(auth.loginPath);
                    } else {
                        auth.authenticated = false;
                        $user.clear();
                    }
                    $snackbar.hide();
                });
            },
            isExcluded: function () {
                return $location.path().startsWith(auth.loginPath) || $location.path().startsWith(auth.signupPath);
            }
        };
        return auth;
    });
});
