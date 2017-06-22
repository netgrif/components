define(['./Tab', './Task'], function (Tab, Task) {
    /**
     * Constructor for TaskTab class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload
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
    }

    TaskTab.prototype = Object.create(Tab.prototype);
    TaskTab.prototype.constructor = TaskTab;

    TaskTab.URL_ALL = "/res/task";
    TaskTab.URL_MY = "/res/task/my";
    TaskTab.URL_SEARCH = "/res/task/search";
    TaskTab.URL_BYCASE = "/res/task/case";

    TaskTab.prototype.activate = function () {
        this.load(false);
    };

    TaskTab.prototype.reload = function () {
        if (this.tasks.length > 0)
            this.tasks.splice(0, this.tasks.length);
        this.load(false);
    };

    TaskTab.prototype.load = function (next) {
        if (this.loading || !baseUrl || (this.tasks && this.page.totalElements === this.tasks.length)) return;

        const self = this;
        let url = this.filter ? TaskTab.URL_SEARCH : this.baseUrl;
        if (next) url = this.page.next;

        const query = this.getSearchQuery();
        const config = {
            method: query ? 'POST' : 'GET',
            url: url,
            data: query
        };

        this.loading = true;
        this.$http(config).then(function (response) {
            self.page = response.page;
            response.$request().$get("tasks").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    if (url !== response.$href("last")) {
                        self.page.next = response.$href("next");
                    }
                }
                const tasks = resources.map(r => new Task(self, r, {
                    $http: self.$http,
                    $snackbar: self.$snackbar,
                    $dialog: self.$dialog,
                    $user: self.$user,
                    $fileUpload: self.$fileUpload
                }));
                if (next) self.tasks = tasks.concat(self.tasks);
                else self.tasks = tasks;

                self.loading = false;

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

    return TaskTab;
});
