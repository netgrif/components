define(['angular', '../classes/Case', '../classes/ActionCase', '../modules/Main'],
    function (angular, Case, ActionCase) {
        angular.module('ngMain').controller('DashboardController',
            ['$log', '$scope', '$user', '$snackbar', '$http', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$cache', '$location', '$timeout',
                function ($log, $scope, $user, $snackbar, $http, $dialog, $fileUpload, $mdExpansionPanelGroup, $cache, $location, $timeout) {
                    const self = this;

                    self.limit = 3;

                    self.offers = [];
                    self.contacts = [];
                    self.contracts = [];

                    self.offerNet = undefined;
                    self.offerTransitions = undefined;
                    self.contactNet = undefined;
                    self.contractTransition = undefined;

                    self.registerPanelToGroup = function () {
                        self.contactsPanelGroup = $mdExpansionPanelGroup("dashboard-contact-panel-group");
                        try {
                            self.contactsPanelGroup.register('contactPanel', {
                                templateUrl: "views/app/panels/contact_panel.html",
                                controller: "ContactController",
                                controllerAs: "contactCtrl"
                            });
                        } catch (error) {
                            //panel already registered
                        }
                    };

                    self.loadOffers = function () {
                        self.loadCases({
                            method: "POST",
                            url: "/res/workflow/case/search?sort=_id,desc&size=" + self.limit,
                            data: {
                                author: $user.id,
                                petriNet: self.offerNet.entityId,
                                transition: self.offerTransitions.map(t => t.entityId)
                            }
                        }, 'offers');
                    };

                    self.loadContacts = function () {
                        self.loadActionCases({
                            method: "POST",
                            url: "/res/workflow/case/search?sort=_id,desc&size=" + self.limit,
                            data: {
                                author: $user.id,
                                petriNet: self.contactNet.entityId
                            }
                        }, 'contacts');
                    };

                    self.loadContracts = function () {
                        self.loadCases({
                            method: "POST",
                            url: "/res/workflow/case/search?sort=_id,desc&size=" + self.limit,
                            data: {
                                author: $user.id,
                                petriNet: self.offerNet.entityId,
                                transition: self.contractTransition[0].entityId
                            }
                        }, 'contracts');
                    };

                    self.loadCases = function (request, target) {
                        $http(request).then(function (response) {
                            if (!response.$response().data._embedded) return;

                            const rawData = response.$response().data._embedded.cases;
                            response.$request().$get("cases").then(function (resources) {
                                resources.forEach((r, i) => self[target].push(new Case(null, null, r, rawData[i]._links, {
                                    $http: $http,
                                    $dialog: $dialog,
                                    $snackbar: $snackbar,
                                    $user: $user,
                                    $fileUpload: $fileUpload
                                }, {})));

                            }, function () {
                                $snackbar.error($i18n.block.snackbar.noResourceForCasesFound);
                                self[target].splice(0, self[target].length);
                            });
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.gettingCasesFailed);
                        });
                    };

                    self.loadActionCases = function (request, target) {
                        $http(request).then(function (response) {
                            if (!response.$response().data._embedded) return;

                            self.registerPanelToGroup();
                            const rawData = response.$response().data._embedded.cases;
                            response.$request().$get("cases").then(function (resources) {
                                resources.forEach((r, i) => self[target].push(new ActionCase(null, self.contactsPanelGroup, r, rawData[i]._links, {
                                    $http: $http,
                                    $dialog: $dialog,
                                    $snackbar: $snackbar,
                                    $user: $user,
                                    $fileUpload: $fileUpload,
                                    $timeout: $timeout
                                }, {
                                    caseType: "Contact",
                                    removable: false
                                })));

                            }, function () {
                                $snackbar.error($i18n.block.snackbar.noResourceForCasesFound);
                                self[target].splice(0, self[target].length);
                            });
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.gettingCasesFailed);
                        });
                    };

                    self.loadPetriNet = function (title, target, callback = () => {
                    }) {
                        $http.post("/res/petrinet/ref", {title: title}).then(function (response) {
                            self[target] = response;
                            callback(true);
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.loading + ` ${title} ` + $i18n.block.snackbar.failed);
                            callback(false);
                        })
                    };

                    self.loadTransitions = function (transitions, net, target, callback = () => {
                    }) {
                        $http.post("/res/petrinet/transition/refs", [net]).then(function (response) {
                            response.$request().$get("transitionReferences").then(function (resources) {
                                self[target] = resources.filter(r => transitions.includes(r.title));
                                self[target] && self[target].length > 0 ? callback(true) : callback(false);

                            }, function () {
                                console.log("References for transitions were not found!");
                                callback(false);
                            });
                        }, function () {
                            $snackbar.error($i18n.block.snackbar.loadingDataForFilterFailed);
                            callback(false);
                        });
                    };

                    self.loadPetriNet("Insurance", 'offerNet', success => {
                        if (!success) return;

                        self.loadTransitions(["Nehnuteľnosť a domácnosť", "Základné informácie", "Údaje o zmluve"], self.offerNet.entityId, 'offerTransitions', success => {
                            if (success)
                                self.loadOffers();
                        });
                        self.loadTransitions(["Informácie o províziach"], self.offerNet.entityId, 'contractTransition', success => {
                            if (success)
                                self.loadContracts();
                        });
                    });
                    self.loadPetriNet("Contact", 'contactNet', success => {
                        if (success)
                            self.loadContacts();
                    });

                    self.openCase = function (type, useCase) {
                        const o = {};
                        o[type] = useCase;
                        $cache.put("dashboard", o);
                        $location.path("/" + type);
                    };
                }]);
    });
