/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Main'], function (angular) {
    angular.module('ngMain').factory('contentLoader',function () {
        var mainModule;
        var modules = {};

        return {
            mainLoaded: function (callback) {
                mainModule = callback;
            },
            contentLoaded: function () {
                mainModule();
            },
            register: function (name, callback) {
                modules[name] = callback;
            },
            initModule: function (name) {
                modules[name]();
            }
        };
    });
});
