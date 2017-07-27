define(['./HalResource'], function (HalResource) {
    /**
     * Constructor for class DataField
     * Angular dependencies: $dialog, $user, $fileUpload, $snackbar
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

        //this.inputContainerElement = jQuery("#data-"+parent.stringId+"-"+this.objectId);

        this.changed = false;
        this.valid = true;
    }

    DataField.prototype = Object.create(HalResource.prototype);
    DataField.prototype.constructor = DataField;

    DataField.prototype.format = function (value) {
        if(this.type === "text" && value === null) return null;
        if (value === undefined || value === null) return;
        if (this.type === "date") {
            if (value instanceof Date) return `${value.getFullYear()}-${DataField.padding(value.getMonth() + 1, 0)}-${DataField.padding(value.getDate(), 0)}`;
            else return `${DataField.padding(value.dayOfMonth, 0)}.${DataField.padding(value.monthValue, 0)}.${value.year}
            ${DataField.padding(value.hour, 0)}:${DataField.padding(value.minute, 0)}`;
        }
        if (this.type === "user") {
            return value.email;
        }
        return value;
    };

    /**
     * Is new value in data field valid
     * @returns {boolean}
     */
    DataField.prototype.isValid = function () {
        switch (this.type) {
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
                this.valid = this.newValue !== undefined && this.validate(this.newValue) && ( this.behavior.required ? this.newValue.trim() !== "" : true);
                break;
            case "date":
                this.valid = this.newValue && this.validate(this.newValue);
                break;
            default:
                this.valid = !!this.newValue;
        }
        return this.valid;
    };

    DataField.prototype.parse = function (value) {
        if(this.type === "date") {
            this.minDate = this.minDate ? new Date(this.minDate) : undefined;
            this.maxDate = this.maxDate ? new Date(this.maxDate) : undefined;
        }

        if (!value) return undefined;
        if (this.type === "date"){
            return new Date(value.year, value.monthValue - 1, value.dayOfMonth);
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
            task: Object.assign({fieldRoles: this.roles}, this.parent)
        }).then(function (user) {
            if (!user) return;
            self.newValue = user;

            self.changed = true;
            self.parent.save();
        }, function () {
        });
    };

    DataField.prototype.fileChanged = function (field) {
        if (!field.file) return;
        field.newValue = field.file.name;
        field.newFile = field.value !== field.newValue;
        field.uploaded = false;
    };

    DataField.prototype.upload = function () {
        if (!this.file) return;

        this.$fileUpload.upload(this.file, undefined, this.parent.link('file') + this.objectId, response => {
            if (!response) {
                this.$snackbar.error(`File ${this.file.name} has failed to upload`);
                return;
            }

            this.uploaded = true;
            this.newFile = true;
            this.$snackbar.info(`File ${this.file.name} uploaded successfully`);
        });
    };

    DataField.prototype.download = function () {
        const downloadWindow = window.open(this.parent.link('file') + this.objectId);
        downloadWindow.onload = () => downloadWindow.close();
    };

    DataField.padding = (text, pad = '') => {
        if(!text) return "";
        text = text.toString();
        return text.length <= 1 ? pad + text : text;
    };

    return DataField;
});
