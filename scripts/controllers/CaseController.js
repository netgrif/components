define(['angular', '../modules/Main', '../modules/Workflow'], function (angular) {
    class Tab {
        constructor(label, index) {
            this.label = label;
            this.index = index;

            this.tasks = [];
        }
    }

    angular.module('ngWorkflow').controller('CaseController', ['$log', '$scope',
        function ($log, $scope) {
            var self = this;

            self.activeTabIndex = undefined;
            self.activeTab = undefined;
            self.cases = [];
            self.tabs = [];
            self.filter = {
                search: undefined,
                selected: undefined,
                chips: [],
                filter: [],
                nets:[]
            };
            self.sort = {
                field: '',
                reverse: false
            };

            self.loadCases = function () {
                //http request for all cases
            };

            self.searchCases = function () {

            };

            self.tabChange = function () {
                self.activeTab = self.tabs[self.activeTabIndex - 1];
            };

            self.createCase = function () {
                const idx = self.tabs.length;
                self.tabs.push(new Tab("Niečo dlhééééééééééééééé", idx));
            };

            self.tabClose = function (tabIndex) {
                self.tabs.splice(tabIndex, 1);
                self.activeTabIndex = tabIndex < self.activeTabIndex ? self.activeTabIndex-1 : self.activeTabIndex;
                for (let i = tabIndex; i < self.tabs.length; i++) {
                    self.tabs[i].index = i;
                }
            };

            self.searchItemSelected = function (item) {

            };

            self.queryNets = function () {

            };

            self.onChipRemove = function (chip) {

            };

            self.setSortField = function (field) {
                self.sort.reverse = self.sort.field === field ? !self.sort.reverse : false;
                self.sort.field = field;
            };


        }]);
});