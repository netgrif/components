
define(['angular','config', 'scripts/version', '../modules/Main'],function (angular, config, version) {
    angular.module('ngMain').factory('$config',function ($log) {
        const service = {
            //Object for some methods to the future
        };
        return Object.assign(service, config, version);
    });
});
