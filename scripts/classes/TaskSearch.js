define(['./Filter'], function (Filter) {

    const searchSubjects = {
        process: {
            title: "Process",
            value: "process",
            disable: false,
            load: {
                method: "loadProcessReferences",
                always: false
            }
        }
        ,
        transition: {
            title: "Task",
            value: "transition",
            disable: true,
            dependency: ["process"],
            load: {
                method: "loadTransitionReferences",
                always: true
            }
        }
        ,
        user: {
            title: "User",
            value: "user",
            disable: false,
            load: {
                method: "loadUsers",
                always: false
            }
        }
    };

    /**
     * angular: $http, $snackbar, $i18n
     * @param angular
     * @param config
     * @constructor
     */
    function TaskSearch(angular, config = {}) {
        Object.assign(this, angular, config);

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
        if (!this.subject)
            return [];
        return this.loadCategory();
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

    TaskSearch.prototype.filterValues = function (data = []) {
        if (!this.searchText || this.searchText === "")
            return data;
        return data.filter(item => {
            const val = item.title.trim().toLowerCase();
            // return val.includes(this.searchText.trim().toLowerCase());
            return val.startsWith(this.searchText.trim().toLowerCase());
        })
    };

    TaskSearch.prototype.loadCategory = function () {
        if (!this.autoCompleteStorage[this.subject.value] || this.subject.load.always)
            return this[this.subject.load.method]();
        else
            return this.filterValues(this.autoCompleteStorage[this.subject.value]);
    };

    TaskSearch.prototype.loadProcessReferences = function () {
        const self = this;
        return this.$http.get("/res/petrinet/refs").then(response => {
            return response.$request().$get("petriNetReferences").then(resources => {
                self.autoCompleteStorage.process = resources;
                return self.filterValues(self.autoCompleteStorage.process);
            }, () => {
                console.log("No Petri net resources was found!");
            })
        }, error => {
            console.log("Petri net references failed to load!");
        });
    };

    TaskSearch.prototype.loadTransitionReferences = function () {

    };

    TaskSearch.prototype.loadUsers = function () {
        return [];
    };

    return TaskSearch;
});