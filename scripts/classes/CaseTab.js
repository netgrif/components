define(['./Tab'], function (Tab) {
    function CaseTab(label, controller, $http, $dialog) {
        Tab.call(this, label);

        this.controller = controller;
        this.$http = $http;
        this.$dialog = $dialog;

        this.cases = [];
        this.newCase = {};
    }

    CaseTab.prototype = Object.create(Tab.prototype);
    CaseTab.prototype.constructor = CaseTab;


    CaseTab.prototype.activate = function () {
        if (this.cases.length === 0)
            this.load(false);
    };

    CaseTab.prototype.load = function (next) {
        const self = this;
        if (this.page.totalElements === this.cases.length || this.loading) return;
        const url = next ? self.page.next : "/res/workflow/case/search";
        self.loading = true;
        this.$http.post(url, []).then(function (response) {
            self.page = Object.assign(self.page, response.page);
            response.$request().$get("cases").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    self.page.last = response.$href("last");
                    if (url !== self.page.last)
                        self.page.next = response.$href("next");
                }
                if (next)
                    resources.forEach(r => self.cases.push(r));
                else
                    self.cases = resources;
                self.loading = false;
            }, function () {
                $snackbar.error("No resource for cases was found!");
                self.page.last = undefined;
                self.page.next = undefined;
                self.cases.splice(0, self.cases.length);
                self.loading = false;
            });
        }, function () {
            $snackbar.error("Getting cases failed!");
            self.loading = false;
        })
    };

    CaseTab.prototype.openCase = function (useCase) {
        this.controller.openTaskTab(useCase);
    };

    CaseTab.prototype.openNewCaseDialog = function () {
        this.loadPetriNets();
        this.$dialog.showByTemplate('create_case', this);
    };

    CaseTab.prototype.createCase = function () {
        if (!jQuery.isEmptyObject(this.newCase) || !this.newCase.netId) {
            const self = this;
            this.$http.post("/res/workflow/case", JSON.stringify(this.newCase))
                .then(function (response) {
                    if (response.success) {
                        self.$dialog.closeCurrent();
                        self.newCase = {};
                    }
                }, function () {
                    $snackbar.error("Creating new case failed!");
                    self.newCase = {};
                });
        }
    };

    CaseTab.prototype.loadPetriNets = function () {
        const self = this;
        $http.get("/res/petrinet/refs").then(function (response) {
            response.$request().$get("petriNetReferences").then(function (resource) {
                self.petriNetRefs = resource;
            });
        }, function () {
            $snackbar.error("Petri net refs get failed!");
        });
    };


    return CaseTab;
});

