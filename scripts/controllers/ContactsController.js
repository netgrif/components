define(['angular', '../modules/Contacts', '../modules/Main'],
    function (angular) {
        angular.module('ngContacts').controller('ContactsController',
            ['$log', '$scope',
                function ($log, $scope) {
                    const self = this;

                    self.alphabet = Array.apply(null, {length: 26}).map((x,i) => String.fromCharCode(65 + i));
                }]);
    });

