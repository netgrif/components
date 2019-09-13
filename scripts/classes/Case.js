define(['./DataField', './HalResource'], function (DataField, HalResource) {
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
                data.formatFilter = data.format;
                if (data.type === 'date' || data.type === 'dateTime') data.value = Case.formatDate(data.value);
            });
        }
        this.formatedDate = Case.formatDate(this.creationDate);

        this.data = [];
        this.loading = false;
        this.selectedData = {
            column0: undefined,
            column1: undefined,
            column2: undefined,
            column3: undefined,
            column4: undefined,
            column5: undefined
        };

        if (this.preselectedData) {
            this.preselectedData.forEach((data, index) => this.changeSelectedData("column" + index, data));
        }
    }

    Case.prototype = Object.create(HalResource.prototype);
    Case.prototype.constructor = Case;

    Case.formatDate = function (date) {
        if (!date)
            return undefined;
        if (date instanceof Date)
            return `${DataField.padding(date.getDate(), 0)}.${DataField.padding(date.getMonth() + 1, 0)}. ${date.getFullYear()}`;

        return `${DataField.padding(date[2], 0)}.${DataField.padding(date[1], 0)}.${date[0]}
                ${DataField.padding(date[3], 0, 0)}:${DataField.padding(date[4], 0, 0)}`;
    };

    Case.prototype.load = function (callback = () => {
    }) {
        //TODO 9.7.2017 load case data
    };

    Case.prototype.open = function () {
        this.tab.openCase(this);
    };

    Case.prototype.delete = function () {
        const self = this;
        this.$http.delete(this.$config.getApiUrl({
            url: "/workflow/case/{id}",
            params: {id: this.stringId}
        })).then(function (response) {
            if (response.success) {
                self.tab.closeCase(self);
                self.$snackbar.success(`${self.$i18n.block.snackbar.case} ${self.title} ${self.$i18n.block.snackbar.wasDeleted}`);
                self.tab.delete(self);
            } else if (response.error) {
                $log.debug(response.error);
                self.$snackbar.error(`${self.$i18n.block.snackbar.case} ${this.title} ${self.$i18n.block.snackbar.failedToDelete}`);
            }
        }, function () {
            self.$snackbar.error(`${self.$i18n.block.snackbar.case} ${self.title} ${self.$i18n.block.snackbar.failedToDelete}`);
        });
    };

    Case.prototype.changeSelectedData = function (index, field) {
        if (!index || !field) return;
        this.selectedData[index] = Object.create(field);
        if (field.stringId.startsWith("meta-")) {
            let metaDataValue = this[field.stringId.substring(field.stringId.indexOf("-") + 1)];
            if (field.type === 'date')
                metaDataValue = Case.formatDate(metaDataValue);
            this.selectedData[index].value = metaDataValue;
            return;
        } else if (field.process !== this.processIdentifier) {
            this.selectedData[index] = undefined;
            return;
        }

        const immediateField = this.immediateData.find(data => data.stringId === this.selectedData[index].stringId);
        if (immediateField) {
            this.selectedData[index].value = immediateField.value;
            this.selectedData[index].formatFilter = immediateField.formatFilter;
        } else {
            this.selectedData[index] = undefined;
        }
    };

    return Case;
});
