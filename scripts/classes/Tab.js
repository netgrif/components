define([], function () {
    function Tab(label) {
        this.label = label;
        this.page = {};
        this.loading = false;
    };
    Tab.prototype.activate = function () { };

    return Tab;
});
