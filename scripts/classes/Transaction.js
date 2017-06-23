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
        this.active = tasks.some(task => this.transitions.includes(task.transitionId));
    };



    return Transaction;
});
