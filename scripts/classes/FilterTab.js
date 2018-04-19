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
        Tab.call(this, 99, "filter");

        this.parent = parent;
        Object.assign(this, angular, config);

        this.filters = [];
        this.search = {
            title: undefined,
            visibility: 2
        };
        this.searchVisibilityIcon = "public";
        this.filter = undefined;
        this.sideViewDetail = false;
    }

    FilterTab.URL_SEARCH = "/api/filter/search";

    FilterTab.prototype = Object.create(Tab.prototype);
    FilterTab.prototype.constructor = FilterTab;

    FilterTab.prototype.activate = function () {
        this.reload();
    };

    FilterTab.prototype.reload = function () {
        this.filters.splice(0, this.filters.length);
        this.filter = undefined;
        this.sideViewDetail = false;
        this.load(false, true);
    };

    FilterTab.prototype.load = function (next, force) {
        if (this.loading) return;
        if (next && this.filters && this.page.totalElements === this.filters.length) return;
        if (!next && !force && this.filters.length > 0) return;

        const self = this;
        this.loading = true;
        const requestConfig = {
            url: next ? self.page.next : FilterTab.URL_SEARCH + "?sort=visibility",
            method: "POST",
            data: self.search
        };
        this.$http(requestConfig).then(response => {
            self.page = response.page;
            if (self.page.totalElements === 0) {
                self.$snackbar.info(self.$i18n.block.snackbar.noSavedFilters);
                self.page.next = undefined;
                if (self.filters)
                    self.filters.splice(0, self.filters.length);
                self.loading = false;
                return;
            }
            const rawData = response.$response().data._embedded.filters;
            response.$request().$get("filters").then(resources => {
                if (self.page.totalPages !== 1 && requestConfig.url !== response.$href("last")) {
                    self.page.next = response.$href("next");
                }
                resources.forEach((resource, i) => {
                    const configObj = Object.assign({}, resource, {
                        $i18n: self.$i18n
                    });
                    const readable = JSON.parse(resource.readableQuery);
                    self.filters.push(new Filter(resource.title, resource.type,
                        resource.query, readable, rawData[i]._links, self, configObj))
                });

                self.loading = false;
            }, () => {
                self.$snackbar.info(self.$i18n.block.snackbar.noFiltersFound);
                self.page.next = undefined;
                if (self.filters)
                    self.filters.splice(0, self.filters.length);
                self.loading = false;
            })

        }, error => {
            self.$snackbar.error(self.$i18n.block.snackbar.filtersFailedLoad);
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