define(['./DataField', './HalResource'], function (DataField, HalResource) {
    /**
     * Constructor for Task class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload, $timeout
     * @param {Object} tab
     * @param {Object} panel
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @constructor
     */
    function Task(tab, panel, resource, links, angular) {
        HalResource.call(this, links);
        this.tab = tab;
        this.panel = panel;
        Object.assign(this, resource, angular);
        this.formatedDate = this.formatDate(this.startDate);

        this.data = [];
        this.expanded = false;
        this.loading = false;
        this.waitingForExpand = false;
    }

    Task.prototype = Object.create(HalResource.prototype);
    Task.prototype.constructor = Task;

    Task.prototype.status = function () {
        if (this.user && this.finishDate) return "Done";
        if (this.user && !this.finishDate && this.startDate) return "Assigned";
        return "New";
    };

    Task.prototype.formatDate = function (date) {
        if (!date) return undefined;
        if (date instanceof Date) return `${DataField.padding(date.getDate(), 0)}.${DataField.padding(date.getMonth() + 1, 0)}. ${date.getFullYear()}`;
        return `${DataField.padding(date.dayOfMonth, 0)}.${DataField.padding(date.monthValue, 0)}.${date.year}
            ${DataField.padding(date.hour, 0)}:${DataField.padding(date.minute, 0)}`;
    };

    Task.prototype.assign = function (callback = () => {
    }) {
        if(this.user) {
            callback(false);
            return;
        }

        const self = this;
        this.$http.get(this.link("assign")).then(function (response) {
            if (response.success) {
                // self.user = self.$user.getAsObject();
                // self.startDate = self.formatDate(new Date());
                callback(true);
            }
            if (response.error) {
                self.$snackbar.error(response.error);
                callback(false);
            }

        }, function () {
            self.$snackbar.error(`Assigning task ${self.title} failed`);
            callback(false);
        });
    };

    Task.prototype.delegate = function () {
        //TODO 22.6.2017 doimplementuj
    };

    Task.prototype.cancel = function (callback = () => {
    }) {
        if(!this.user || this.user.email !== this.$user.login) {
            callback(false);
            return;
        }

        const self = this;
        this.$http.get(this.link("cancel")).then(function (response) {
            if (response.success) {
                //self.user = undefined;
                callback(true);
            }
            if (response.error) {
                self.$snackbar.error(response.error);
                callback(false);
            }

        }, function () {
            self.$snackbar.error(`Canceling assignment of task ${self.title} failed`);
            callback(false)
        });
    };

    //TODO blbá funkcia keď urpavíš tasky sprav to inak
    Task.prototype.doFinish = function () {
        const self = this;
        this.$http.get(this.link("finish")).then(function (response) {
            if (response.success) self.tab.reload();
            if (response.error) self.$snackbar.error(response.error);

        }, function () {
            self.$snackbar.error(`Finishing task ${self.title} failed`);
        });
    };

    Task.prototype.finish = function () {
        if (this.data.length <= 0)
            this.load(() => {
                if (this.data.length <= 0) this.doFinish();
                else {
                    if (this.validateRequiredData()) this.doFinish();
                }
            });
        else {
            if (this.validateRequiredData())
                this.save((success) => success ? this.doFinish() : undefined);
        }
    };

    Task.prototype.load = function (callback = () => {
    }) {
        if (this.data.length > 0) {
            callback(true);
            return;
        }

        const self = this;
        this.loading = true;
        self.$http.get(this.link("data")).then(function (response) {
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
            self.$snackbar.error(`Data for ${self.title} failed to load`);
            callback(false);
        });
    };

    Task.prototype.validateRequiredData = function () {
        const validation = this.data.every(field => {
            if(field.behavior.required) return field.isValid();
            else return true;
        });
        if (!validation) this.$snackbar.error("Not all required fields have valid values! Required fields are marked with asterisk (*)");
        return validation;
    };

    Task.prototype.save = function (callback = () => {
    }) {
        if (this.data <= 0) return;

        const fields = {};
        this.data.forEach(field => field.changed ? fields[field.objectId] = field.save() : undefined);
        if (Object.keys(fields).length === 0 || !Object.keys(fields).every(key => !!fields[key])) {
            callback(true);
            return;
        }

        const self = this;
        this.$http.post(this.link("data-edit"), JSON.stringify(fields)).then(function (response) {
            self.data.forEach(d => {
                if(response[d.objectId]){
                    const n = response[d.objectId];
                    if(n.value) d.newValue = n.value;
                    if(n.behavior){
                        if(n.behavior[self.transitionId])
                            d.behavior = n.behavior[self.transitionId];
                    }
                }
            });
            //TODO: search other tasks for data in response

            Object.keys(fields).forEach(id => self.data.find(f => f.objectId === id).changed = false);
            self.$snackbar.success("Data saved successfully");
            self.requiredFilled = self.data.every(field => !field.behavior.required || field.newValue);
            callback(true);
        }, function () {
            self.$snackbar.error("Saving data has failed");
            callback(false);
        });
    };

    Task.prototype.changeResource = function (resource, links) {
        Object.assign(this, resource);
        this._links = links;
        this.formatedDate = this.formatDate(resource.startDate);
        this.user = resource.user;

        if(this.waitingForExpand) {
            this.expand();
            this.waitingForExpand = false;
        }
    };

    Task.prototype.click = function ($event) {
        if(this.tab.loading) {
            this.waitingForExpand = true;
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }
        if (this.expanded) {
            this.collapse();
        } else {
            this.expand();
        }
        this.expanded = !this.expanded;

        $event.preventDefault();
        $event.stopPropagation();
    };

    Task.prototype.expand = function () {
        this.panel.collapse({animation: false});
        this.assign(success => {
            if (success)
                this.tab.load(false);
            this.load(success => {
                if (success)
                    this.loading = false;
                    this.panel.expand();
                    // this.$timeout(() => {
                // }, 200);
            });
        });
    };

    Task.prototype.collapse = function () {
        this.cancel(success => {
            if (success)
                this.tab.load(false);
            this.panel.collapse();
        });
    };

    return Task;
});
