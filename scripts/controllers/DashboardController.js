define(['angular', '../classes/Case', '../classes/ActionCase', '../classes/Filter', '../modules/Main'],
    function (angular, Case, ActionCase, Filter) {
        angular.module('ngMain').controller('DashboardController',
            ['$log', '$scope', '$user', '$snackbar', '$http', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$cache', '$location', '$timeout', '$i18n', '$process',
                function ($log, $scope, $user, $snackbar, $http, $dialog, $fileUpload, $mdExpansionPanelGroup, $cache, $location, $timeout, $i18n, $process) {
                    const self = this;

                    self.limit = 3;
                    self.sort = {
                        attribute: "_id",
                        direction: "desc"
                    };

                    // self.tabs = {
                    //     quotes: {
                    //         cases: [],
                    //         loading: false,
                    //         title: $i18n.page.dashboard.quotes
                    //     },
                    //     policies: {
                    //         cases: [],
                    //         loading: false,
                    //         title: $i18n.page.dashboard.policies
                    //     },
                    //     contacts: {
                    //         cases: [],
                    //         loading: false,
                    //         title: $i18n.page.dashboard.contacts
                    //     }
                    // };
                    //
                    // self.load = function (filter, tab, type) {
                    //     const request = {
                    //         method: "POST",
                    //         url: `/res/workflow/case/search?sort=${self.sort.attribute},${self.sort.direction}&size=${self.limit}`,
                    //         data: filter.query
                    //     };
                    //     tab.loading = true;
                    //     $http(request).then(response => {
                    //         if (!response.$response().data._embedded) {
                    //             tab.loading = false;
                    //             return;
                    //         }
                    //         const rawData = response.$response().data._embedded.cases;
                    //         response.$request().$get("cases").then(resources => {
                    //             resources.forEach((r, i) => tab.cases.push(new Case(self, null, r, rawData[i]._links, {
                    //                 $http,
                    //                 $dialog,
                    //                 $snackbar,
                    //                 $user,
                    //                 $fileUpload,
                    //                 $i18n
                    //             }, {
                    //                 represents: type
                    //             })));
                    //             tab.loading = false;
                    //
                    //         }, () => {
                    //             $snackbar.error($i18n.block.snackbar.noResourceForCasesFound);
                    //             tab.splice(0, tab.cases.length);
                    //             tab.loading = false;
                    //         });
                    //     }, error => {
                    //         $snackbar.error($i18n.block.snackbar.gettingCasesFailed);
                    //         $log.error(error);
                    //         tab.loading = false;
                    //     });
                    // };
                    //
                    // self.openCase = function (useCase) {
                    //     const o = {
                    //         cases: useCase
                    //     };
                    //     $cache.put("dashboard", o);
                    //     $location.path("/"+useCase.represents);
                    // };
                    //
                    // self.load(new Filter("Quotes", Filter.CASE_TYPE,
                    //     `{"author":"${$user.login}","transition":["${$process.get("Insurance").transition("Iba nehnuteľnosť").id}", "${$process.get("Insurance").transition("Všeobecné informácie").id}"]}`,
                    //     "{}", null, null), self.tabs.quotes, "quotes");
                    //
                    // self.load(new Filter("Policies", Filter.CASE_TYPE,
                    //     `{"author":"${$user.login}","transition":"${$process.get("Insurance").transition("Sekcia - Všeobecné informácie").id}"}`,
                    //     "{}", null, null), self.tabs.policies, "policies");
                    //
                    // self.load(new Filter("Contacts", Filter.CASE_TYPE,
                    //     `{"author":"${$user.login}","petriNet":"${$process.get("Contact").id}"}`,
                    //     "{}", null, null), self.tabs.contacts, "contacts");
                }]);
    });
