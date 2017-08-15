define(['angular', '../classes/CaseTab', 'angularMaterialExpansionPanels', '../modules/Contacts', '../modules/Main'],
    function (angular, CaseTab) {
        angular.module('ngContacts').controller('ContactsController',
            ['$log', '$scope', '$mdExpansionPanelGroup', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$i18n',
                function ($log, $scope, $mdExpansionPanelGroup, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $i18n) {
                    const self = this;

                    self.alphabet = Array.apply(null, {length: 26}).map((x, i) => String.fromCharCode(65 + i));
                    self.panelGroups = {};
                    self.caseTab = new CaseTab("Contacts", this, {
                        $http,
                        $dialog,
                        $snackbar,
                        $user,
                        $fileUpload,
                        $i18n
                    }, {processName: "Contact",
                        actionCase: true,
                        sort: "?sort=title",
                        filter: [CaseTab.FIND_BY_AUTHOR, CaseTab.FIND_BY_PETRINET],
                        caseType: "Contact"
                    });

                    self.registerPanelToGroup = function (group) {
                        group.register('contactPanel', {
                            templateUrl: "views/app/panels/contact_panel.html",
                            controller: "ContactController",
                            controllerAs: "contactCtrl"
                        });
                    };

                    self.getPanelGroup = function (title) {
                        return self.panelGroups[title.charAt(0).toUpperCase()];
                    };

                    $timeout(()=> {
                        self.alphabet.forEach(a => {
                            const group = $mdExpansionPanelGroup('contact-group-' + a);
                            try {
                                self.registerPanelToGroup(group);
                            } catch (error) {
                                //panel is already registrated in group
                            }
                            self.panelGroups[a] = group;
                        });
                        self.caseTab.activate();
                    },10);
                }]);
    });

