/**
 * Created by Milan on 13.2.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$style',function () {
        var el = angular.element;

        return {
            mainView: function () {
                //styling elements in main.html
                el("jquery selector");
            }
        };
    });
});
