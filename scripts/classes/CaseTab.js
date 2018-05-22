define(['./Tab', './Case', './ActionCase', './Filter'], function (Tab, Case, ActionCase, Filter) {
    /**
     * Constructor for CaseTab class
     * Angular dependencies: $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $i18n, $process
     * @param {String} label
     * @param {Object} controller
     * @param {Filter} baseFilter
     * @param {Object} angular
     * @param {Object} config - actionCase(boolean), authorityToCreate(string), allowedNets(array of Net objects)
     * @constructor
     */
    function CaseTab(label, controller, baseFilter, angular, config = {}) {
        Tab.call(this, 0, label);

        this.controller = controller;
        this.baseFilter = baseFilter;
        this.authorityToCreate = "ROLE_USER";
        this.allowedNets = [];
        Object.assign(this, angular, config);

        this.cases = [];
        this.newCase = {
            title: this.$i18n.block.case.newTitle
        };

        this.activeFilter = baseFilter;
        this.createDialogTitle = this.allowedNets.length === 1 ? (!this.allowedNets[0].defaultCaseName ? label : this.allowedNets[0].defaultCaseName) : label;
    }

    CaseTab.prototype = Object.create(Tab.prototype);
    CaseTab.prototype.constructor = CaseTab;

    CaseTab.URL_SEARCH = "/api/workflow/case/search";

    CaseTab.prototype.activate = function () {
        this.newCase.title = this.getDefaultCaseTitle();

        if (this.cases.length === 0)
            this.load(false);
    };

    CaseTab.prototype.buildSearchRequest = function (next) {
        const url = next && this.page.next ? this.page.next : CaseTab.URL_SEARCH+"?sort=_id,desc";
        return {
            method: "POST",
            url: url,
            data: JSON.parse(this.activeFilter.query)
        };
    };

    CaseTab.prototype.load = function (next) {
        if (this.loading || !this.activeFilter) return;
        if (next && this.page.totalElements === this.cases.length) return;

        const self = this;
        const config = this.buildSearchRequest(next);

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
                    if (config.url !== self.page.last)
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
            }, {
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
            }, {
                caseDelete: this.caseDelete
            })));
        }

        if (next) cases.forEach(useCase => this.cases.push(useCase));
        else this.cases = cases;
    };

    CaseTab.prototype.openCase = function (useCase) {
        if (this.actionCase) return;
        this.controller.openTaskTab(useCase);
    };

    CaseTab.prototype.closeCase = function (useCase) {
        if (this.actionCase) return;
        this.controller.closeTab(useCase.stringId);
    };

    CaseTab.prototype.openNewCaseDialog = function (title) {
        if (this.allowedNets.length === 0)
            return;

        this.$dialog.showByTemplate('create_case', this, {title: this.createDialogTitle, onOpenAutoFocus: true});
    };

    CaseTab.prototype.getDefaultCaseTitle = function () {
        return this.allowedNets.length > 0 && this.allowedNets[0].defaultCaseName ? this.allowedNets[0].defaultCaseName : this.$i18n.block.case.newTitle;
    };

    CaseTab.prototype.changeNewCaseTitle = function () {
        this.newCase.title = this.allowedNets.find(net => net.id === this.newCase.netId).defaultCaseName;
        if (!this.newCase.title)
            this.newCase.title = this.getDefaultCaseTitle();
    };

    CaseTab.prototype.createCase = function () {
        if (this.allowedNets.length === 0 || jQuery.isEmptyObject(this.newCase)) {
            this.$dialog.closeCurrent();
            return;
        }

        const self = this;
        if (this.allowedNets.length === 1)
            this.newCase.netId = this.allowedNets[0].id;
        if (!this.newCase.netId) {
            this.$dialog.closeCurrent();
            return;
        }

        this.$http.post("/api/workflow/case", JSON.stringify(this.newCase))
            .then(function (response) {
                if (response) {
                    self.$dialog.closeCurrent();
                    self.newCase = {
                        title: self.getDefaultCaseTitle()
                    };
                    if (self.actionCase) {
                        const actionCase = new ActionCase(self, self.controller.getPanelGroup(response.title), response, null, {
                            $http: self.$http,
                            $dialog: self.$dialog,
                            $snackbar: self.$snackbar,
                            $user: self.$user,
                            $fileUpload: self.$fileUpload,
                            $timeout: self.$timeout,
                            $i18n: self.$i18n
                        }, {
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
                    title: self.getDefaultCaseTitle()
                };
                $process.init().then(() => self.allowedNets = $process.nets);
            });
    };

    CaseTab.prototype.delete = function (useCase) {
        if (this.actionCase) useCase.removePanel();
        this.cases.splice(this.cases.indexOf(useCase), 1);
    };

    return CaseTab;
});

