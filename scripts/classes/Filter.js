define(['./Case'], function (Case) {

    /**
     *
     * @param {String} title
     * @param {String} type
     * @param {String} query
     * @param {Object} links
     * @param {Object} tab
     * @param {Object} config
     * @constructor
     */
    function Filter(title, type, query, links, tab, config = {}) {
        this.title = title;
        this.description = undefined;
        this.visibility = 2;
        this.author = undefined;
        this.created = new Date();
        this.type = type;
        this.query = query;

        this.tab = tab;
        this.links = links;

        Object.assign(this, config);

        this.selected = false;
        this.visibilityIcon = Filter.getVisibilityIcon(this.visibility);
        this.formatedCreationDate = Case.formatDate(this.created);
    }

    Filter.TASK_TYPE = "Task";
    Filter.CASE_TYPE = "Case";

    Filter.getVisibilityIcon = function (visibility) {
        switch (visibility) {
            case 0:
                return "person";
            case 1:
                return "group";
            case 2:
                return "public";
        }
    };

    Filter.prototype.click = function () {
        this.selected = !this.selected;
    };

    Filter.prototype.openSideDetail = function () {
        this.tab.filter = this;
        this.tab.sideViewDetail = true;
    };

    Filter.prototype.closeSideDetail = function () {
        this.tab.filter = undefined;
        this.tab.sideViewDetail = false;
    };

    Filter.prototype.openDialogDetail = function () {
        this.tab.$dialog.showByTemplate('filter_detail', this);
    };

    Filter.prototype.delete = function () {
        const self = this;
        this.tab.$http({
            url: this.links.delete.href,
            method: "DELETE"
        }).then(response => {
            if (response.success) {
                self.tab.$snackbar.success(response.success);
                self.tab.deleteFilter(self);
            } else if (response.error)
                self.tab.$snackbar.error(response.error);
        }, error => {
            self.tab.$snackbar.error(`${self.$i18n.block.snackbar.deletingFilter} ${self.title} ${self.$i18n.block.snackbar.failed}`);
            console.log(error);
        })
    };

    /**
     * Merge this filter with provided filter.
     * Existing filter is not modified
     * @param {Filter} filter
     * @returns {Filter} new filter with merged query
     */
    Filter.prototype.merge = function (filter) {
        Object.keys(filter.query).forEach(key => {
            if (!this.query[key]) {
                this.query[key] = filter.query[key];
            } else {
                if (this.query[key] instanceof Array) {
                    if (filter.query[key] instanceof Array) {
                        const arrayQuery = new Set(this.query[key]);
                        filter.query[key].forEach(val => arrayQuery.add(val));
                        filter.query[key] = [...arrayQuery];

                    } else if (filter.query[key] instanceof String) {
                        !this.query[key].includes(filter.query[key]) ? this.query[key].push(filter.query[key]) : undefined;
                    }

                } else if (this.query[key] instanceof String) {
                    if (filter.query[key] instanceof Array) {
                        !filter.query[key].includes(this.query[key]) ? filter.query[key].push(this.query[key]) : undefined;
                        this.query[key] = filter.query[key];
                    } else if (filter.query[key] instanceof String && this.query[key] !== filter.query[key]) {
                        this.query[key] = [this.query[key], filter.query[key]];
                    }
                }
            }
        });

        return new Filter(this.title, this.type, this.query, this.links, this.tab);
    };

    Filter.prototype.set = function (attribute, value) {
        this.query[attribute] = value;
    };

    Filter.prototype.remove = function (attribute) {
        delete this.query[attribute];
    };

    return Filter;
});