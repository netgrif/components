define(['./Tab', './Filter'], function (Tab, Filter) {

    /**
     * angular: $http, $snackbar, $dialog, $i18n
     * config:
     * @param parent
     * @param angular
     * @param config
     * @constructor
     */
    function FilterTab(parent, angular, config = {}) {
        this.parent = parent;
        Object.assign(this, angular, config);

        this.filters = [];
        this.loading = false;
        this.search = {
            title: undefined,
            visibility: 2
        };
        this.searchVisibilityIcon = "public";
        this.filter = undefined;
        this.sideViewDetail = false;
    }

    FilterTab.URL_SEARCH = "/res/filter/search";

    FilterTab.prototype = Object.create(Tab.prototype);
    FilterTab.prototype.constructor = FilterTab;

    FilterTab.prototype.activate = function () {
        this.load(false, false);
    };

    FilterTab.prototype.load = function (next, force) {
        if (this.loading) return;
        if (next && this.filters && this.page.totalElements === this.filters.length) return;
        if (!next && !force && this.filters.length > 0) return;

        const self = this;
        this.loading = true;
        this.$http({
            url: next ? self.page.next : FilterTab.URL_SEARCH + "?sort=visibility",
            method: "POST",
            data: self.search
        }).then(response => {
            self.page = response.page;
            if (self.page.totalElements === 0) {
                //TODO snackbar "There are no saved filters"
                self.page.next = undefined;
                if (self.filters)
                    self.filters.splice(0, self.filters.length);
                self.loading = false;
                return;
            }
            const rawData = response.$response().data._embedded.filters;
            response.$request().$get("filters").then(resources => {
                if (self.page.totalPages !== 1 && url !== response.$href("last")) {
                    self.page.next = response.$href("next");
                }
                resources.forEach((resource, i) => {
                    self.filters.push(new Filter(resource.title, resource.type,
                        resource.query, rawData[i]._links, self, resource))
                });

                self.loading = false;
            }, () => {
                //TODO snackbar "No filters has been found"
                self.page.next = undefined;
                if (self.filters)
                    self.filters.splice(0, self.filters.length);
                self.loading = false;
            })

        }, error => {
            //TODO snackbar "Filters failed to load"
            console.log(error);
            self.loading = false;
        })
    };

    FilterTab.prototype.getSelectedFilters = function () {
        const selected = [];
        this.filters.forEach(f => f.selected ? selected.push(f) : undefined);
        return selected;
    };

    FilterTab.prototype.changeSearchVisibility = function (to) {
        this.search.visibility = to;
        this.searchVisibilityIcon = Filter.getVisibilityIcon(this.search.visibility);
    };

    FilterTab.prototype.deleteFilter = function (filter) {
        this.tab.filter = undefined;
        this.tab.sideViewDetail = false;
        this.filters.splice(this.filters.findIndex(f => f.stringId === filter.stringId), 1);
    };

    return FilterTab;
});