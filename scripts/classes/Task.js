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
        this.formatedDate = Task.formatDate(this.startDate);

        this.dataGroups = [];
        this.dataSize = 0;
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

    Task.formatDate = function (date) {
        if (!date) return undefined;
        if (date instanceof Date) return `${DataField.padding(date.getDate(), 0)}.${DataField.padding(date.getMonth() + 1, 0)}. ${date.getFullYear()}`;
        return `${DataField.padding(date.dayOfMonth, 0)}.${DataField.padding(date.monthValue, 0)}.${date.year}
            ${DataField.padding(date.hour, 0)}${date.hour ? ':' : ''}${DataField.padding(date.minute, 0)}`;
    };

    Task.prototype.assign = function (callback = () => {
    }) {
        if (this.user) {
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
        if (!this.user || this.user.email !== this.$user.login) {
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


    Task.prototype.doFinish = function () {
        const self = this;
        this.$http.get(this.link("finish")).then(function (response) {
            if (response.success) self.tab.load(false);
            if (response.error) self.$snackbar.error(response.error);

        }, function () {
            self.$snackbar.error(`Finishing task ${self.title} failed`);
        });
    };

    Task.prototype.finish = function () {
        if (this.dataSize <= 0)
            this.load(() => {
                this.loading = false;
                this.panel.collapse();
                if (this.dataSize <= 0) this.doFinish();
                else {
                    if (this.validateRequiredData()) this.doFinish();
                }
            });
        else {
            if (this.validateRequiredData())
                this.save((success) => {
                    if (success) {
                        this.doFinish();
                        this.panel.collapse();
                    }
                });
        }
    };

    Task.prototype.getData = function () {
        return this.dataGroups.reduce(((data, group) => data.concat(group.data)), []);
    };

    Task.prototype.load = function (callback = () => {
    }) {
        if (this.dataSize > 0) {
            callback(true);
            return;
        }

        const self = this;
        this.loading = true;
        self.$http.get(this.link("data")).then(function (response) {
            response.$request().$get("dataGroups").then(function (groupResources) {
                groupResources.forEach((group, index, array) => {
                    if (group.fields._embedded) {
                        group.data = [];
                        Object.keys(group.fields._embedded).forEach(item => {
                            group.data = group.fields._embedded[item].map(r => new DataField(self, r, group.fields._links, {
                                $dialog: self.$dialog,
                                $snackbar: self.$snackbar,
                                $user: self.$user,
                                $fileUpload: self.$fileUpload
                            })).concat(group.data);
                        });
                        delete group.fields;
                        self.dataGroups.push(group);
                        self.dataSize += group.data.length;
                        if (index === array.length - 1) callback(true);
                        //self.requiredFilled = self.data.every(field => !field.behavior.required || field.newValue);

                    } else {
                        //self.$snackbar.error(`No data for task ${self.title}`);
                        console.log(`No data for task ${self.title}`);
                        callback(true);
                    }
                });

            }, function () {
                console.log(`No data group for task ${self.title}`);
                callback(true);
            });
        }, function () {
            self.$snackbar.error(`Data for ${self.title} failed to load`);
            callback(false);
        });
    };

    Task.prototype.validateRequiredData = function () {
        let validation = true;
        this.getData().forEach(field => {
            if (field.behavior.required) validation = field.isValid() ? validation : false;
        });
        if (!validation) this.$snackbar.error("Not all required fields have valid values! Required fields are marked with asterisk (*)");
        return validation;
    };

    Task.prototype.save = function (callback = () => {
    }) {
        if (this.dataSize <= 0) return;

        const fields = {};
        this.getData().forEach(field => field.changed ? fields[field.objectId] = field.save() : undefined);
        if (Object.keys(fields).length === 0 || !Object.keys(fields).every(key => !!fields[key])) {
            callback(true);
            return;
        }

        const self = this;
        this.$http.post(this.link("data-edit"), JSON.stringify(fields)).then(function (response) {
            /*self.data.forEach(d => {
                if(response[d.objectId]){
                    const n = response[d.objectId];
                    if(n.value) d.newValue = n.value;
                    if(n.behavior){
                        if(n.behavior[self.transitionId])
                            d.behavior = n.behavior[self.transitionId];
                    }
                }
            });*/
            self.tab.updateTasksData(response.changedFields);

            Object.keys(fields).forEach(id => self.data.find(f => f.objectId === id).changed = false);
            self.$snackbar.success("Data saved successfully");
            self.requiredFilled = self.data.every(field => !field.behavior.required || field.newValue);
            callback(true);
        }, function () {
            self.$snackbar.error("Saving data has failed");
            callback(false);
        });
    };

    Task.prototype.updateData = function (updateObj) {
        if (jQuery.isEmptyObject(updateObj)) return;
        this.getData().forEach(d => {
            if (updateObj[d.objectId]) {
                const n = updateObj[d.objectId];
                Object.keys(n).forEach(key => {
                    if (key === 'value')
                        d.newValue = d.parse(n[key]);
                    else if (key === 'behavior') {
                        if (n.behavior[this.transitionId])
                            d.behavior = n.behavior[this.transitionId];
                    }
                    else
                        d[key] = n[key];
                });
            }
        });
    };

    Task.prototype.changeResource = function (resource, links) {
        Object.assign(this, resource);
        this._links = links;
        this.formatedDate = Task.formatDate(resource.startDate);
        this.user = resource.user;

        if (this.waitingForExpand) {
            this.expand();
            this.waitingForExpand = false;
        }
    };

    Task.prototype.click = function ($event) {
        if (this.tab.loading) {
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
                if (success) {
                    this.loading = false;
                    if (this.dataSize <= 0) {
                        this.finish();
                        this.expanded = !this.expanded;
                    }
                    else
                        this.panel.expand();
                }
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
