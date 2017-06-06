/**
 * Created by Milan on 4.2.2017.
 */
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').controller('AdminConsoleController',['$log','$scope','$http', '$snackbar',
    function ($log, $scope, $http, $snackbar) {
        var self = this;

        self.inviteLoading = false;

        self.invite = function () {
            var formData = angular.element("form#admin-invite-form").serialize();
            $log.debug(formData);
            self.inviteLoading = true;
            $http.post('/singup/invite',formData)
            .then(function (response) {
				// TODO 16/3/2017 add loader animation
				$snackbar.success("Invite sent");
                $log.debug(response);
                self.inviteLoading = false;
                angular.element("form#admin-invite-form input").val("");
            },function () {
				$snackbar.error("Invite failed");
                self.inviteLoading = false;
            });
        };

    }]);
});
