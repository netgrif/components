define(['./HalResource', 'jquery'], function (HalResource, jQuery) {
    /**
     * Constructor for class DataField
     * Angular dependencies: $dialog, $user, $fileUpload, $snackbar, $i18n
     * @param {Object} parent
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @constructor
     */
    function DataField(parent, resource, links, angular) {
        HalResource.call(this, links);
        this.parent = parent;
        Object.assign(this, resource, angular);
        this.newValue = this.parse(this.value);
        if (this.validationJS) this.validate = new Function("value", this.validationJS);
        else this.validate = new Function("", "return true;");

        this.element = undefined;
        this.changed = false;
        this.valid = this.isValid();
        this.active = false;
        this.uploadProgress = 0;
        this.searchTerm = undefined;

        this.buttonTypesToClasses = {
            // TODO 12.12.2018 Uncomment 'button' when button feature fully implemented -> see example in DashboardController
            // 'button': 'max-width-100 text-overflow-dots',
            'button': 'text-overflow-dots md-raised',
            'button raised': 'max-width-100 text-overflow-dots md-raised',
            'icon': 'md-icon-button',
            'fab': 'md-fab md-mini'
        }
    }

    DataField.prototype = Object.create(HalResource.prototype);
    DataField.prototype.constructor = DataField;

    DataField.prototype.getTemplate = function() {
        if (!this.view) {
            return this.type;
        }

        return this.type + "_" + this.view.value;
    };

    DataField.prototype.format = function (value) {
        if (this.type === "text" && value === null)
            return null;
        if (value === undefined || value === null)
            return;
        if (this.type === "date") {
            if (value instanceof Date)
                return `${value.getFullYear()}-${DataField.padding(value.getMonth() + 1, 0)}-${DataField.padding(value.getDate(), 0)}`;
            else
                return `${DataField.padding(value.dayOfMonth, 0)}.${DataField.padding(value.monthValue, 0)}.${value.year}
            ${DataField.padding(value.hour, 0, 0)}:${DataField.padding(value.minute, 0, 0)}`;
        }
        if (this.type === "user") {
            return value.id;
        }
        if (this.type === "dateTime") {
            if (value instanceof Date)
                return `${DataField.padding(value.getDate(), 0)}.${DataField.padding(value.getMonth() + 1, 0)}.${value.getFullYear()} ${DataField.padding(value.getHours(), 0,0)}:${DataField.padding(value.getMinutes(), 0,0)}:${DataField.padding(value.getSeconds(), 0, 0)}`;
            else
                return `${DataField.padding(value.dayOfMonth, 0)}.${DataField.padding(value.monthValue, 0)}.${value.year}
            ${DataField.padding(value.hour, 0, 0)}:${DataField.padding(value.minute, 0, 0)}`;
        }
        return value;
    };

    /**
     * Is new value in data field valid
     * @returns {boolean}
     */
    DataField.prototype.isValid = function () {
        switch (this.type) {
            case "button":
                this.valid = true;
                break;
            case "file":
                this.valid = this.newFile ? !!this.uploaded : !!this.newValue;
                break;
            case "boolean":
                this.valid = true;
                break;
            case "number":
                this.valid = (this.newValue !== null || this.newValue !== undefined) && this.validate(this.newValue);
                break;
            case "text":
                this.valid = this.newValue !== undefined && this.validate(this.newValue) && (this.behavior.required && this.newValue !== null ? this.newValue.trim() !== "" : true) && !(this.behavior.required && this.newValue == null);
                break;
            case "date":
                this.valid = this.newValue && this.validate(this.newValue);
                break;
            case "user":
                this.valid = true;
                break;
            default:
                this.valid = !!this.newValue;
        }
        return this.valid;
    };

    DataField.prototype.parse = function (value) {
        if (this.type === "date") {
            if (this.minDate) {
                const min = new Date(this.minDate);
                min.setDate(min.getDate() - 1);
                this.formatedMinDate = min;
            }
            if (this.maxDate) {
                const max = new Date(this.maxDate);
                max.setDate(max.getDate() + 1);
                this.formatedMaxDate = max;
            }
        }

        if (!value) return undefined;
        if (this.type === "date") {
            return new Date(value[0], value[1] - 1, value[2]);
        }
        else if (this.type === "dateTime") {
            return new Date(value[0], value[1] - 1, value[2], value[3], value[4]);
        }
        else if (this.type === "number") {
            return DataField.roundToTwo(value);
        }
        if (this.type === "multichoice" && this.view && this.view.value === "list" && value) {
            this.multiNewValue = {};
            value.forEach(v => {
                if (v.defaultValue) {
                    this.multiNewValue[v.defaultValue] = true;
                } else {
                    this.multiNewValue[v] = true;
                }
            });
        }
        return value;
    };

    DataField.prototype.save = function () {
        if (this.changed && this.isValid())
            return {
                type: this.type,
                value: this.format(this.newValue)
            };
        return undefined;
    };

    DataField.prototype.saveMultichoiceList = function(choice) {
        if (this.value.includes(choice)) {
            this.value = this.value.filter(item => item !== choice);
        } else {
            this.value.push(choice);
        }
        this.newValue = this.value;
        this.parent.save();
    };

    /**
     * Function for UserField
     * @param {Object} user - $user service is injected if user has chosen 'Self' option
     */
    DataField.prototype.chooseUser = function (user) {
        if (user) {
            this.newValue = user.getAsObject();
            this.changed = true;
            this.parent.save();
            return;
        }

        const self = this;
        this.$dialog.showByTemplate("assign_user", this, {
            task: Object.assign({fieldRoles: this.choices ? this.choices: this.roles}, this.parent)
        }).then(function (user) {
            if (!user) return;
            self.newValue = user;

            self.changed = true;
            self.parent.save();
        }, function () {
        });
    };

    DataField.prototype.removeUser = function () {
        if (!this.newValue)
            return;
        this.newValue = null;
        this.changed = true;
        this.parent.save();
    };

    DataField.prototype.fileChanged = function (field) {
        if (!field.file) return;
        field.newValue = {
            name: field.file.name
        };
        field.newFile = !field.value || field.value.name !== field.newValue.name;
        field.uploaded = false;
    };

    DataField.prototype.upload = function () {
        if (!this.file) return;

        this.$fileUpload.upload(this.file, undefined, this.parent.links.file.href + this.stringId, uploadEvent => {
            if (uploadEvent.lengthComputable) {
                this.uploadProgress = (uploadEvent.loaded / uploadEvent.total) * 100;
            }
        }, response => {
            this.uploadProgress = 0;
            if (response.isSave) {
                this.$snackbar.success(`${this.$i18n.block.snackbar.file} ${this.file.name} ${this.$i18n.block.snackbar.uploadedSuccessfully}`);
                this.parent.updateDataGroups(response.changedFields);
            } else {
                this.$snackbar.error(`${this.$i18n.block.snackbar.file} ${this.file.name} ${this.$i18n.block.snackbar.failedToUpload}`);
                return;
            }
            this.uploaded = true;
            this.newFile = true;
        });
    };

    DataField.prototype.download = function () {
        const downloadWindow = window.open(this.parent.links.file.href + this.stringId);
        downloadWindow.onload = () => downloadWindow.close();
    };

    function generateFileDownloadStorageKey(caseId, fieldId, userId) {
        return "data-" + caseId + "-" + fieldId + "-" + userId;
    }

    DataField.prototype.setHasBeenDownloaded = function(hasBeenDownloaded) {
        let fileInfo = {
            hasBeenDownloaded: hasBeenDownloaded
        };
        localStorage.setItem(generateFileDownloadStorageKey(this.parent.caseId, this.stringId, this.$user.id), JSON.stringify(fileInfo));
    };

    DataField.prototype.hasBeenDownloaded = function() {
        let loaded = localStorage.getItem(generateFileDownloadStorageKey(this.parent.caseId, this.stringId, this.$user.id));
        if (loaded) {
            let fileInfo = JSON.parse(loaded);
            return fileInfo.hasBeenDownloaded;
        }
        return false;
    };

    DataField.prototype.openFileChooser = function () {
        const fileInput = jQuery("#file-" + this.stringId + '-' + this.parent.stringId);
        if (fileInput)
            fileInput.trigger("click");
        else
            this.$snackbar.warning(this.$i18n.block.snackbar.noFileInput);
    };

    DataField.prototype.bindElement = function () {
        const el = jQuery(`#data-${this.parent.stringId}-${this.stringId}`);
        if (el.length > 0) this.element = el;
        return "";
    };

    DataField.prototype.setFieldActiveWithDelay = function (delay) {
        this.$timeout(() => {
            this.active = true
        }, delay);
    };

    DataField.padding = (value, pad = '', defaultValue = '') => {
        if (!value)
            return pad + defaultValue.toString();
        const text = value.toString();
        return text.length <= 1 ? pad + text : text;
    };

    DataField.roundToTwo = num => +(Math.round(num + "e+2") + "e-2");

    return DataField;
});
