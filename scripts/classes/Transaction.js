define([], function () {
    /**
     * Angular dependency:
     * @param resource
     * @param angular
     * @constructor
     */
    function Transaction(resource, angular) {
        Object.assign(this,resource,angular);

        this.active = false;
    }

    Transaction.prototype.setActive = function (tasks) {
        if(tasks instanceof Array)
            this.active = tasks.some(task => this.transitions.includes(task.transitionId));
        else
            this.active = this.transitions.includes(tasks.transitionId);
    };



    return Transaction;
});
