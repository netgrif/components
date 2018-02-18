define([], function () {
    function Tab(id,label) {
        this.id = id;
        this.label = label;
        this.page = {};
        this.loading = false;
    }
    Tab.prototype.activate = function () { };

    return Tab;
});
