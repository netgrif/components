define(['angular', '../modules/Contacts', '../modules/Main'],
    function (angular) {
        angular.module('ngContacts').controller('ContactController',
            ['$log', '$scope','useCase',
                function ($log, $scope, useCase) {
                    const self = this;
                    $scope.contact = useCase;

                }]);
    });
