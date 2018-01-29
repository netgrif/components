define(['./Tab', './Task', './Transaction'], function (Tab, Task, Transaction) {
    /**
     * Constructor for TaskTab class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanelGroup, $i18n
     * @param id
     * @param label
     * @param baseUrl
     * @param baseCriteria
     * @param useCase
     * @param angular
     * @param config - config parameters for better customizing behavior of tab
     * @constructor
     */
    function TaskTab(id, label, baseUrl, baseCriteria, useCase, angular, config = {}) {
        Tab.call(this, id, label);

        this.baseUrl = baseUrl;
        this.baseCriteria = baseCriteria;
        this.useCase = useCase;
        Object.assign(this, angular, config);

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
    TaskTab.FIND_BY_CASE = 0;
    TaskTab.FIND_BY_TITLE = 1;

    TaskTab.prototype.activate = function (taskToExpand) {
        this.tasksGroup = this.$mdExpansionPanelGroup(`tasksGroup-${this.id}`);
        const panelView = this.taskView ? "payment_panel.html" : "case_panel.html";
        try {
            this.tasksGroup.register(`taskPanel`, {
                templateUrl: 'views/app/panels/'+panelView,
                controller: 'TaskController',
                controllerAs: 'taskCtrl',
            });
        } catch (error) {
            //panel already registered
        }

        if (this.showTransactions)
            this.loadTransactions();

        this.taskToExpand = taskToExpand;
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
        url += "?sort=priority";
        if (next) url = this.page.next;

        const config = this.buildRequestConfig(url);

        this.loading = true;
        this.$http(config).then(function (response) {
            self.page = response.page;
            if (self.page.totalElements === 0) {
                self.$snackbar.info(self.$i18n.block.snackbar.noTasks);
                self.page.next = undefined;
                if (self.tasks)
                    self.removeAll();
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

                resources.forEach((r, i) => r.links = rawData[i]._links);
                self.parseTasks(resources, next);
                //self.sortByPriority(resources,next);
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
                self.$snackbar.info(`${self.$i18n.block.snackbar.noTasksFoundIn} ${self.label}`);
                self.page.next = undefined;
                if (self.tasks) {
                    self.removeAll();

                }
                self.loading = false;
            })

        }, function () {
            self.$snackbar.error(`${self.$i18n.block.snackbar.tasksOn} ${url} ${self.$i18n.block.snackbar.failedToLoad}`);
            //TODO originálne tu bol hideLoading()
            self.loading = false;
        });
    };

    TaskTab.prototype.getSearchQuery = function () {
        const query = {};
        this.baseCriteria.forEach(c => {
            if (c === TaskTab.FIND_BY_CASE)
                query.case = this.useCase.stringId;

            if (c === TaskTab.FIND_BY_TITLE && this.searchTitles)
                query.title = this.searchTitles;
        });

        return query;

        // if (!this.filter) return undefined;
        //
        // let searchTier;
        // if (this.filter.processes.length > 0) searchTier = 1;
        // if (this.filter.transitions.length > 0) searchTier = 2;
        // if (this.filter.fields.length > 0) searchTier = 3;
        //
        // const query = {
        //     searchTier: searchTier,
        //     petriNets: []
        // };
        // this.filter.processes.forEach(process => query.petriNets.push({
        //     petriNet: process.entityId,
        //     transitions: this.filter.transitions.filter(trans => trans.petriNetId === process.entityId),
        //     dataSet: this.filter.fields.filter(field => field.petriNetId === process.entityId).reduce((acc, field) => {
        //         acc[field.entityId] = field.value;
        //         return acc;
        //     }, {})
        // }));
        //
        // return query;
    };

    //TODO 17.7.2017 ošetriť sortovanie podľa priority
    TaskTab.prototype.parseTasks = function (resources, next) {
        if (!next) {
            const tasksToDelete = []; //saved are only indexes for work later
            this.tasks.forEach((task, i) => {
                const index = resources.findIndex(r => r.caseId === task.caseId && r.transitionId === task.transitionId);
                if (index === -1)
                    tasksToDelete.push(i);
                else {
                    task.changeResource(resources[index], resources[index].links);
                    resources.splice(index, 1);
                }
            });
            tasksToDelete.sort((a, b) => b - a);
            tasksToDelete.forEach(index => this.deleteTaskOnIndex(index));
        }
        const self = this;
        resources.forEach((r, i) => {
            this.tasksGroup.add(`taskPanel`, {
                resource: r,
                links: r.links,
                tab: this,
                config: {allowHighlight: this.allowHighlight}
            }).then(function (panel) {
                if (self.taskControllers[r.stringId]) {
                    self.tasks.push(self.taskControllers[r.stringId].createTask(panel));

                    if (self.taskToExpand)
                        self.expandTask(self.taskToExpand);

                    self.transactions.forEach(trans => trans.setActive(self.tasks[self.tasks.length - 1]));
                    self.transactionProgress = self.mostForwardTransaction();

                    if (i === resources.length - 1) self.autoExpandTask();
                }
            });
        });
        self.transactions.forEach(trans => trans.setActive(self.tasks));
    };

    TaskTab.prototype.deleteTaskOnIndex = function (index) {
        delete this.taskControllers[this.tasks[index].stringId];
        this.tasks[index].panel.remove();
        this.tasks.splice(index, 1);
    };

    TaskTab.prototype.prioritySort = function () {

    };

    TaskTab.prototype.autoExpandTask = function () {
        const unfinished = this.tasks.filter(task => !task.finishDate);
        if (unfinished.length === 1 &&
            this.tasks.findIndex(task => task.stringId === unfinished[0].stringId) === this.tasks.length - 1 &&
            !unfinished[0].expanded) {
            unfinished[0].click();
        }
    };

    TaskTab.prototype.updateTasksData = function (updateObj) {
        this.tasks.forEach(t => t.updateData(updateObj));
    };

    TaskTab.prototype.loadTransactions = function () {
        if (!this.useCase) return;

        const self = this;
        this.$http.get(`/res/petrinet/${this.useCase.petriNetId}/transactions`).then(function (response) {
            response.$request().$get("transactions").then(function (resources) {
                self.transactions = resources.map(r => new Transaction(r, {}));
                if (self.tasks.length > 0)
                    self.transactions.forEach(trans => trans.setActive(self.tasks));

            }, function () {
                console.log(`No resource transactions for net ${self.useCase.petriNetId}`);
            })

        }, function () {
            self.$snackbar.error(`${self.$i18n.block.snackbar.transactionsFor} ${self.useCase.title} ${self.$i18n.block.snackbar.failedToLoad}`);
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

    TaskTab.prototype.expandTask = function (taskId) {
        if (this.tasks) {
            this.tasks.find(task => task.stringId === taskId).click();
        }
    };

    TaskTab.prototype.reloadUseCase = function () {
        const self = this;
        this.$http({
            method: "POST",
            url: "/res/workflow/case/search",
            data: {
                id: this.useCase.stringId
            }
        }).then(function (response) {
            response.$request().$get("cases").then(function (resources) {
                resources.forEach(r => Object.assign(self.useCase, r));

            }, function () {
                console.log(`Case ${this.useCase.stringId} failed to update`);
            })

        }, function () {
            console.log(`Case ${this.useCase.stringId} failed to update`);
        })
    };

    return TaskTab;
});
