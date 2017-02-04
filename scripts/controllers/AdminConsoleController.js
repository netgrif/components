/**
 * Created by Milan on 4.2.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').controller('AdminConsoleController',['$log','$scope','$http',
    function ($log, $scope, $http) {
        var self = this;

        self.invite = function () {
            var formData = angular.element("form#admin-invite-form").serialize();
            $log.debug(formData);
            $http.post('/login/invite',formData)
            .then(function (response) {
                $log.debug("Invite sent");
                $log.debug(response);
                angular.element("form#admin-invite-form input").val("");
            },function () {
                $log.debug("Invite failed!");
            });
        };



    }]);
});
