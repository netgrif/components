define(['angular', '../classes/Task', "../classes/DataField", '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, Task, DataField) {
        angular.module('ngMain').controller('TaskPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$dialog', '$fileUpload', '$timeout', '$mdExpansionPanel', 'resource', 'links', 'tab', 'config', '$i18n',
                function ($log, $scope, $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanel, resource, links, tab, config, $i18n) {
                    const self = this;
                    Object.assign(self, resource, config);
                    self.links = links;
                    self.tab = tab;
                    self.panel = undefined;



                    //TODO neviem načo to tu je ... zistiť!
                    // $scope.disableNestedClick = function($event){
                    //     $event.preventDefault();
                    //     $event.stopPropagation();
                    // }
                    self.tab.addTaskController(self);
                }]);

    });
