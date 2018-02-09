define(['./Task'], function (Task) {

    function Filter(title, type, query, links, tab, config = {}) {
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

        this.selected = false;
        this.visibilityIcon = Filter.getVisibilityIcon(this.visibility);
        this.formatedCreationDate = Task.formatDate(this.created);
        this.readableQuery = this.getReadableQuery();
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
            self.tab.$snackbar.error("Deleting of the filter " + this.title + " has failed");
            console.log(error);
        })
    };

    function wrapWithArray(value) {
        if(value instanceof Array) return;
        return [value];
    }

    Filter.prototype.getReadableQuery = function () {
        const query = JSON.parse(this.query);
        const readable = {};
        Object.keys(query).forEach(key => {
            if(key === 'process' || key === 'transition'){
                const refs = wrapWithArray(query[key]);
                readable[key.toUpperCase()] = refs.map(ref => ref.title);
            } else
                readable[key.toUpperCase()] = wrapWithArray(query[key]);
        });
        return readable;
    };


    return Filter;
});