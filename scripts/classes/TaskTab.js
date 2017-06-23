define(['./Tab', './Task', './Transaction'], function (Tab, Task, Transaction) {
    /**
     * Constructor for TaskTab class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload, $timeout
     * @param label
     * @param baseUrl
     * @param useCase
     * @param angular
     * @constructor
     */
    function TaskTab(label, baseUrl, useCase, angular) {
        Tab.call(this, label);

        this.baseUrl = baseUrl;
        this.useCase = useCase;
        Object.assign(this, angular);

        this.tasks = [];
        this.transactions = [];
        this.transactionProgress = 0;
    }

    TaskTab.prototype = Object.create(Tab.prototype);
    TaskTab.prototype.constructor = TaskTab;

    TaskTab.URL_ALL = "/res/task";
    TaskTab.URL_MY = "/res/task/my";
    TaskTab.URL_SEARCH = "/res/task/search";
    TaskTab.URL_BYCASE = "/res/task/case";

    TaskTab.prototype.activate = function () {
        this.loadTransactions();
        this.load(false);
    };

    TaskTab.prototype.reload = function () {
        if (this.tasks.length > 0)
            this.tasks.splice(0, this.tasks.length);
        this.load(false);
    };

    TaskTab.prototype.buildRequestConfig = function (url) {
        switch (true) {
            case url.includes(TaskTab.URL_BYCASE):
                return {
                    method: 'POST',
                    url: url,
                    data: [this.useCase.stringId]
                };
            default:
                const query = this.getSearchQuery();
                return config = {
                    method: query ? 'POST' : 'GET',
                    url: url,
                    data: query
                };
        }
    };

    TaskTab.prototype.load = function (next) {
        if (this.loading || !this.baseUrl) return;
        if (next && this.tasks && this.page.totalElements === this.tasks.length) return;

        const self = this;
        let url = this.filter ? TaskTab.URL_SEARCH : this.baseUrl;
        if (next) url = this.page.next;

        const config = this.buildRequestConfig(url);

        this.loading = true;
        this.$http(config).then(function (response) {
            self.page = response.page;
            const rawData = response.$response().data._embedded.tasks;
            response.$request().$get("tasks").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    if (url !== response.$href("last")) {
                        self.page.next = response.$href("next");
                    }
                }

                const tasks = [];
                resources.forEach((r, i) => tasks.push(new Task(self, r, rawData[i]._links, {
                    $http: self.$http,
                    $snackbar: self.$snackbar,
                    $dialog: self.$dialog,
                    $user: self.$user,
                    $fileUpload: self.$fileUpload,
                    $timeout: self.$timeout
                })));
                if (next) self.tasks = tasks.concat(self.tasks);
                else self.tasks = tasks;

                self.loading = false;
                self.transactions.forEach(trans => trans.setActive(self.tasks));
                self.transactionProgress = self.mostForwardTransaction();

            }, function () {
                self.$snackbar.info(`No tasks found in ${self.label}`);
                self.page.next = undefined;
                if (self.tasks) self.tasks.splice(0, self.tasks.length);
                self.loading = false;
            })

        }, function () {
            self.$snackbar.error(`Tasks on ${url} failed to load`);
            //TODO originálne tu bol hideLoading()
            self.loading = false;
        });
    };

    TaskTab.prototype.getSearchQuery = function () {
        if (!this.filter) return undefined;

        let searchTier;
        if (this.filter.processes.length > 0) searchTier = 1;
        if (this.filter.transitions.length > 0) searchTier = 2;
        if (this.filter.fields.length > 0) searchTier = 3;

        const query = {
            searchTier: searchTier,
            petriNets: []
        };
        this.filter.processes.forEach(process => query.petriNets.push({
            petriNet: process.entityId,
            transitions: this.filter.transitions.filter(trans => trans.petriNetId === process.entityId),
            dataSet: this.filter.fields.filter(field => field.petriNetId === process.entityId).reduce((acc, field) => {
                acc[field.entityId] = field.value;
                return acc;
            }, {})
        }));

        return query;
    };

    TaskTab.prototype.loadTransactions = function () {
        if (!this.useCase) return;

        const self = this;
        this.$http.get(`/res/petrinet/${this.useCase.petriNetId}/transactions`).then(function (response) {
            response.$request().$get("transactions").then(function (resources) {
                self.transactions = resources.map(r => new Transaction(r,{}));

            }, function () {
                console.log(`No resource transactions for net ${self.useCase.petriNetId}`);
            })

        }, function () {
            self.$snackbar.error(`Transactions for ${self.useCase.title} failed to load`);
        });
    };

    TaskTab.prototype.mostForwardTransaction = function () {
        let index = 0;
        this.transactions.forEach((trans, i) => {
            if(trans.active) index = i > index ? i : index;
        });
        return index;
    };

    return TaskTab;
});
