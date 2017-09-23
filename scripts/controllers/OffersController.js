define(['angular', '../classes/CaseTab', '../classes/TaskTab', '../modules/Offers', '../modules/Main', 'angularMaterialExpansionPanels'],
    function (angular, CaseTab, TaskTab) {
        angular.module('ngOffers').controller('OffersController',
            ['$log', '$scope', '$http', '$dialog', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n','$rootScope',
                function ($log, $scope, $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope) {
                    const self = this;

                    self.activeTabIndex = 0;
                    self.activeTab = undefined;
                    self.taskTabs = [];
                    self.caseTab = new CaseTab("My Offers", this, {
                        $http,
                        $dialog,
                        $snackbar,
                        $user,
                        $fileUpload,
                        $timeout,
                        $i18n
                    }, {
                        processName: "Insurance",
                        filter: [CaseTab.FIND_BY_AUTHOR, CaseTab.FIND_BY_PETRINET, CaseTab.FIND_BY_TRANSITION],
                        transitionNames: ["Nehnuteľnosť a domácnosť","Základné informácie","Údaje o zmluve"],
                        casType: "Offer"
                    });

                    self.tabChanged = function () {
                        self.activeTab = self.taskTabs[self.activeTabIndex - 1];
                        self.activeTab.activate();
                    };

                    /**
                     * add new tab for case's tasks if not already exists, then send refresh signal
                     * @param {Object} useCase
                     */
                    self.openTaskTab = function (useCase) {
                        if (!self.taskTabs.some(tab => tab.useCase.stringId === useCase.stringId))
                            self.taskTabs.push(new TaskTab(self.taskTabs.length, useCase.title, TaskTab.URL_SEARCH, [TaskTab.FIND_BY_CASE], useCase, {
                                $http,
                                $snackbar,
                                $dialog,
                                $user,
                                $fileUpload,
                                $timeout,
                                $mdExpansionPanelGroup,
                                $i18n
                            }, {
                                showTransactions: true,
                                allowHighlight: true
                            }));
                        else
                            self.activeTabIndex = self.taskTabs.findIndex(tab => tab.useCase.stringId === useCase.stringId) + 1;

                    };

                    self.closeTab = function (useCaseId) {
                        const index = self.taskTabs.findIndex(tab => tab.useCase.stringId === useCaseId);
                        if (index !== -1) {
                            self.taskTabs.splice(index, 1);
                            self.activeTabIndex = index < self.activeTabIndex ? self.activeTabIndex - 1 : self.activeTabIndex;
                        }
                    };

                    if($cache.get("dashboard") && $cache.get("dashboard").offers) {
                        self.caseTab.openCase($cache.get("dashboard").offers);
                        self.activeTabIndex = self.taskTabs.length;
                        $cache.remove("dashboard");
                    }
                    if($cache.get("create") && $cache.get("create").offers){
                        self.caseTab.openNewCaseDialog($i18n.page.offers.this);
                        $cache.remove("create");
                    }
                    $rootScope.$on("caseCreate", (event, type) => {
                        if(type === "offers")
                            self.caseTab.openNewCaseDialog($i18n.page.offers.this);
                    });
                }]);
    });
