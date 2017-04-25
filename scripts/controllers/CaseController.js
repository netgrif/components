define(['angular', '../modules/Main', '../modules/Workflow'], function (angular) {
    class Tab {
        constructor(index, useCase) {
            this.index = index;
            this.useCase = useCase;

            this.tasks = [];
            this.sort = {
                field:'',
                reverse: false
            }
        }

        setSortField(field){
            this.sort.reverse = this.sort.field === field ? !this.sort.reverse : false;
            this.sort.field = field;
        }

        loadTaskData(visualId){

        }
    }

    angular.module('ngWorkflow').controller('CaseController', ['$log', '$scope','$http','$snackbar',
        function ($log, $scope, $http, $snackbar) {
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

            self.searchCases = function () {
                $http.post("/res/workflow/case/search",self.filter.filter).then(function (response) {
                    response.$request().$get("cases").then(function (resources) {
                        self.cases = resources;
                    }, function () {
                        $snackbar.error("No resource for cases was found!");
                        self.cases.splice(0,self.cases.length);
                    });
                },function () {
                    $snackbar.error("Getting cases failed!");
                })
            };

            self.tabChange = function () {
                self.activeTab = self.tabs[self.activeTabIndex - 1];
            };

            self.createCase = function () {

            };

            self.openCase = function (useCase) {
                self.tabs.push(new Tab(self.tabs.length, useCase));
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