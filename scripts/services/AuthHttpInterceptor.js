
define(['angular','angularRoute','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('authHttpInterceptor',function ($q, $location, $log) {
        let interceptor = {
            loginPath: "/login",

            responseError: function (rejection) {
                $log.debug("Interceptor: ");
                $log.debug(rejection);
                if(rejection.status == 401){
                    $location.path(this.loginPath);
                }
                return $q.reject(rejection);
            }
        };
        return interceptor;
    });
});
