define([], function () {
    function Tab(label) {
        this.label = label;
        this.page = {};
        this.loading = false;
    };

    return Tab;
});
