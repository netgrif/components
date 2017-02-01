/**
 * Created by Milan on 1.2.2017.
 */
define(['angular','angularMaterial','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$snackbar',function ($mdToast) {
        return {
            show: function (msg) {
                msg && $mdToast.show($mdToast.simple()
                    .textContent(msg)
                    .position("bottom right")
                    .hideDelay(3000));
            }
        };
    });
});
