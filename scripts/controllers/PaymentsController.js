define(['angular', '../classes/TaskTab', '../modules/Payments','angularMaterialExpansionPanels'],
    function (angular,TaskTab) {
        angular.module('ngPayments').controller('PaymentsController',
            ['$log', '$scope', '$timeout', '$dialog', '$i18n', '$user', '$location', '$http', '$snackbar', '$fileUpload', '$mdExpansionPanelGroup',
                function ($log, $scope, $timeout, $dialog, $i18n, $user, $location, $http, $snackbar, $fileUpload, $mdExpansionPanelGroup) {
                    if (!$user.hasPermission("pair_payments"))
                        $location.path("/");

                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.tabs = [];

                    self.tabChanged = function () {
                        self.activeTab = self.tabs[self.activeTabIndex];
                        self.activeTab.activate();
                    };

                    self.addTab = function (tab) {
                        self.tabs.push(tab);
                    };

                    //Add tabs
                    self.addTab(new TaskTab(self.tabs.length, "Payments", TaskTab.URL_SEARCH, [TaskTab.FIND_BY_TITLE], {}, {
                        $http,
                        $snackbar,
                        $dialog,
                        $user,
                        $fileUpload,
                        $timeout,
                        $mdExpansionPanelGroup,
                        $i18n
                    }, {
                        showTransactions: false,
                        allowHighlight: false,
                        searchTitles: ["Napárovanie platby"],
                        taskView: true
                    }));
                }]);
    });