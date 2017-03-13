
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('authHttpInterceptor',function ($q, $location, $log) {
        let interceptor = {
            loginPath: "/login",

            responseError: function (rejection) {
                if(rejection.status == 401){
                    $log.debug("Interceptor: ");
                    $log.debug(rejection);
                    $location.path(this.loginPath);
                }
                return $q.reject(rejection);
            }
        };
        return interceptor;
    });
});
