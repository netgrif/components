/**
 * Created by Milan on 3.2.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$i18n',function () {
        return {
            main: {
                tasks: "Úlohy"
            }
        };
    });
});