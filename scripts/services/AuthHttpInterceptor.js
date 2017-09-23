
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('authHttpInterceptor',function ($q, $location, $log) {
        let interceptor = {
            loginPath: "/login",
            signupPath: "/signup",

            responseError: function (rejection) {
                const isSignup = $location.path().startsWith(interceptor.signupPath);
                if(rejection.status === 401 && !isSignup){
                    $log.debug("Auth Interceptor kicks in!");
                    //$log.debug(rejection);
                    $location.path(interceptor.loginPath);
                }
                return $q.reject(rejection);
            }
        };
        return interceptor;
    });
});
