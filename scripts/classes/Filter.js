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
    function Filter(title, type, query, links, tab, conjunctiveQueryParts = undefined, config = {}) {
        this.title = title;
        this.description = undefined;
        this.visibility = 2;
        this.author = undefined;
        this.created = new Date();
        this.type = type;
        this.query = query;
        this.conjunctiveQueryParts = conjunctiveQueryParts;
        this.tab = tab;
        this.links = links;

        Object.assign(this, config);

        this.selected = false;
        this.visibilityIcon = Filter.getVisibilityIcon(this.visibility);
        this.formatedCreationDate = Case.formatDate(this.created);
    }

    Filter.TASK_TYPE = "task";
    Filter.CASE_TYPE = "case";

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
    Filter.prototype.merge = function (filter, requireQueryParts = false) {
        if(this.type !== filter.type) {
            console.error("attempting to merge filters of different type");
            return null;
        }

        if(requireQueryParts && !(this.conjunctiveQueryParts && filter.conjunctiveQueryParts)) {
            console.error("merge of filter query parts was required but provided filters didn't contain them!");
            return null;
        }

        let mergedQueryParts = this.conjunctiveQueryParts ? this.conjunctiveQueryParts.slice(0) : [];
        mergedQueryParts.concat( filter.conjunctiveQueryParts ? filter.conjunctiveQueryParts : []);

        let mergedQuery;
        if(this.query.length === 0)
            mergedQuery = filter.query;
        else if(filter.query.length === 0)
            mergedQuery = this.query;
        else
            mergedQuery = "("+this.query+") AND ("+filter.query+")";

        return new Filter(this.title, this.type, mergedQuery, this.links, this.tab, mergedQueryParts);
    };

    Filter.prototype.set = function (attribute, value) {
        this.query[attribute] = value;
    };

    Filter.prototype.remove = function (attribute) {
        delete this.query[attribute];
    };

    return Filter;
});