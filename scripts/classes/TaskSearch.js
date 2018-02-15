define(['./Filter'], function (Filter) {

    /**
     * @param angular $http, $snackbar, $i18n
     * @param config considerWholeSearchInput
     * @constructor
     */
    function TaskSearch(angular, config = {}) {
        Object.assign(this, angular, config);

        this.chips = [];
        this.subject = undefined;
        this.autoCompleteStorage = {};
        this.searchText = "";
        this.selectedItem = undefined;
        this.query = {};
        this.subjects = {
            process: {
                title: this.$i18n.page.console.process,
                value: "process",
                disable: false,
                load: {
                    method: "loadProcessReferences",
                    always: false
                }
            }
            ,
            transition: {
                title: this.$i18n.page.tasks.this,
                value: "transition",
                disable: true,
                dependency: ["process"],
                load: {
                    method: "loadTransitionReferences",
                    always: true
                }
            }
        };
    }

    function Chip(subject, id, search) {
        this.subject = subject;
        this.search = search;
        this.id = id;
        this.text = this.buildTitle();
    }

    Chip.prototype.buildTitle = function () {
        return this.subject + ": " + this.search;
    };

    function AutoCompleteItem(subject, resource) {
        this.subject = subject;
        Object.assign(this, resource);
    }

    function QueryObject(subject, param) {
        this.subject = subject;
        this.param = param;
    }

    TaskSearch.prototype.selectedItemChanged = function (item) {
        if(!item)
            return;
        this.addChip(item);
        this.searchText = "";
        this.selectedItem = undefined;
    };

    TaskSearch.prototype.getItems = function () {
        if (!this.subject)
            return [];
        return this.loadCategory();
    };

    TaskSearch.prototype.addQuery = function (item) {
        const queryObj = new QueryObject(item.subject, item.entityId);
        if (this.query[queryObj.subject]) {
            if (this.query[queryObj.subject] instanceof Array)
                this.query[queryObj.subject].push(queryObj);
            else {
                const values = [];
                values.push(this.query[queryObj.subject]);
                values.push(queryObj);
                this.query[queryObj.subject] = values;
            }
        } else {
            this.query[queryObj.subject] = queryObj;
        }
    };

    TaskSearch.prototype.removeQuery = function (subject, id) {
        if (this.query[subject] instanceof Array) {
            const index = this.query[subject].findIndex(o => o.param === id);
            if (index !== -1)
                this.query[subject].splice(index, 1);
        } else {
            delete this.query[subject];
        }

        if (this.query[subject] && this.query[subject] instanceof Array && this.query[subject].length === 1)
            this.query[subject] = this.query[subject][0];
    };

    TaskSearch.prototype.getQuery = function () {
        const q = {};
        Object.keys(this.query).forEach(key => {
            if (this.query[key] instanceof Array)
                q[key] = this.query[key].map(v => v.param);
            else
                q[key] = this.query[key].param;
        });
        return q;
    };

    TaskSearch.prototype.addChip = function (item) {
        if (!this.chips.some(c => c.id === item.entityId)) {
            this.chips.push(new Chip(item.subject, item.entityId, item.title));
            this.addQuery(item);
        }
    };

    TaskSearch.prototype.removeChip = function (chip) {
        const index = this.chips.findIndex(c => c.id === chip.id);
        if (index !== -1) {
            this.chips.splice(index, 1);
            this.removeQuery(chip.subject, chip.id);
        }
    };

    TaskSearch.prototype.resolveSubjects = function () {
        Object.keys(this.subjects).forEach(subject => {
            if (!this.subjects[subject].dependency)
                return;
            this.subjects[subject].disable = this.subjects[subject].dependency.every(d => !!this.query[d] || this.query.or ? this.query.or[d] : false);
        })
    };

    TaskSearch.prototype.filterValues = function (data = []) {
        if (!this.searchText || this.searchText === "")
            return data;
        return data.filter(item => {
            const val = item.title.trim().toLowerCase();
            if (this.considerWholeSearchInput)
                return val.includes(this.searchText.trim().toLowerCase());
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
                self.autoCompleteStorage.process = resources.map(r => new AutoCompleteItem("process", r));
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

    return TaskSearch;
});