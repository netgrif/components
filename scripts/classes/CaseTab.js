define(['./Tab', './Case', './ActionCase'], function (Tab, Case, ActionCase) {
    /**
     * Constructor for CaseTab class
     * Angular dependencies: $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $i18n
     * @param {String} label
     * @param {Object} controller
     * @param {Object} angular
     * @param {Object} config - processName(string), actionCase(boolean)
     * @constructor
     */
    function CaseTab(label, controller, angular, config = {}) {
        Tab.call(this, 0, label);

        this.controller = controller;
        Object.assign(this, angular, config);

        this.cases = [];
        this.newCase = {
            title: this.$i18n.block.case.newTitle[this.caseType]
        };
    }

    CaseTab.prototype = Object.create(Tab.prototype);
    CaseTab.prototype.constructor = CaseTab;

    CaseTab.URL_SEARCH = "/res/workflow/case/search";
    CaseTab.FIND_BY_AUTHOR = 0;
    CaseTab.FIND_BY_PETRINET = 1;
    CaseTab.FIND_BY_TRANSITION = 2;


    CaseTab.prototype.activate = function () {
        if (this.cases.length === 0)
            this.loadPetriNet(this.processName, (success) => {
                if (success) {
                    if(this.transitionNames)
                        this.loadTransitions(success => {
                            if(success) this.load(false);
                        });
                    else
                        this.load(false);
                }
            });
    };

    CaseTab.prototype.buildSearchRequest = function (url, criteria = []) {
        const data = {};
        criteria.forEach(c => {
            if (c === CaseTab.FIND_BY_AUTHOR)
                data.author = this.$user.id;
            if (c === CaseTab.FIND_BY_PETRINET)
                data.petriNet = this.net.entityId;
            if(c === CaseTab.FIND_BY_TRANSITION){
                if(this.transitions.length === 1)
                    data.transition = this.transitions[0].entityId;
                else
                    data.transition = this.transitions.map(t => t.entityId);
            }
        });
        return {
            method: "POST",
            url: url + (this.sort ? this.sort : "?sort=_id,desc"),
            data: data
        };
    };

    CaseTab.prototype.load = function (next) {
        const self = this;
        if (this.page.totalElements === this.cases.length || this.loading || !this.net) return;
        const url = next ? (self.page.next ? self.page.next : CaseTab.URL_SEARCH) : CaseTab.URL_SEARCH;
        const config = this.buildSearchRequest(url, this.filter);
        self.loading = true;
        this.$http(config).then(function (response) {
            self.page = Object.assign(self.page, response.page);
            if (self.page.totalElements === 0) {
                self.$snackbar.info(self.$i18n.block.snackbar.noCases);
                self.cases.splice(0, self.cases.length);
                self.loading = false;
                return;
            }
            const rawData = response.$response().data._embedded.cases;
            response.$request().$get("cases").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    self.page.last = response.$href("last");
                    if (url !== self.page.last)
                        self.page.next = response.$href("next");
                }
                self.parseCase(resources, rawData, next);
                self.loading = false;
            }, function () {
                self.$snackbar.error(self.$i18n.block.snackbar.noResourceForCasesFound);
                self.page.last = undefined;
                self.page.next = undefined;
                self.cases.splice(0, self.cases.length);
                self.loading = false;
            });
        }, function () {
            self.$snackbar.error(self.$i18n.block.snackbar.gettingCasesFailed);
            self.loading = false;
        })
    };

    CaseTab.prototype.parseCase = function (resources, rawData, next) {
        const cases = [];
        if (this.actionCase) {
            resources.forEach((r, i) => cases.push(new ActionCase(this, this.controller.getPanelGroup(r.title), r, rawData[i]._links, {
                $http: this.$http,
                $dialog: this.$dialog,
                $snackbar: this.$snackbar,
                $user: this.$user,
                $fileUpload: this.$fileUpload,
                $timeout: this.$timeout,
                $i18n: this.$i18n
            },{
                caseType: this.caseType,
                removable: true
            })));
        } else {
            resources.forEach((r, i) => cases.push(new Case(this, null, r, rawData[i]._links, {
                $http: this.$http,
                $dialog: this.$dialog,
                $snackbar: this.$snackbar,
                $user: this.$user,
                $fileUpload: this.$fileUpload,
                $i18n: this.$i18n
            })));
        }

        if (next) cases.forEach(useCase => this.cases.push(useCase));
        else this.cases = cases;
    };

    CaseTab.prototype.openCase = function (useCase) {
        if(this.actionCase) return;
        this.controller.openTaskTab(useCase);
    };

    CaseTab.prototype.closeCase = function (useCase) {
        if(this.actionCase) return;
        this.controller.closeTab(useCase.stringId);
    };

    CaseTab.prototype.openNewCaseDialog = function (title) {
        //this.loadPetriNets();
        this.$dialog.showByTemplate('create_case', this,{title:title});
    };

    CaseTab.prototype.createCase = function () {
        if (!jQuery.isEmptyObject(this.newCase) || !this.net.entityId) {
            this.newCase.netId = this.net.entityId;
            this.newCase.color = "color-fg-accent-50";
            const self = this;
            this.$http.post("/res/workflow/case", JSON.stringify(this.newCase))
                .then(function (response) {
                    if (response) {
                        self.$dialog.closeCurrent();
                        self.newCase = {
                            title: self.$i18n.block.case.newTitle
                        };
                        if(self.actionCase){
                            const actionCase = new ActionCase(self,self.controller.getPanelGroup(response.title),response,null,{
                                $http: self.$http,
                                $dialog: self.$dialog,
                                $snackbar: self.$snackbar,
                                $user: self.$user,
                                $fileUpload: self.$fileUpload,
                                $timeout: self.$timeout,
                                $i18n: self.$i18n
                            },{
                                caseType: self.caseType,
                                removable: true
                            });
                            actionCase.openTaskDialog();
                            self.cases.push(actionCase);
                        } else {
                            self.openCase(new Case(self, null, response, null, {
                                $http: self.$http,
                                $dialog: self.$dialog,
                                $snackbar: self.$snackbar,
                                $user: self.$user,
                                $fileUpload: self.$fileUpload,
                                $i18n: self.$i18n
                            }));
                            self.cases.splice(0, self.cases.length);
                            self.page = {};
                        }
                    }
                }, function () {
                    self.$snackbar.error(self.$i18n.block.snackbar.creatingNewCaseFailed);
                    self.newCase = {
                        title: self.$i18n.block.case.newTitle
                    };
                });
        }
    };

    CaseTab.prototype.loadPetriNets = function () {
        const self = this;
        this.$http.get("/res/petrinet/refs").then(function (response) {
            response.$request().$get("petriNetReferences").then(function (resource) {
                self.petriNetRefs = resource;
            });
        }, function () {
            self.$snackbar.error(self.$i18n.block.snackbar.gettingPetriNetRefsFailed);
        });
    };

    CaseTab.prototype.loadPetriNet = function (title, callback = () => {
    }) {
        const self = this;
        this.$http.post("/res/petrinet/ref", {title: title}).then(function (response) {
            self.net = response;
            callback(true);
        }, function () {
            self.$snackbar.error(`${self.$i18n.block.snackbar.loading}  ${title} ${self.$i18n.block.snackbar.failed}`);
            callback(false);
        })
    };

    CaseTab.prototype.loadTransitions = function (callback = ()=>{}) {
        const self = this;
        this.$http.post("/res/petrinet/transition/refs",[this.net.entityId]).then(function (response) {
            response.$request().$get("transitionReferences").then(function (resources) {
                self.transitions = resources.filter(r => self.transitionNames.includes(r.title));
                self.transitions && self.transitions.length > 0 ? callback(true) : callback(false);

            }, function () {
                console.log("References for transitions were not found!");
                callback(false);
            });
        }, function () {
            self.$snackbar.error(self.$i18n.block.snackbar.loadingDataForFilterFailed);
            callback(false);
        });
    };

    CaseTab.prototype.delete = function (useCase) {
        if(this.actionCase) useCase.removePanel();
        this.cases.splice(this.cases.indexOf(useCase), 1);
    };

    return CaseTab;
});

