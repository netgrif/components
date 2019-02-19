define(['./Case'], function (Case) {

    /**
     *
     * @param {String} title
     * @param {String} type
     * @param {String} query
     * @param {Object} readableQuery
     * @param {Object} links
     * @param {Object} tab
     * @param {Object} config
     * @constructor
     */
    function Filter(title, type, query, readableQuery, links, tab, config = {}) {
        this.tab = tab;
        this.title = title;
        this.type = type;
        this.query = query;
        this.links = links;
        this.visibility = 2;
        this.author = undefined;
        this.created = new Date();
        this.description = undefined;

        Object.assign(this, config);

        try {
            this.readableQuery = JSON.parse(readableQuery);
        } catch (e) {
            this.readableQuery = readableQuery;
        }

        this.selected = false;
        this.visibilityIcon = Filter.getVisibilityIcon(this.visibility);
        this.formatedCreationDate = Case.formatDate(this.created);
        // this.readableQuery = this.getReadableQuery();
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

    function wrapWithArray(value) {
        if (value instanceof Array) return;
        return [value];
    }

    Filter.prototype.getReadableQuery = function () {
        const query = JSON.parse(this.query);
        const readable = {};
        Object.keys(query).forEach(key => {
            if (key === 'process' || key === 'transition') {
                const refs = wrapWithArray(query[key]);
                readable[key.toUpperCase()] = refs.map(ref => ref.title);
            } else
                readable[key.toUpperCase()] = wrapWithArray(query[key]);
        });
        return readable;
    };

    /**
     * Merge this filter with provided filter.
     * Existing filter is not modified
     * @param {Filter} filter
     * @returns {Filter} new filter with merged query
     */
    Filter.prototype.merge = function (filter) {
        const thisQuery = JSON.parse(this.query);
        const thatQuery = JSON.parse(filter.query);

        Object.keys(thatQuery).forEach(key => {
            if (!thisQuery[key]) {
                thisQuery[key] = thatQuery[key];
            } else {
                if (thisQuery[key] instanceof Array) {
                    if (thatQuery[key] instanceof Array) {
                        const arrayQuery = new Set(thisQuery[key]);
                        thatQuery[key].forEach(val => arrayQuery.add(val));
                        thisQuery[key] = [...arrayQuery];

                    } else if (thatQuery[key] instanceof String) {
                        !thisQuery[key].includes(thatQuery[key]) ? thisQuery[key].push(thatQuery[key]) : undefined;
                    }

                } else if (thisQuery[key] instanceof String) {
                    if (thatQuery[key] instanceof Array) {
                        !thatQuery[key].includes(thisQuery[key]) ? thatQuery[key].push(thisQuery[key]) : undefined;
                        thisQuery[key] = thatQuery[key];
                    } else if (thatQuery[key] instanceof String && thisQuery[key] !== thatQuery[key]) {
                        thisQuery[key] = [thisQuery[key], thatQuery[key]];
                    }
                }
            }
        });

        return new Filter(this.title, this.type, JSON.stringify(thisQuery), this.readableQuery, this.links, this.tab);
    };

    Filter.prototype.set = function (attribute, value) {
        const thisQuery = JSON.parse(this.query);
        thisQuery[attribute] = value;
        this.query = JSON.stringify(thisQuery);
    };

    Filter.prototype.remove = function (attribute) {
        const thisQuery = JSON.parse(this.query);
        delete thisQuery[attribute];
        this.query = JSON.stringify(thisQuery);
    };

    return Filter;
});