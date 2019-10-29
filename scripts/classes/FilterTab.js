define(['./Tab', './Filter'], function (Tab, Filter) {

    /**
     * angular: $http, $snackbar, $dialog, $i18n
     * config:
     * @param type - Filter.CASE_TYPE or Filter.TASK_TYPE
     * @param parent
     * @param angular
     * @param config
     * @constructor
     */
    function FilterTab(type, parent, angular, config = {}) {
        Tab.call(this, 99, "filter");

        this.parent = parent;
        Object.assign(this, angular, config);

        this.filters = [];
        this.type = type;
        this.search = {
            title: undefined,
            visibility: 2,
            type: type
        };
        this.searchVisibilityIcon = "public";
        this.filter = undefined;
        this.sideViewDetail = false;
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

    FilterTab.prototype.load = function (next, force, showSnackbar = true, searchRequest = this.search, searchResult = this.filters, callback = undefined) {
        if (this.loading) return;
        if (next && searchResult && this.page.totalElements === searchResult.length) return;
        if (!next && !force && searchResult.length > 0) return;

        const self = this;
        this.loading = true;
        const requestConfig = {
            url: next ? self.page.next : this.$config.getApiUrl(FilterTab.URL_SEARCH),
            method: "POST",
            params: {
                sort: "visibility"
            },
            data: searchRequest
        };
        this.$http(requestConfig).then(response => {
            if (searchResult)
                searchResult.splice(0, searchResult.length);

            self.page = response.page;
            if (self.page.totalElements === 0) {
                self._showSnackbar(showSnackbar);
                self.page.next = undefined;
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
                    searchResult.push(new Filter(resource.title, resource.type,
                        resource.query, rawData[i]._links, self, resource.conjunctiveQueryParts, configObj))
                });
                if (self.selectedFilters) {
                    searchResult.forEach(f => {
                        if (self.selectedFilters.has(f.stringId)) {
                            f.selected = true;
                        }
                    });
                }
                self.loading = false;
                callback && callback();
            }, () => {
                self._showSnackbar(showSnackbar);
                self.page.next = undefined;
                if (searchResult)
                    searchResult.splice(0, searchResult.length);
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
        return [...this.selectedFilters.values()];
    };

    FilterTab.prototype.updateSelectedFilters = function (index) {
        let filter = this.filters[index];
        if(filter.selected)
            this.selectedFilters.set(filter.stringId, filter);
        else
            this.selectedFilters.delete(filter.stringId);
    };

    FilterTab.prototype.saveFilters = function () {
        const selected = this.getSelectedFilters();
        if(this.type === Filter.TASK_TYPE)
            this.$user.savePreferenceTaskFilters(this.parent.viewId, selected.map(f => f.stringId));
        else if(this.type === Filter.CASE_TYPE)
            this.$user.savePreferenceCaseFilters(this.parent.viewId, selected.map(f => f.stringId));
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

    FilterTab.prototype.loadSelectedFilters = function(filterIds, callback = undefined) {
        if(filterIds.length === 0) {
            this.selectedFilters = new Map();
            callback && callback();
            return;
        }

        const self = this;
        let savedFilters = [];
        let request = {
            type: this.type,
            id: filterIds
        };
        this.load(false, true, false, request, savedFilters, function() {
            self.selectedFilters = new Map(savedFilters.map(filter => [filter.stringId, filter]));
            callback && callback();
        });
    };

    return FilterTab;
});