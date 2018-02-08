define([],function () {

    function Filter(title, type, query, config = {}) {
        this.title = title;
        this.type = type;
        this.query = query;
        this.visibility = Filter.PRIVATE;
        this.author = undefined;
        this.created = new Date();
        this.description = undefined;

        Object.assign(this,config);
    }

    Filter.TASK_TYPE = "Task";
    Filter.CASE_TYPE = "Case";

    Filter.PUBLIC = "Public";
    Filter.GROUP = "Group";
    Filter.PRIVATE = "Private";

    return Filter;
});