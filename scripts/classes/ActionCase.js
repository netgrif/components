define(['./DataField','./HalResource','./Task','./Case'], function (DataField, HalResource, Task, Case) {
    /**
     * Constructor for Case class
     * Angular dependency: $http, $snackbar, $dialog, $fileUpload, $user
     * @param {Object} tab
     * @param {Object} panel
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @param {Object} config
     * @constructor
     */
    function ActionCase(controller, panel, resource, links, angular, config = {}) {
        Case.call(this, null, panel, resource, links, angular, config);

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
            self.$snackbar.error("Data for case "+stringId+" has failed to load!");
        });
    };

    ActionCase.prototype.click = function ($event) {
        if(this.expanded){
            //collapse
        } else {
            //expand
        }
        this.expanded = !this.expanded;
        $event.preventDefault();
        $event.stopPropagation();
    };

    ActionCase.prototype.expand = function (task) {
        if(!task){
            //load case data
        } else {
            //load task
        }
        this.panel.expand();
    };

    ActionCase.prototype.collapse = function () {
        this.panel.collapse();
    };

    return ActionCase;
});
