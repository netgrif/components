define(['./DataField','./HalResource','./Task'], function (DataField, HalResource, Task) {
    /**
     * Constructor for Case class
     * Angular dependency: $http, $snackbar, $dialog, $fileUpload, $user
     * @param {Object} tab
     * @param {Object} panel
     * @param {Object} resource
     * @param {Object} links
     * @param {Object} angular
     * @param {Object} config
     * @constructor
     */
    function Case(tab, panel, resource, links, angular,config = {}) {
        HalResource.call(this, links);
        this.tab = tab;
        this.panel = panel;
        Object.assign(this,resource,angular,config);

        if(this.immediateData){
            this.immediateData.forEach(data => {
                if(data.type === 'date') data.value = Task.formatDate(data.value);
            });
        }
        this.data = [];
        this.loading = false;
    }

    Case.prototype = Object.create(HalResource.prototype);
    Case.prototype.constructor = Case;

    Case.prototype.load = function (callback = ()=>{}) {
        //TODO 9.7.2017 load case data
    };

    Case.prototype.open = function () {
        this.tab.openCase(this);
    };

    Case.prototype.delete = function () {
        const self = this;
        this.$http.delete("/res/workflow/case/"+this.stringId).then(function (response){
            if(response.success){
                self.tab.closeCase(self);
                self.$snackbar.success($i18n.block.snackbar.case + " " + self.title + " " + $i18n.block.snackbar.wasDeleted);
                self.tab.delete(self);
            } else if(response.error){
                self.$snackbar.error(response.error); //TODO 9.8.2017 @Milan i18n?
            }
        }, function () {
            self.$snackbar.error($i18n.block.snackbar.case + " " + self.title + " " + $i18n.block.snackbar.failedToDelete);
        });
    };

    return Case;
});
