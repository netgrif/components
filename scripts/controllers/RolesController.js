/**
 * Created by martin on 25.2.2017.
 */
define(['angular', 'angularCharts', '../modules/Roles', '../modules/Main'],
    function (angular) {
        angular.module('ngRoles').controller('RolesController', ['$log', '$scope', '$timeout', '$http', '$snackbar','$user',
            function ($log, $scope, $timeout, $http, $snackbar, $user) {
                let self = this;

                self.userInput = undefined;
                self.roleInput = undefined;
                self.isNameChecked = true;
                self.isEmailChecked = true;



                // TODO 6.6.2017 controller content
            }]);
    });