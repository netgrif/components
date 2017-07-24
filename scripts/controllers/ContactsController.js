define(['angular', 'angularMaterialExpansionPanels', '../modules/Contacts', '../modules/Main'],
    function (angular) {
        angular.module('ngContacts').controller('ContactsController',
            ['$log', '$scope', '$mdExpansionPanelGroup', '$timeout',
                function ($log, $scope, $mdExpansionPanelGroup, $timeout) {
                    const self = this;

                    self.alphabet = Array.apply(null, {length: 26}).map((x, i) => String.fromCharCode(65 + i));

                    $timeout(()=> {
                        self.alphabet.forEach(a => {
                            const group = $mdExpansionPanelGroup('contact-group-' + a);
                            group.register('contactPanel', {
                                templateUrl: "views/app/panels/contact_panel.html",
                                controller: "ContactController",
                                controllerAs: "contactCtrl"
                            });

                            const n = Math.random() * 4;
                            for (let i = 0; i < n; i++)
                                group.add('contactPanel', {});
                        });
                    },10);
                }]);
    });

