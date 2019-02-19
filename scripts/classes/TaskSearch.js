define(['./Filter'], function (Filter) {

    /**
     * @param parent Parent controller
     * @param angular $http, $snackbar, $i18n, $process
     * @param config options: considerWholeSearchInput
     * @constructor
     */
    function TaskSearch(parent, angular, config = {}) {
        Object.assign(this, angular, config);

        this.parent = parent;
        this.chips = [];
        this.subject = undefined;
        this.autoCompleteStorage = {};
        this.searchText = "";
        this.selectedItem = undefined;
        this.query = {};
        this.subjects = {
            process: {
                title: this.$i18n.block.dialog.saveFilter.process,
                value: "process",
                disable: false,
                load: {
                    method: "loadProcessReferences",
                    always: false
                }
            }
            ,
            transition: {
                title: this.$i18n.block.dialog.saveFilter.task,
                value: "transition",
                disable: true,
                dependency: ["process"],
                load: {
                    method: "loadTransitionReferences",
                    always: false
                }
            }
        };
    }

    function Chip(subject, subjectTitle, id, search) {
        this.subject = subject;
        this.search = search;
        this.id = id;
        this.subjectTitle = subjectTitle;
        this.text = this.buildTitle(this.subjectTitle);
    }

    Chip.prototype.buildTitle = function (subject) {
        return subject + ": " + this.search;
    };

    function AutoCompleteItem(subject, resource) {
        this.subject = subject;
        Object.assign(this, resource);
    }

    function QueryObject(subject, param, dependency) {
        this.subject = subject;
        this.param = param;
        this.dependency = dependency;
    }

    /**
     * Populate search toolbar from filter applied on task tab
     * @param {Filter} filter
     */
    TaskSearch.prototype.populateFromFilter = function (filter) {
        if (this.chips.length > 0 || !filter.readableQuery)
            return;
        Object.keys(filter.readableQuery).forEach(key => {
            filter.readableQuery[key].forEach(val => this.chips.push(new Chip("", key, "", val)));
        });
        const q = JSON.parse(filter.query);
        if (q instanceof Object) {
            Object.keys(q).forEach(key => {
                if (q[key] instanceof Array) {
                    this.query[key] = q[key].map(val => new QueryObject(key, val, ""));
                } else {
                    this.query[key] = new QueryObject(key, q[key], "");
                }
            });
        }
    };

    TaskSearch.prototype.selectedItemChanged = function (item) {
        if (!item)
            return;
        this.addChip(item);
        this.searchText = "";
        this.selectedItem = undefined;

        if (this.parent)
            this.parent.search();
    };

    TaskSearch.prototype.getItems = function () {
        if (!this.subject)
            return [];
        return this.loadCategory();
    };

    TaskSearch.prototype.addQuery = function (item) {
        const queryObj = new QueryObject(item.subject, item.id, item.petriNetId);
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

        this.resolveSubjects();
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

        const affected = Object.keys(this.subjects).find(sub => this.subjects[sub].dependency ? this.subjects[sub].dependency.includes(subject) : false);
        if (affected && this.query[affected]) {
            const removeAffectedChip = affectedQuery => {
                if (affectedQuery.dependency && affectedQuery.dependency === id)
                    this.removeChip(new Chip(affected, "whatever", affectedQuery.param, "whatever"));
            };
            if (this.query[affected] instanceof Array)
                this.query[affected].forEach(removeAffectedChip);
            else
                removeAffectedChip(this.query[affected]);

            if (this.query[affected] && this.query[affected] instanceof Object)
                removeAffectedChip(this.query[affected]);
        }
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

    TaskSearch.prototype.getReadableQuery = function () {
        const q = {};
        this.chips.forEach(chip => {
            if (!q[chip.subjectTitle]) {
                q[chip.subjectTitle] = [chip.search];
            } else {
                q[chip.subjectTitle].push(chip.search);
            }
        });
        return q;
    };

    TaskSearch.prototype.getFilter = function () {
        return new Filter("", Filter.TASK_TYPE, JSON.stringify(this.getQuery()), this.getReadableQuery());
    };

    TaskSearch.prototype.addChip = function (item) {
        if (!this.chips.some(c => c.id === item.id)) {
            this.chips.push(new Chip(item.subject, this.subjects[item.subject].title, item.id, item.title));
            this.addQuery(item);
        }
    };

    TaskSearch.prototype.removeChip = function (chip) {
        const index = this.chips.findIndex(c => c.id === chip.id);
        if (index !== -1) {
            this.removeQuery(chip.subject, chip.id);
            this.chips.splice(index, 1);
        }
    };

    TaskSearch.prototype.chipRemoved = function (chip) {
        this.removeQuery(chip.subject, chip.id);
        this.resolveSubjects();
        this.parent.search();
    };

    TaskSearch.prototype.resolveSubjects = function () {
        Object.keys(this.subjects).forEach(subject => {
            if (!this.subjects[subject].dependency)
                return;
            this.subjects[subject].disable = !this.subjects[subject].dependency.every(d => !!this.query[d]);
        });
        if (this.subject.disable)
            this.subject = this.subject.process;
    };

    TaskSearch.prototype.reset = function () {
        this.chips = [];
        this.subject = undefined;
        this.searchText = "";
        this.selectedItem = undefined;
        this.query = {};

        this.resolveSubjects();
        this.parent.search();
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
        this.autoCompleteStorage.process = this.$process.nets.map(n => new AutoCompleteItem("process", n));
        return this.filterValues(this.autoCompleteStorage.process);

        // return this.$http.get("/api/petrinet/refs").then(response => {
        //     return response.$request().$get("petriNetReferences").then(resources => {
        //         self.autoCompleteStorage.process = resources.map(r => new AutoCompleteItem("process", r));
        //         return self.filterValues(self.autoCompleteStorage.process);
        //     }, () => {
        //         console.log("No Petri net resources was found!");
        //     });
        // }, error => {
        //     console.log("Petri net references failed to load!");
        //     console.error(error);
        // });
    };

    TaskSearch.prototype.loadTransitionReferences = function () {
        const self = this;

        let queryProcess = [];
        if (this.query.process instanceof Array)
            queryProcess = queryProcess.concat(this.query.process.map(p => p.param));
        else
            queryProcess.push(this.query.process.param);
        this.autoCompleteStorage.transition = [];
        queryProcess.forEach(p => {
            const net = this.$process.get(p);
            if (net)
                this.autoCompleteStorage.transition = this.autoCompleteStorage.transition.concat(net.transitions.map(t => new AutoCompleteItem("transition", t)));
        });
        return this.filterValues(this.autoCompleteStorage.transition);


        // return this.$http.get("/api/petrinet/transitions", {params: {ids: queryProcess}}).then(response => {
        //     return response.$request().$get("transitionReferences").then(resources => {
        //         self.autoCompleteStorage.transition = resources.map(r => new AutoCompleteItem("transition", r));
        //         return self.filterValues(self.autoCompleteStorage.transition);
        //     }, () => {
        //         console.log("No transition resources was found!");
        //     });
        // }, error => {
        //     console.log("Transition references failed to load!");
        //     console.error(error);
        // });
    };

    return TaskSearch;
});