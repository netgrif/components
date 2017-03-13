
define(['angular', 'angularMaterial', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$bottomSheet', function ($mdBottomSheet, $log) {
        var controller = "BottomSheetController";
        var controllerAs = "sheetCtrl";

        let sheet = {
            selectAssignUser: function (task) {
                return $mdBottomSheet.show({
                    templateUrl: "views/app/bottom_sheets/user_assign_sheet.html",
                    controller: controller,
                    controllerAs: controllerAs,
                    locals: {task: task},
                    parent: "#bottomsheet-parent"
                });
            }
        };
        return sheet;
    });

    angular.module('ngMain').controller('BottomSheetController', ['$scope', '$mdBottomSheet', '$log', '$http', 'task',
        function ($scope, $mdBottomSheet, $log, $http, task) {
            var self = this;

            $scope.task = task;
            $scope.users = [];
            self.users = [];
            self.searched = undefined;
            self.selectedUser = -1;

            self.loadUsers = function () {
                //TODO: 7/3/2017 $http request to users that is in processRole for this task
                for(i=0; i<6; i++){
                    self.users.push({name: "User "+i, email: "user"+i+"@fmworkflow.com"});
                }
                $scope.users = self.users;
            };

            self.assignTask = function () {
                if(self.selectedUser === -1){
                    $mdBottomSheet.hide();
                } else {
                    $mdBottomSheet.hide($scope.users[self.selectedUser]);
                }
            };

            self.filterUsers = function () {
                //$log.debug("Search change: \""+self.searched+"\"");
                if(!self.searched) return;
                if(self.users == ""){
                    $scope.users = self.users;
                    return;
                }
                $scope.users = self.users.filter(user => user.name.includes(self.searched) || user.email.includes(self.searched));
            };

            self.getClass = function (index) {
                if(index == self.selectedUser) return "selected-tile";
            };

            self.loadUsers();

			angular.element('body').addClass('stop-scrolling');
			$scope.$on('$destroy', () => angular.element('body').removeClass('stop-scrolling'));
        }]);
});

