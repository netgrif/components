/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Main'], function (angular) {
    angular.module('ngMain').factory('contentRouter',function () {
        var regModules = [];
        var mainModule, activeModule = 0;
        var numModules = 1;

        return {
            mainLoaded: function (callback) {
                mainModule = callback;
            },
            register: function (name, callback) {
                regModules.push({
                    id: name,
                    callback: callback
                });
                if(regModules.length == numModules){
                    mainModule();
                }
            },
            show: function (id) {
                regModules.some(function (item, index) {
                    if(id === item.id){
                        regModules[activeModule].callback(false);
                        item.callback(true);
                        activeModule = index;
                        return true;
                    }
                });
            }
        };
    });
});
