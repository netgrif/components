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
        HalResource.call(this,links);
        this.parent = parent;
        Object.assign(this, resource, angular);

        this.newValue = this.value;
        this.changed = false;
    }
    DataField.prototype = Object.create(HalResource.prototype);
    DataField.prototype.constructor = DataField;

    DataField.prototype.format = function (value, type) {
        if (!value) return;
        if (type === "date") {
            if (value instanceof Date) return `${value.getFullYear()}-${DataField.padding(value.getMonth() + 1, 0)}-${DataField.padding(value.getDate(), 0)}`;
            else return `${DataField.padding(value.dayOfMonth, 0)}.${DataField.padding(value.monthValue, 0)}.${value.year}
            ${DataField.padding(value.hour, 0)}:${DataField.padding(value.minute, 0)}`;
        }
        if (type === "user") {
            return value.email;
        }
        return value;
    };

    /**
     * Is new value in data field valid
     * @returns {boolean}
     */
    DataField.prototype.valid = function () {
        if (this.behavior.required) {
            switch (this.type) {
                case "file":
                    return this.newFile ? !!this.uploaded : !!this.newValue;
                case "boolean":
                    return true;
                case "number":
                    return this.newValue !== undefined && this.newValue !== null;
                default:
                    return !!this.newValue;
            }

        } else return true;
    };

    DataField.prototype.parse = function (value, type) {
        if (!value) return;
        if (type === "date")
            return new Date(value.year, value.monthValue - 1, value.dayOfMonth);
        return value;
    };

    DataField.prototype.save = function () {
        if (this.changed)
            return {
                type: this.type,
                value: this.format(this.newValue, this.type)
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

    DataField.prototype.fileChanged = function () {
        if (!this.file) return;
        this.newValue = this.file.name;
        this.newFile = this.value !== this.newValue;
        this.uploaded = false;
    };

    DataField.prototype.upload = function () {
        if (!this.file) return;

        this.$fileUpload.upload(this.file, undefined, this.parent.$href('file') + this.objectId, response => {
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
        const downloadWindow = window.open(this.parent.$href('file') + this.objectId);
        downloadWindow.onload = () => downloadWindow.close();
    };

    DataField.padding = (text, pad) => {
        text = text.toString();
        return text.length <= 1 ? pad + text : text;
    };

    return DataField;
});
