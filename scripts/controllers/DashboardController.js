define(['angular', '../classes/Case', '../classes/ActionCase', '../modules/Main'],
    function (angular, Case, ActionCase) {
        angular.module('ngMain').controller('DashboardController',
            ['$log', '$scope', '$user', '$snackbar', '$http', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$cache', '$location',
                function ($log, $scope, $user, $snackbar, $http, $dialog, $fileUpload, $mdExpansionPanelGroup, $cache, $location) {
                    const self = this;

                    self.limit = 3;

                    self.offers = [];
                    self.contacts = [];
                    self.contracts = [];

                    self.offerNet = undefined;
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
                                petriNet: self.offerNet.entityId
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
                                transition: self.contractTransition.entityId
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
                                $snackbar.error("No resource for cases was found!");
                                self[target].splice(0, self[target].length);
                            });
                        }, function () {
                            $snackbar.error("Getting cases failed!");
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
                                    $fileUpload: $fileUpload
                                }, {caseType: "Contact"})));

                            }, function () {
                                $snackbar.error("No resource for cases was found!");
                                self[target].splice(0, self[target].length);
                            });
                        }, function () {
                            $snackbar.error("Getting cases failed");
                        });
                    };

                    self.loadPetriNet = function (title, target, callback = () => {
                    }) {
                        $http.post("/res/petrinet/ref", {title: title}).then(function (response) {
                            self[target] = response;
                            callback(true);
                        }, function () {
                            $snackbar.error(`Loading ${title} has failed!`);
                            callback(false);
                        })
                    };

                    self.loadTransitions = function (transition, net, target, callback = () => {
                    }) {
                        $http.post("/res/petrinet/transition/refs", [net]).then(function (response) {
                            response.$request().$get("transitionReferences").then(function (resources) {
                                self[target] = resources.find(r => r.title === transition);
                                self[target] ? callback(true) : callback(false);

                            }, function () {
                                console.log("References for transitions were not found!");
                                callback(false);
                            });
                        }, function () {
                            $snackbar.error("Loading data for filter has failed!");
                            callback(false);
                        });
                    };

                    self.loadPetriNet("Insurance", 'offerNet', success => {
                        if (!success) return;

                        self.loadOffers();
                        self.loadTransitions("Informácie o províziach", self.offerNet.entityId, 'contractTransition', success => {
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
