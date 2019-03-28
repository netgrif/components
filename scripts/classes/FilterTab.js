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
        this.selectedFilters = angular.$user.getPreferenceTaskFilters(this.parent.viewId);
    }

    FilterTab.URL_SEARCH = "/filter/search";

    FilterTab.prototype = Object.create(Tab.prototype);
    FilterTab.prototype.constructor = FilterTab;

    FilterTab.prototype.activate = function () {
        this.reload();
    };

    FilterTab.prototype.reload = function (showSnackbar = true) {
        this.filters.splice(0, this.filters.length);
        this.filter = undefined;
        this.sideViewDetail = false;
        this.load(false, true,  showSnackbar);
    };

    FilterTab.prototype.load = function (next, force, showSnackbar = true) {
        if (this.loading) return;
        if (next && this.filters && this.page.totalElements === this.filters.length) return;
        if (!next && !force && this.filters.length > 0) return;

        const self = this;
        this.loading = true;
        const requestConfig = {
            url: next ? self.page.next : this.$config.getApiUrl(FilterTab.URL_SEARCH),
            method: "POST",
            params: {
                sort: "visibility"
            },
            data: self.search
        };
        this.$http(requestConfig).then(response => {
            self.page = response.page;
            if (self.page.totalElements === 0) {
                self._showSnackbar(showSnackbar);
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
                if (self.selectedFilters) {
                    self.filters.forEach(f => {
                        if (self.selectedFilters.includes(f.stringId)) {
                            f.selected = true;
                        }
                    });
                }
                self.loading = false;
            }, () => {
                self._showSnackbar(showSnackbar);
                self.page.next = undefined;
                if (self.filters)
                    self.filters.splice(0, self.filters.length);
                self.loading = false;
            });
        }, error => {
            self.$snackbar.error(self.$i18n.block.snackbar.filtersFailedLoad);
            console.log(error);
            self.loading = false;
        });
    };

    FilterTab.prototype._showSnackbar = function(show) {
        if (show) {
            this.$snackbar.warning(this.$i18n.block.snackbar.noFiltersFound);
        }
    };

    FilterTab.prototype.getSelectedFilters = function () {
        const selected = [];
        this.filters.forEach(f => f.selected ? selected.push(f) : undefined);
        return selected;
    };

    FilterTab.prototype.saveFilters = function () {
        const selected = this.getSelectedFilters();
        this.$user.savePreferenceTaskFilters(this.parent.viewId, selected.map(f => f.stringId));
        this.filters.forEach(f => f.selected = false);
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