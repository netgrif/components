
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('authHttpInterceptor',function ($q, $location, $log, $cache) {
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
            },

            // TODO: rework, configurable message i18n
            response: function (response) {
                if(response.status === 200 && response.data === "This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).") {
                    $log.debug("Auth Interceptor kicks in again!");
                    $cache.put("auth","session-expired");
                    $location.path(interceptor.loginPath);
                    return undefined;
                }
                return response;
            }
        };
        return interceptor;
    });
});
