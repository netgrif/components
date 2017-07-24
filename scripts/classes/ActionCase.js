define(['./DataField','./HalResource','./Task','./Case'], function (DataField, HalResource, Task, Case) {
    /**
     * Constructor for Case class
     * Angular dependency: $http, $snackbar, $dialog, $fileUpload, $user
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
        panelGroup.add('contactPanel',{}).then(function (panel) {
            self.panel = panel;
        });

        this.tasks = [];
        this.expanded = false;
    }

    ActionCase.prototype = Object.create(Case.prototype);
    ActionCase.prototype.constructor = ActionCase;

    ActionCase.prototype.loadData = function (callback = ()=>{}) {
        if(this.loading) return;
        const self = this;
        this.$http.get("/res/workflow/case/"+this.stringId+"/data").then(function (response) {
            if (response.$response().data._embedded) {
                Object.keys(response.$response().data._embedded).forEach((item, index, array) => {
                    response.$request().$get(item).then(function (resources) {
                        self.data = resources.map(r => new DataField(self, r, response.$response().data._links, {
                            $dialog: self.$dialog,
                            $snackbar: self.$snackbar,
                            $user: self.$user,
                            $fileUpload: self.$fileUpload
                        })).concat(self.data);
                    });
                    if (index === array.length - 1) callback(true);
                });
                //self.requiredFilled = self.data.every(field => !field.behavior.required || field.newValue);

            } else {
                //self.$snackbar.error(`No data for task ${self.title}`);
                console.log(`No data for task ${self.title}`);
                callback(true);
            }
        }, function () {
            self.$snackbar.error("Data for case "+self.stringId+" has failed to load!");
            callback(false);
        });
    };
    
    ActionCase.prototype.loadTasks = function (callback = ()=>{}) {
        if(this.tasks.length > 0) return;
        const self = this;
        this.$http.get("").then(function (response) { //TODO 25.7.2017 doplniť urlku pre tasks reference
            //tasks references
            response.$request().$get("taskReferences").then(function (resources) {
                self.tasks = resources;
                self.tasks.forEach(task => {
                    task.click = function () {
                        self.openTaskDialog(this);
                    };
                });
            },function () {
                self.tasks.splice(0,self.tasks.length);
                console.log("No task references was found!");
            });

        }, function () {
            self.$snackbar.error("Loading tasks for case "+self.title+" has failed!");
        });
    };

    ActionCase.prototype.click = function ($event) {
        if(this.expanded){
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
        this.panel.expand();
    };

    ActionCase.prototype.collapse = function () {
        this.panel.collapse();
    };

    ActionCase.prototype.openTaskDialog = function (task) {
        this.$dialog.showByElement('taskViewDialog',this,{useCase:this, requestedTask:task},'tasksDialogController');
    };

    return ActionCase;
});
