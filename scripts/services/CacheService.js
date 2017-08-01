define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$cache', function ($log) {
        const cache = {
            storage: {},

            get: function (key) {
                return cache.storage[key];
            },
            put: function (key, value) {
                cache.storage[key] = value;
            },
            remove: function (key) {
                delete cache.storage[key];
            }
        };
        return cache;
    });
});
