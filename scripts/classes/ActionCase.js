define(['./DataField', './HalResource', './Task', './Case'], function (DataField, HalResource, Task, Case) {
    /**
     * Constructor for Case class
     * Angular dependency: $http, $snackbar, $dialog, $fileUpload, $user, $i18n
     * @param {Object} tab
     * @param {Object} panelGroup
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @param {Object} config
     * @constructor
     */
    function ActionCase(tab, panelGroup, resource, links, angular, config = {}) {
        Case.call(this, tab, null, resource, links, angular, config);

        const self = this;
        panelGroup.add('contactPanel', {useCase: this}).then(function (panel) {
            self.panel = panel;
        });

        this.tasks = [];
        this.expanded = false;
    }

    ActionCase.prototype = Object.create(Case.prototype);
    ActionCase.prototype.constructor = ActionCase;

    ActionCase.prototype.loadData = function (callback = () => {
    }) {
        if (this.loading || this.data.length > 0) return;
        const self = this;
        this.$http.get("/res/workflow/case/" + this.stringId + "/data").then(function (response) {
            if (response.$response().data._embedded) {
                Object.keys(response.$response().data._embedded).forEach((item, index, array) => {
                    response.$request().$get(item).then(function (resources) {
                        self.data = resources.map(r => new DataField(self, r, response.$response().data._links, {
                            $dialog: self.$dialog,
                            $snackbar: self.$snackbar,
                            $user: self.$user,
                            $fileUpload: self.$fileUpload,
                            $i18n: self.$i18n
                        })).concat(self.data);
                        if (index === array.length - 1) {
                            callback(true);
                            self.updateImmediateData();
                        }
                    });
                });
                //self.requiredFilled = self.data.every(field => !field.behavior.required || field.newValue);

            } else {
                console.log(`No data for task ${self.title}`);
                callback(true);
            }
        }, function () {
            self.$snackbar.error(`${$i18n.block.snackbar.dataForCase} ${self.stringId} ${$i18n.block.snackbar.failedToLoad}`);
            callback(false);
        });
    };

    ActionCase.prototype.loadTasks = function (callback = () => {
    }) {
        if (this.tasks.length > 0) return;
        const self = this;
        this.$http.get("/res/task/case/" + this.stringId).then(function (response) {
            //tasks references
            self.tasks = Object.keys(response).map(key => response[key]);
            self.tasks.forEach(task => {
                task.click = function () {
                    self.openTaskDialog(this);
                };
            });

        }, function () {
            self.$snackbar.error(`${$i18n.block.snackbar.loadingTasksForCase} ${self.title} ${$i18n.block.snackbar.failed}`);
        });
    };

    ActionCase.prototype.click = function ($event) {
        if (this.expanded) {
            this.collapse();
        } else {
            this.expand();
        }
        this.expanded = !this.expanded;
        $event.preventDefault();
        $event.stopPropagation();
    };

    ActionCase.prototype.expand = function () {
        this.loadData(success => {

        });
        this.loadTasks(success => {

        });
        this.panel.expand();
    };

    ActionCase.prototype.collapse = function () {
        this.panel.collapse();
    };

    ActionCase.prototype.openTaskDialog = function (task) {
        const self = this;
        this.$dialog.showByElement('taskViewDialog', this, {
            useCase: this,
            requestedTask: task,
            caseType: self.caseType
        }, 'tasksDialogController').then(function () {
            self.data.splice(0,self.data.length);
            self.tasks.splice(0,self.tasks.length);
            self.loadData();
            self.loadTasks();
        });
    };

    ActionCase.prototype.updateImmediateData = function () {
        this.immediateData.forEach(immediate => {
            immediate.value = this.data.find(d => d.stringId === immediate.stringId).value;
        })
    };

    ActionCase.prototype.removePanel = function () {
        this.panel.remove();
    };

    return ActionCase;
});
