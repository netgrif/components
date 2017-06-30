define(['angular', '../modules/Contacts', '../modules/Main'],
    function (angular) {
        angular.module('ngContacts').controller('ContactController',
            ['$log', '$scope',
                function ($log, $scope) {
                    const self = this;

                    $scope.contact = {
                        name: "Name Surname",
                        primaryPhone: "+42100000000",
                        email: "info@netgrif.com",
                        id: "000000/0000",
                        note: "Some note"
                    };
                }]);
    });
