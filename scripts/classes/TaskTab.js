define(['./Tab', './Transaction', './Filter', './Search'], function (Tab, Transaction, Filter, Search) {
    /**
     * Constructor for TaskTab class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload, $timeout, $mdExpansionPanelGroup, $i18n, $process, $rootScope, $config
     * @param id
     * @param label
     * @param {Filter} baseFilter
     * @param useCase
     * @param angular
     * @param config options: closable(if tab have close button), filterPolicy:constant, showTransactions,
     * allowHighlight(highlight unfinished tasks), searchable, autoOpenUnfinished, fullReload
     * @constructor
     */
    function TaskTab(id, label, baseFilter, useCase, angular, config = {}) {
        Tab.call(this, id, label, baseFilter);

        this.baseUrl = TaskTab.URL_SEARCH;
        this.useCase = useCase;
        Object.assign(this, angular, config);

        this.tasks = [];
        this.transactions = [];
        this.transactionProgress = 0;
        this.taskControllers = {};
        if (this.searchable) {
            this.taskSearch = new Search(this, Search.SEARCH_TASKS, Search.COMPLEX_GUI, {
                $process: this.$process,
                $http: this.$http,
                $config: this.$config,
                $i18n: this.$i18n,
                $timeout: this.$timeout
            }, {});
            this.taskSearch.populateFromFilter(this.baseFilter);
        }
    }

    TaskTab.prototype = Object.create(Tab.prototype);
    TaskTab.prototype.constructor = TaskTab;

    TaskTab.URL_ALL = "/task";
    TaskTab.URL_MY = "/task/my";
    TaskTab.URL_SEARCH = "/task/search";

    TaskTab.prototype.activate = function () {
        const view = this.useCase ? 'caseView' : 'taskView';
        this.tasksGroup = this.$mdExpansionPanelGroup(`${view}-tasksGroup-${this.id}`);
        try {
            this.tasksGroup.register(`taskPanel`, {
                templateUrl: 'views/app/panels/task_panel.html',
                controller: 'TaskPanelController',
                controllerAs: 'taskCtrl'
            });
        } catch (error) {
            // whatever
            // if task group is already registered do nothing
        }

        if (this.showTransactions)
            this.loadTransactions();

        this.load(false);
    };

    TaskTab.prototype.reload = function () {
        if (this.isNotEmpty()) {
            this.removeAll();
        }
        this.load(false, true);
    };

    TaskTab.prototype.removeAll = function () {
        this.tasksGroup.removeAll();
        this.tasks.splice(0, this.tasks.length);
    };

    TaskTab.prototype.isNotEmpty = function () {
        return this.tasks && this.tasks.length > 0;
    };

    TaskTab.prototype.buildRequest = function (next, all) {
        const url = next && this.page.next ? this.page.next : this.$config.getApiUrl(this.baseUrl); //+ (all ? "&size="+this.tasks.length : "");
        let request = {
            method: "POST",
            url: url,
            params: {
                sort: "priority"
            },
            data: {}
        };
        if(this.activeFilter.query.length > 0)
            request.data.query = this.activeFilter.query;

        return request;
    };

    TaskTab.prototype.load = function (next, force) {
        if (this.loading || !this.baseUrl) return;
        if (next && this.tasks && this.page.totalElements === this.tasks.length) return;
        if (!next && !force && this.tasks.length > 0) return;

        const self = this;
        this.loading = true;
        const requestConfig = this.buildRequest(next, force);
        this.$http(requestConfig).then(function (response) {
            self.page = response.page;
            if (self.page.totalElements === 0) {
                self.page.next = undefined;
                if (self.isNotEmpty())
                    self.removeAll();
                self.loading = false;
                if (self.$config.enable.closeTaskTabOnNoTasks) {
                    self.$snackbar.warning(`${self.$i18n.block.snackbar.noTasksFoundIn} ${self.label}`);
                    self.emitNoTasks();
                } else {
                    self.$snackbar.info(self.$i18n.block.snackbar.noTasks);
                }
                self.emitNumberOfTasks();
                return;
            }
            const rawData = response.$response().data._embedded.tasks;
            response.$request().$get("tasks").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    if (requestConfig.url !== response.$href("last")) {
                        self.page.next = response.$href("next");
                    }
                }

                resources.forEach((r, i) => r.links = rawData[i]._links);
                self.parseTasks(resources, next);

                self.loading = false;
                self.emitNumberOfTasks();
            }, function () {
                self.$snackbar.info(`${self.$i18n.block.snackbar.noTasksFoundIn} ${self.label}`);
                self.page.next = undefined;
                if (self.isNotEmpty()) {
                    self.removeAll();

                }
                self.loading = false;
                self.emitNumberOfTasks();
            })

        }, function () {
            self.$snackbar.error(`${self.$i18n.block.snackbar.tasksOn} ${requestConfig.url} ${self.$i18n.block.snackbar.failedToLoad}`);
            self.loading = false;
        });
    };

    TaskTab.prototype.parseTasks = function (resources, next) {
        if (!next) {
            const tasksToDelete = []; //saved are only indexes for work later
            this.tasks.forEach((task, i) => {
                const index = resources.findIndex(r => r.caseId === task.caseId && r.transitionId === task.transitionId);
                if (index === -1)
                    tasksToDelete.push(i);
                else {
                    task.update(resources[index], resources[index].links);
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
                config: {
                    allowHighlight: this.allowHighlight,
                    fullReload: this.fullReload,
                    taskPriority: this.taskPriority,
                    taskCaseTitle: this.taskCaseTitle
                }
            }).then(function (panel) {
                if (self.taskControllers[r.stringId]) {
                    self.taskControllers[r.stringId].panel = panel;
                    self.tasks.push(self.taskControllers[r.stringId]);
                    delete self.taskControllers[r.stringId];
                }

                if (Object.keys(self.taskControllers).length === 0) {
                    if (self.showTransactions) {
                        self.transactions.forEach(trans => trans.setActive(self.tasks[self.tasks.length - 1]));
                        self.transactionProgress = self.mostForwardTransaction();
                    }

                    self.openUnfinishedTask();
                }
            });
        });
        if (self.showTransactions)
            self.transactions.forEach(trans => trans.setActive(self.tasks));
    };

    TaskTab.prototype.emitNoTasks = function () {
        if (!this.$rootScope)
            return;
        this.$rootScope.$emit('noTasks');
    };

    TaskTab.prototype.emitNumberOfTasks = function () {
        if (!this.$rootScope)
            return;
        this.$rootScope.$emit('tabContentLoad', {
            count: this.page.totalElements,
            viewId: this.viewId
        });
    };

    TaskTab.prototype.deleteTaskOnIndex = function (index) {
        // delete this.taskControllers[this.tasks[index].stringId];
        this.tasks[index].panel.remove();
        this.tasks.splice(index, 1);
    };

    TaskTab.prototype.addTaskController = function (taskCtrl) {
        this.taskControllers[taskCtrl.stringId] = taskCtrl;
    };

    TaskTab.prototype.updateTasksData = function (updateObj) {
        this.tasks.forEach(t => t.updateDataGroups(updateObj));
    };

    TaskTab.prototype.openUnfinishedTask = function () {
        if (!this.autoOpenUnfinished)
            return;
        const unfinished = this.tasks.filter(t => !t.finishDate);
        if (unfinished.length === 1)
            unfinished[0].click();
    };

    TaskTab.prototype.loadTransactions = function () {
        if (!this.useCase || this.transactions.length > 0) return;

        this.transactions = this.$process.get(this.useCase.processIdentifier).transactions;
        if (this.tasks.length > 0) {
            this.transactions.forEach(trans => trans.setActive(this.tasks));
        }

        // const self = this;
        // this.$http.get(`/res/petrinet/${this.useCase.petriNetId}/transactions`).then(function (response) {
        //     response.$request().$get("transactions").then(function (resources) {
        //         self.transactions = resources.map(r => new Transaction(r, {}));
        //         if (self.tasks.length > 0)
        //             self.transactions.forEach(trans => trans.setActive(self.tasks));
        //
        //     }, function () {
        //         console.log(`No resource transactions for net ${self.useCase.petriNetId}`);
        //     })
        //
        // }, function () {
        //     self.$snackbar.error(`${self.$i18n.block.snackbar.transactionsFor} ${self.useCase.title} ${self.$i18n.block.snackbar.failedToLoad}`);
        // });
    };

    TaskTab.prototype.mostForwardTransaction = function () {
        let index = 0;
        this.transactions.forEach((trans, i) => {
            if (trans.active) index = i > index ? i : index;
        });
        return index;
    };

    TaskTab.prototype.reloadUseCase = function () {
        if (!this.useCase) return;
        const self = this;
        this.$http({
            method: "POST",
            url: this.$config.getApiUrl("/workflow/case/search"),
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

    TaskTab.prototype.search = function () {
        const searchFilter = this.taskSearch.getFilter();

        if (this.filterPolicy === Tab.MERGE_FILTER_POLICY) {
            this.activeFilter = this.activeFilter.merge(searchFilter);
        } else if (this.filterPolicy === Tab.REPLACE_FILTER_POLICY) {
            this.activeFilter = searchFilter;
        }

        this.reload();
    };

    TaskTab.prototype.callSaveFilter = function() {
        this.saveFilter(Filter.TASK_TYPE);
    };

    return TaskTab;
});
