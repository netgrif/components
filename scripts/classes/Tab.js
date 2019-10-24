define([], function () {
    function Tab(id, label, baseFilter) {
        this.id = id;
        this.label = label;
        this.page = {};
        this.loading = false;
        this.baseFilter = baseFilter;
        this.activeFilter = this.baseFilter;
    }
    Tab.prototype.activate = function () { };

    Tab.REPLACE_FILTER_POLICY = "replaceFilter";
    Tab.MERGE_FILTER_POLICY = "mergeFilter";

    Tab.prototype.openSaveFilterDialog = function () {
        this.$dialog.showByTemplate('save_filter', this);
    };

    Tab.prototype.callSaveFilter = function() { };

    Tab.prototype.saveFilter = function (filterType) {
        const requestBody = {
            title: this.activeFilter.title,
            description: this.activeFilter.description,
            visibility: this.activeFilter.visibility,
            type: filterType,
            query: this.activeFilter.query
        };
        this.$http.post(this.$config.getApiUrl("/filter"), requestBody).then(response => {
            if (response.success) {
                this.$snackbar.success(response.success);
            } else
                this.$snackbar.error(response.error);
            this.$dialog.closeCurrent();
        }, error => {
            console.log("Filter failed to be saved");
            console.log(error);
            this.$dialog.closeCurrent();
        })
    };

    return Tab;
});
