define(['./Filter'], function (Filter) {

    const searchSubjects = [
        {
            title: "Process",
            value: "process",
            disable: false,
            load: {
                method: "loadProcessReferences",
                always: false
            }
        },
        {
            title: "Task",
            value: "transition",
            disable: true,
            dependency: ["process"],
            load: {
                method: "loadTransitionReferences",
                always: true
            }
        },
        {
            title: "User",
            value: "user",
            disable: false
        }
    ];

    function TaskSearch() {
        this.chips = [];
        this.subjects = searchSubjects;
        this.subject = undefined;
        this.autoCompleteStorage = {};
        this.searchText = undefined;
        this.selectedItem = undefined;
        this.query = {};
    }

    function Chip(title) {
        this.title = title;
    }

    function AutoCompleteItem(title) {
        this.title = title;
    }

    TaskSearch.prototype.selectedItemChanged = function (item) {

    };

    TaskSearch.prototype.getItems = function () {

    };

    TaskSearch.prototype.getQuery = function () {

    };

    TaskSearch.prototype.resolveSubjects = function () {
        searchSubjects.forEach(subject => {
            if (!subject.dependency)
                return;
            subject.disable = subject.dependency.every(d => !!this.query[d] || this.query.or ? this.query.or[d] : false);
        })
    };

    TaskSearch.prototype.loadProcessReferences = function () {

    };

    TaskSearch.prototype.loadTransitionReferences = function () {

    };

    return TaskSearch;
});