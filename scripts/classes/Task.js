define(['./DataField','./HalResource'], function (DataField, HalResource) {
    /**
     * Constructor for Task class
     * Angular dependency: $http, $snackbar, $user, $dialog, $fileUpload
     * @param {Object} parent
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @constructor
     */
    function Task(parent, resource, links, angular) {
        HalResource.call(this,links);
        this.parent = parent;
        Object.assign(this, resource, angular);

        this.data = [];
        this.expanded = false;
    }
    Task.prototype = Object.create(HalResource.prototype);
    Task.prototype.constructor = Task;

    Task.prototype.status = function () {
        if (this.user && this.finishDate) return "Done";
        if (this.user && !this.finishDate && this.startDate) return "Assigned";
        return "New";
    };

    Task.prototype.formatDate = function (date) {
        if (!date) return;
        return `${DataField.padding(value.dayOfMonth, 0)}.${DataField.padding(value.monthValue, 0)}.${value.year}
            ${DataField.padding(value.hour, 0)}:${DataField.padding(value.minute, 0)}`;
    };

    Task.prototype.assign = function () {
        const self = this;
        this.$http.get(this.$href("assign")).then(function (response) {
            if (response.success) self.user = self.$user.getAsObject();
            if (response.error) self.$snackbar.error(response.error);

        }, function () {
            self.$snackbar.error(`Assigning task ${self.title} failed`);
        });
    };

    Task.prototype.delegate = function () {
        //TODO 22.6.2017 doimplementuj
    };

    Task.prototype.cancel = function () {
        const self = this;
        this.$http.get(this.$href("cancel")).then(function (response) {
            if (response.success) self.user = undefined;
            if (response.error) self.$snackbar.error(response.error);

        }, function () {
            self.$snackbar.error(`Canceling assignment of task ${self.title} failed`);
        });
    };

    //TODO blbá funkcia keď urpavíš tasky sprav to inak
    Task.prototype.doFinish = function () {
        const self = this;
        this.$http.get(this.$href("finish")).then(function (response) {
            if (response.success) self.parent.reload();
            if (response.error) self.$snackbar.error(response.error);

        }, function () {
            self.$snackbar.error(`Finishing task ${self.title} failed`);
        });
    };

    Task.prototype.finish = function () {
        if (!this.data)
            this.load(() => {
                if (!this.data) this.doFinish();
                else {
                    if (this.validData()) this.doFinish();
                }
            });
        else {
            if (this.validData())
                this.save((success) => success ? this.doFinish() : undefined);
        }
    };

    Task.prototype.load = function (callback = () => {
    }) {
        if (this.data) {
            callback(true);
            return;
        }

        const self = this;
        self.$http.get(this.$href("data")).then(function (response) {
            if (response.$response().data._embedded) {
                Object.keys(response.$response().data._embedded).forEach((item, index, array) => {
                    response.$request().$get(item).then(function (resource) {

                        self.data = resource.map(r => new DataField(self, r, response.$response().data._links,{
                            $dialog: self.$dialog,
                            $snackbar: self.$snackbar,
                            $user: self.$user,
                            $fileUpload: self.$fileUpload
                        })).concat(self.data);
                    });
                    if (index === array.length - 1) callback(true);
                });

            } else {
                self.$snackbar.error(`No data for task ${self.title}`);
                callback(false);
            }

        }, function () {
            self.$snackbar.error(`Data for ${self.title} failed to load`);
            callback(false);
        });
    };

    Task.prototype.validData = function () {
        const validation = this.data.every(field => field.valid());
        this.$snackbar.error("Not all required fields have values! Required fields are marked with asterisk (*)");
        return validation;
    };

    Task.prototype.save = function (callback = () => {
    }) {
        if (!this.data) return;

        const fields = {};
        this.data.forEach(field => field.changed ? fields[field.objectId] = field.save() : undefined);
        if (jQuery.isEmptyObject(fields)) {
            callback(true);
            return;
        }

        const self = this;
        this.$http.post(this.$href("data-edit"), JSON.stringify(fields)).then(function (response) {
            console.log(response);
            self.data.forEach(field => field.changed = false);
            self.$snackbar.success("Data saved successfully");
            callback(true);
        }, function () {
            self.$snackbar.error("Saving data has failed");
            callback(false);
        });
    };

    Task.prototype.click = function (panel) {
        if(this.expanded){
            this.cancel();
            panel.collapse();
        } else {
            this.assign();
            this.load();
        }
        this.expanded = !this.expanded;
    };

    return Task;
});
