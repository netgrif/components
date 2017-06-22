define(['angular', './Tab', '../modules/Main'], function (angular, Tab) {
    function TaskTab(label, baseUrl, useCase, $http, $snackbar) {
        Tab.call(this, label);

        this.baseUrl = baseUrl;
        this.useCase = useCase;
        this.$http = $http;
        this.$snackbar = $snackbar;

        this.tasks = [];
    }

    TaskTab.prototype = Object.create(Tab.prototype);
    TaskTab.prototype.constructor = TaskTab;

    TaskTab.URL_ALL = "";
    TaskTab.URL_MY = "";
    TaskTab.URL_SEARCH = "";
    TaskTab.URL_BYCASE = "";

    TaskTab.prototype.activate = function () {

    };

    TaskTab.prototype.reloadTasks = function () {
        if (this.tasks.length > 0)
            this.tasks.splice(0, this.tasks.length);
        this.load(false);
    };

    TaskTab.prototype.load = function (next) {
        if(this.loading || !baseUrl || (this.tasks && this.page.totalElements === this.tasks.length)) return;

        const self = this;
        let url = this.filter ? TaskTab.URL_SEARCH : this.baseUrl;
        if (next) url = this.page.next;

        const config = {
            method: query ? 'POST' : 'GET',
            url: url,
            data: this.getSearchQuery()
        };

        this.loading = true;
        this.$http(config).then(function (response) {
            self.page = response.page;
            response.$request().$get("tasks").then(function (resources) {
                if(self.page.totalPages !== 1){
                    if(url !== response.$href("last")){
                        self.page.next = response.$href("next");
                    }
                }
                if(next) resources.forEach(r => self.tasks.push(r));
                else self.tasks = resources;

                self.loading = false;

            }, function () {
                $snackbar.info(`No tasks found in ${self.label}`);
                self.page.next = undefined;
                if(self.tasks) self.tasks.splice(0,self.tasks.length);
                self.loading = false;
            })

        }, function () {
            $snackbar.error(`Tasks on ${url} failed to load`);
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
