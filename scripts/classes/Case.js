define(['./DataField', './HalResource', './Task'], function (DataField, HalResource, Task) {
    /**
     * Constructor for Case class
     * Angular dependency: $http, $snackbar, $dialog, $fileUpload, $user, $i18n
     * @param {Object} tab
     * @param {Object} panel
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @param {Object} config: represents (string, context variable, used in dashboard)
     * @constructor
     */
    function Case(tab, panel, resource, links, angular, config = {}) {
        HalResource.call(this, links);
        this.tab = tab;
        this.panel = panel;
        this.represents = "cases";
        Object.assign(this, resource, angular, config);

        if (this.immediateData) {
            this.immediateData.forEach(data => {
                if (data.type === 'date') data.value = Task.formatDate(data.value);
            });
        }
        this.formatedDate = Case.formatDate(this.creationDate);

        this.data = [];
        this.loading = false;
    }

    Case.prototype = Object.create(HalResource.prototype);
    Case.prototype.constructor = Case;

    Case.formatDate = function (date) {
        if (!date)
            return undefined;
        if (date instanceof Date)
            return `${DataField.padding(date.getDate(), 0)}.${DataField.padding(date.getMonth() + 1, 0)}. ${date.getFullYear()}`;

        return `${DataField.padding(date.dayOfMonth, 0)}.${DataField.padding(date.monthValue, 0)}.${date.year}
            ${DataField.padding(date.hour, 0, 0)}:${DataField.padding(date.minute, 0, 0)}`;
    };

    Case.prototype.load = function (callback = () => {}) {
        //TODO 9.7.2017 load case data
    };

    Case.prototype.open = function () {
        this.tab.openCase(this);
    };

    Case.prototype.delete = function () {
        const self = this;
        this.$http.delete("/res/workflow/case/" + this.stringId).then(function (response) {
            if (response.success) {
                self.tab.closeCase(self);
                self.$snackbar.success(`${self.$i18n.block.snackbar.case} ${self.title} ${self.$i18n.block.snackbar.wasDeleted}`);
                self.tab.delete(self);
            } else if (response.error) {
                self.$snackbar.error(response.error); //TODO 9.8.2017 Server i18n?
            }
        }, function () {
            self.$snackbar.error(`${self.$i18n.block.snackbar.case} ${self.title} ${self.$i18n.block.snackbar.failedToDelete}`);
        });
    };

    return Case;
});
