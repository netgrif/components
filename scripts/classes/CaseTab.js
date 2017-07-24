define(['./Tab','./Case'], function (Tab, Case) {
    /**
     * Constructor for CaseTab class
     * Angular dependencies: $http, $dialog, $snackbar, $user, $fileUpload
     * @param {String} label
     * @param {Object} controller
     * @param {Object} angular
     * @param {Object} config
     * @constructor
     */
    function CaseTab(label, controller, angular, config = {}) {
        Tab.call(this, 0, label);

        this.controller = controller;
        Object.assign(this, angular,config);

        this.cases = [];
        this.newCase = {};
    }

    CaseTab.prototype = Object.create(Tab.prototype);
    CaseTab.prototype.constructor = CaseTab;

    CaseTab.URL_SEARCH = "/res/workflow/case/search";
    CaseTab.FIND_BY_AUTHOR = 0;


    CaseTab.prototype.activate = function () {
        if (this.cases.length === 0)
            this.loadPetriNet("Insurance",(success)=>{
                if(success) this.load(false);
            });
    };

    CaseTab.prototype.buildSearchRequest = function (url,criteria = []) {
        const data = {};
        criteria.forEach(c => {
            if(c === CaseTab.FIND_BY_AUTHOR)
                data.author = this.$user.id;
        });
        return {
            method:"POST",
            url: url,
            data: data
        };
    };

    CaseTab.prototype.load = function (next) {
        const self = this;
        if (this.page.totalElements === this.cases.length || this.loading || !this.net) return;
        const url = next ? (self.page.next ? self.page.next : CaseTab.URL_SEARCH) : CaseTab.URL_SEARCH;
        const config = this.buildSearchRequest(url,[CaseTab.FIND_BY_AUTHOR]);
        self.loading = true;
        this.$http(config).then(function (response) {
            self.page = Object.assign(self.page, response.page);
            if(self.page.totalElements === 0){
                self.$snackbar.info("Currently there are no cases");
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
                self.parseCase(resources,rawData,next);
                self.loading = false;
            }, function () {
                self.$snackbar.error("No resource for cases was found!");
                self.page.last = undefined;
                self.page.next = undefined;
                self.cases.splice(0, self.cases.length);
                self.loading = false;
            });
        }, function () {
            self.$snackbar.error("Getting cases failed!");
            self.loading = false;
        })
    };

    CaseTab.prototype.parseCase = function (resources, rawData, next) {
        const cases = [];
        resources.forEach((r,i) => cases.push(new Case(this,null,r,rawData[i]._links,{
            $http: this.$http,
            $dialog: this.$dialog,
            $snackbar: this.$snackbar,
            $user: this.$user,
            $fileUpload: this.$fileUpload
        })));

        if(next) cases.forEach(useCase => this.cases.push(useCase));
        else this.cases = cases;
    };

    CaseTab.prototype.openCase = function (useCase) {
        this.controller.openTaskTab(useCase);
    };

    CaseTab.prototype.closeCase = function (useCase) {
        this.controller.closeTab(useCase.stringId);
    };

    CaseTab.prototype.openNewCaseDialog = function () {
        //this.loadPetriNets();
        this.$dialog.showByTemplate('create_case', this);
    };

    CaseTab.prototype.createCase = function () {
        if (!jQuery.isEmptyObject(this.newCase) || !this.net.entityId) {
            this.newCase.netId = this.net.entityId;
            const self = this;
            this.$http.post("/res/workflow/case", JSON.stringify(this.newCase))
                .then(function (response) {
                    if (response) {
                        self.$dialog.closeCurrent();
                        self.newCase = {};
                        self.openCase(new Case(self,null,response,null,{
                            $http: self.$http,
                            $dialog: self.$dialog,
                            $snackbar: self.$snackbar,
                            $user: self.$user,
                            $fileUpload: self.$fileUpload
                        }));
                        self.cases.splice(0, self.cases.length);
                        self.page = {};
                    }
                }, function () {
                    self.$snackbar.error("Creating new case failed!");
                    self.newCase = {};
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
            self.$snackbar.error("Petri net refs get failed!");
        });
    };

    CaseTab.prototype.loadPetriNet = function (title, callback = ()=>{}) {
        const self = this;
        this.$http.post("/res/petrinet/ref",{title: title}).then(function (response) {
            self.net = response;
            callback(true);
        }, function () {
            self.$snackbar.error(`Loading ${title} has failed!`);
            callback(false);
        })
    };

    CaseTab.prototype.delete = function (useCase) {
        this.cases.splice(this.cases.indexOf(useCase),1);
    };

    return CaseTab;
});

