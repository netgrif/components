define(['angular','angularMaterial','../modules/Main'],function (angular) {
	angular.module('ngMain').factory('$dialog', function ($mdDialog, $log) {
		return {
			showByTemplate: function (template, parentController, optional) {
				return $mdDialog.show({
					controller: 'DialogController',
					controllerAs: 'dialogCtrl',
					templateUrl: '../../views/app/dialogs/dialog_' + template + '.html',
					parent: angular.element(document.body),
					locals: {
						parentCtrl: parentController,
						optional: optional
					},
					clickOutsideToClose: true,
					escapeToClose: true,
					fullscreen: true
				});
			},
			closeCurrent: function () {
				$mdDialog.hide();
            }
		};
	});

	angular.module('ngMain').controller('DialogController',['$scope','$log','$mdDialog','$http', '$snackbar','parentCtrl','optional',
		function ($scope, $log, $mdDialog, $http, $snackbar, parentCtrl, optional) {
			var self = this;

			$scope.parentCtrl = parentCtrl;
			$scope.opt = optional;

			//Variables for dialog_assign_user
			$scope.users = undefined;
			self.users = undefined;
            self.searched = undefined;
            self.selectedUser = undefined;

			$scope.closeDialog = function () {
				$mdDialog.hide();
            };

			//Delegate task methods
			self.loadUsers = function () {
			    if(!$scope.opt.task) return;
                $http.get("/res/petrinet/roles/users/"+$scope.opt.task.assignRole).then(function (response) {
                    self.users = response.users.map(user => {
                        return {
                            name: user.name+" "+user.surname,
                            email: user.email
                        }
                    });
                    $scope.users = self.users;
                }, function () {
                    $snackbar.error("Failed to load users with role +"+task.assignRole);
                });
            };

			$scope.filterUsers = function () {
                if(!self.users) return;
                if(self.users.length === 0) return;
                if(!self.searched || self.searched === ''){
                    //$scope.users = self.users.concat($scope.users.filter(user => self.users.indexOf(user) < 0)); //union of two arrays
                    $scope.users = self.users;
                } else {
                    $scope.users = self.users.filter(user => user.name.includes(self.searched) || user.email.includes(self.searched));
                }
            };

			$scope.getSelectedUserClass = function (email) {
                if(email === self.selectedUser) return 'selected-tile';
            };

			$scope.assignTask = function () {
                if(!$scope.opt.task) return;
                if(!self.selectedUser){
                    $mdDialog.hide();
                } else {
                    $mdDialog.hide(self.users.find(user => user.email === self.selectedUser));
                }
            };

			if($scope.opt && $scope.opt.task) {
                self.loadUsers();
            }
		}]);
});
