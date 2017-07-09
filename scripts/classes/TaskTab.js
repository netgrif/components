define(['./Tab', './Task', './Transaction'], function (Tab, Task, Transaction) {
    /**
     * Constructor for TaskTab class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanelGroup
     * @param id
     * @param label
     * @param baseUrl
     * @param useCase
     * @param angular
     * @constructor
     */
    function TaskTab(id, label, baseUrl, useCase, angular) {
        Tab.call(this, id, label);

        this.baseUrl = baseUrl;
        this.useCase = useCase;
        Object.assign(this, angular);

        this.tasks = [];
        this.transactions = [];
        this.transactionProgress = 0;
        this.taskControllers = {};
    }

    TaskTab.prototype = Object.create(Tab.prototype);
    TaskTab.prototype.constructor = TaskTab;

    TaskTab.URL_ALL = "/res/task";
    TaskTab.URL_MY = "/res/task/my";
    TaskTab.URL_SEARCH = "/res/task/search";
    TaskTab.URL_BYCASE = "/res/task/case";

    TaskTab.prototype.activate = function () {
        this.tasksGroup = this.$mdExpansionPanelGroup(`tasksGroup-${this.id}`);
        try {
            this.tasksGroup.register(`taskPanel`, {
                templateUrl: 'views/app/panels/task_panel.html',
                controller: 'TaskController',
                controllerAs: 'taskCtrl',
            });
        } catch (error) {
            //panel already registered
        }
        this.loadTransactions();
        this.load(false);
    };

    TaskTab.prototype.reload = function () {
        if (this.tasks.length > 0) {
            this.removeAll();
        }
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
            if(self.page.totalElements === 0){
                self.$snackbar.info("Currently there are no tasks");
                self.loading = false;
                return;
            }
            const rawData = response.$response().data._embedded.tasks;
            response.$request().$get("tasks").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    if (url !== response.$href("last")) {
                        self.page.next = response.$href("next");
                    }
                }

                self.parseTasks(resources, rawData, next);
                // const tasks = [];
                // resources.forEach((r, i) => {
                //      self.tasksGroup.add(`taskPanel`,{resource: r, links: rawData[i]._links, tab: self}).then(function (panel) {
                //          if(self.taskControllers[r.stringId])
                //              tasks.push(self.taskControllers[r.stringId].createTask(panel));
                //      });
                // });
                //
                // if (next) self.tasks = tasks.concat(self.tasks);
                // else self.tasks = tasks;

                self.loading = false;

            }, function () {
                self.$snackbar.info(`No tasks found in ${self.label}`);
                self.page.next = undefined;
                if (self.tasks) {
                    self.removeAll();
                }
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

    //TODO 28.6.2017 ošetriť pagination
    TaskTab.prototype.parseTasks = function (resources, rawData, next) {
        if (!next) {
            const tasksToDelete = []; //saved are only indexes for work later
            this.tasks.forEach((task, i) => {
                const index = resources.findIndex(r => r.caseId === task.caseId && r.transitionId === task.transitionId);
                if (index === -1)
                    tasksToDelete.push(i);
                else {
                    task.changeResource(resources[index], rawData[index]._links);
                    resources.splice(index, 1);
                    rawData.splice(index, 1);
                }
            });
            tasksToDelete.sort((a, b) => b - a);
            tasksToDelete.forEach(index => {
                this.taskControllers[this.tasks[index].stringId] = undefined;
                this.tasks[index].panel.remove();
                this.tasks.splice(index, 1);
            });
        }
        const self = this;
        resources.forEach((r, i) => {
            this.tasksGroup.add(`taskPanel`, {resource: r, links: rawData[i]._links, tab: this}).then(function (panel) {
                if (self.taskControllers[r.stringId]) {
                    self.tasks.push(self.taskControllers[r.stringId].createTask(panel));

                    self.transactions.forEach(trans => trans.setActive(self.tasks[self.tasks.length-1]));
                    self.transactionProgress = self.mostForwardTransaction();
                }
            });
        });
        self.transactions.forEach(trans => trans.setActive(self.tasks));
    };

    TaskTab.prototype.loadTransactions = function () {
        if (!this.useCase) return;

        const self = this;
        this.$http.get(`/res/petrinet/${this.useCase.petriNetId}/transactions`).then(function (response) {
            response.$request().$get("transactions").then(function (resources) {
                self.transactions = resources.map(r => new Transaction(r, {}));
                if(self.tasks.length > 0)
                    self.transactions.forEach(trans => trans.setActive(self.tasks));

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
            if (trans.active) index = i > index ? i : index;
        });
        return index;
    };

    TaskTab.prototype.addTaskController = function (taskCtrl) {
        this.taskControllers[taskCtrl.taskId] = taskCtrl;
    };

    TaskTab.prototype.removeAll = function () {
        this.tasksGroup.removeAll();
        this.tasks.splice(0, this.tasks.length);
        this.taskControllers = {};
    };

    return TaskTab;
});
