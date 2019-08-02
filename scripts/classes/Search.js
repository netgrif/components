define(['./Filter'], function (Filter) {

    /**
     * @param parent Parent controller
     * @param searchType TODO
     * @param angular $http, $snackbar, $i18n, $process
     * @param config options: considerWholeSearchInput
     * @constructor
     */
    function Search(parent, searchType, angular, config = {}) {
        Object.assign(this, angular, config);

        this.parent = parent;
        this.chips = [];
        this.subject = undefined;
        this.autoCompleteStorage = {};
        this.searchText = "";
        this.selectedItem = undefined;
        this.searchType = searchType;
        this.query = {};

        // bound variables
        this.searchCategory = undefined;
        this.searchOperator = undefined;
        this.searchArguments = [];

        this.inprogessChipElements = [];

        this.categories = {
            case: [
                {
                    name: "Visual Id",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.FREE,
                    getElasticKeyword: function () {
                        return "visualId";
                    },
                    getElasticFuzzy: function () {
                        return this.getElasticKeyword();
                    }
                },
                {
                    name: "Process",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.AUTOCOMPLETE,
                    getElasticKeyword: function () {
                        return "processIdentifier";
                    },
                    getElasticFuzzy: function () {
                        return this.getElasticKeyword();
                    }
                },
                {
                    name: "Title",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.FREE,
                    getElasticKeyword: function () {
                        return this.getElasticFuzzy();
                    },
                    getElasticFuzzy: function () {
                        return "title";
                    }
                },
                {
                    name: "Creation Date",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE],
                    inputType: Search.ARGUMENT_INPUT.FREE,
                    getElasticKeyword: function () {
                        return this.getElasticFuzzy();
                    },
                    getElasticFuzzy: function () {
                        return "creationDate";
                    }
                },
                {
                    name: "Author",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.FREE,
                    getElasticKeyword: function () {
                        return "authorEmail";
                    },
                    getElasticFuzzy: function () {
                        return "authorName";
                    }
                },
                {
                    name: "Dataset",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE, Search.OPERATOR.IS_NULL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.FREE
                    // TODO dataset
                },
                {
                    name: "Task",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.AUTOCOMPLETE,
                    getElasticKeyword: function () {
                        return "taskIds";
                    },
                    getElasticFuzzy: function () {
                        return this.getElasticKeyword();
                    }
                },
                {
                    name: "Roles",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    inputType: Search.ARGUMENT_INPUT.AUTOCOMPLETE,
                    getElasticKeyword: function () {
                        return "enabledRoles";
                    },
                    getElasticFuzzy: function () {
                        return this.getElasticKeyword();
                    }
                }
            ]
        };

        // this.subjects = {
        //     process: {
        //         title: this.$i18n.block.dialog.saveFilter.process,
        //         value: "process",
        //         disable: false,
        //         load: {
        //             method: "loadProcessReferences",
        //             always: false
        //         }
        //     }
        //     ,
        //     transition: {
        //         title: this.$i18n.block.dialog.saveFilter.task,
        //         value: "transition",
        //         disable: true,
        //         dependency: ["process"],
        //         load: {
        //             method: "loadTransitionReferences",
        //             always: false
        //         }
        //     }
        // };
    }

    Search.SEARCH_CASES = "case";
    Search.SEARCH_TASKS = "task";
    Search.OPERATOR = {
        EQUAL: {
            display: "=",
            numberOfOperands: 1,
            createQuery: function(keyword, args) {
                return Search.operatorQuery(keyword, args, "");
            }
        },
        NOT_EQUAL: {
            display: "!=",
            numberOfOperands: 1,
            createQuery: function (keyword, args) {
                return "(!"+Search.OPERATOR.EQUAL.createQuery(keyword, args)+")";
            }
        },
        MORE_THAN: {
            display: ">",
            numberOfOperands: 1,
            createQuery: function (keyword, args) {
                return Search.operatorQuery(keyword, args, ">");
            }
        },
        LESS_THAN: {
            display: "<",
            numberOfOperands: 1,
            createQuery: function (keyword, args) {
                return Search.operatorQuery(keyword, args, "<");
            }
        },
        IN_RANGE: {
            display: "in range",
            numberOfOperands: 2,
            createQuery: function (keyword, args) {
                return "("+keyword+":["+args[0]+" TO "+args[1]+"])";
            }
        },
        LIKE: {
            display: "like",
            numberOfOperands: 1,
            createQuery: function (fuzzy, args) {
                return "("+fuzzy+":\""+args[0]+"\"~2)";
            }
        },
        IS_NULL: {
            display: "is null",
            numberOfOperands: 0,
            createQuery: function (keyword, args) {
                return "((!(_exists_:"+keyword+")) OR ("+keyword+":\"\"))";
            }
        }
    };

    Search.ARGUMENT_INPUT = {
        FREE: "free",
        AUTOCOMPLETE: "autocomplete"
    };

    Search.operatorQuery = function(keyword, args, operator) {
        return "("+keyword+":"+operator+"\""+args[0]+"\")";
    };


    Search.prototype.argumentInputIsFree = function() {
      return this.searchCategory.inputType === Search.ARGUMENT_INPUT.FREE;
    };

    Search.prototype.allArgumentsFilled = function() {
        if(!this.searchOperator)
            return false;
        for(let argIndex = 0; argIndex < this.searchOperator.numberOfOperands; argIndex++) {
            if( !this.searchArguments[argIndex] || this.searchArguments[argIndex].toString().length === 0)
                return false;
        }
        return true;
    };

    Search.prototype.unknownSearchType = function() {
        console.error("Unknown search type '"+this.searchType+"'!");
    };

    Search.prototype.addChipElement = function () {
        this.inprogessChipElements.push(new ChipElement(this.searchCategory, this.searchOperator, this.searchArguments));
        this.resetInputFields();
    };

    Search.prototype.resetInputFields = function () {
        this.searchCategory = undefined;
        this.searchOperator = undefined;
        this.searchArguments = [];
    };

    function ChipElement(category, operator, arguments) {
        this.category = category;
        this.operator = operator;
        this.arguments = ; // TODO copy array
        this.elementQuery = Search.createElementQuery(category, operator, arguments);
    }

    Search.createElementQuery = function (category, operator, arguments) {
        switch(operator) {
            case Search.OPERATOR.LIKE:
                return operator.createQuery(category.getElasticFuzzy(), arguments);
            default:
                return operator.createQuery(category.getElasticKeyword(), arguments);
        }
    };
/*
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
*/
    /**
     * Populate search toolbar from filter applied on task tab
     * @param {Filter} filter
     */
  /*  Search.prototype.populateFromFilter = function (filter) {
        if (this.chips.length > 0 || !filter.query)
            return;

        Object.keys(filter.query).forEach(key => {
            filter.query[key].forEach(val => this.chips.push(new Chip("", key, "", val)));

            if (filter.query[key] instanceof Array) {
                this.query[key] = filter.query[key].map(val => new QueryObject(key, val, ""));
            } else {
                this.query[key] = new QueryObject(key, filter.query[key], "");
            }
        });
    };

    Search.prototype.selectedItemChanged = function (item) {
        if (!item)
            return;
        this.addChip(item);
        this.searchText = "";
        this.selectedItem = undefined;

        if (this.parent)
            this.parent.search();
    };

    Search.prototype.getItems = function () {
        if (!this.subject)
            return [];
        return this.loadCategory();
    };

    Search.prototype.addQuery = function (item) {
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

    Search.prototype.removeQuery = function (subject, id) {
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

    Search.prototype.getQuery = function () {
        const q = {};
        Object.keys(this.query).forEach(key => {
            if (this.query[key] instanceof Array)
                q[key] = this.query[key].map(v => v.param);
            else
                q[key] = this.query[key].param;
        });
        return q;
    };

    Search.prototype.getReadableQuery = function () {
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

    Search.prototype.getFilter = function () {
        return new Filter("", Filter.TASK_TYPE, this.getQuery());
    };

    Search.prototype.addChip = function (item) {
        if (!this.chips.some(c => c.id === item.id)) {
            this.chips.push(new Chip(item.subject, this.subjects[item.subject].title, item.id, item.title));
            this.addQuery(item);
        }
    };

    Search.prototype.removeChip = function (chip) {
        const index = this.chips.findIndex(c => c.id === chip.id);
        if (index !== -1) {
            this.removeQuery(chip.subject, chip.id);
            this.chips.splice(index, 1);
        }
    };

    Search.prototype.chipRemoved = function (chip) {
        this.removeQuery(chip.subject, chip.id);
        this.resolveSubjects();
        this.parent.search();
    };

    Search.prototype.resolveSubjects = function () {
        Object.keys(this.subjects).forEach(subject => {
            if (!this.subjects[subject].dependency)
                return;
            this.subjects[subject].disable = !this.subjects[subject].dependency.every(d => !!this.query[d]);
        });
        if (this.subject.disable)
            this.subject = this.subject.process;
    };

    Search.prototype.reset = function () {
        this.chips = [];
        this.subject = undefined;
        this.searchText = "";
        this.selectedItem = undefined;
        this.query = {};

        this.resolveSubjects();
        this.parent.search();
    };

    Search.prototype.filterValues = function (data = []) {
        if (!this.searchText || this.searchText === "")
            return data;
        return data.filter(item => {
            const val = item.title.trim().toLowerCase();
            if (this.considerWholeSearchInput)
                return val.includes(this.searchText.trim().toLowerCase());
            return val.startsWith(this.searchText.trim().toLowerCase());
        })
    };

    Search.prototype.loadCategory = function () {
        if (!this.autoCompleteStorage[this.subject.value] || this.subject.load.always)
            return this[this.subject.load.method]();
        else
            return this.filterValues(this.autoCompleteStorage[this.subject.value]);
    };

    Search.prototype.loadProcessReferences = function () {
        const self = this;
        this.autoCompleteStorage.process = this.$process.nets.map(n => new AutoCompleteItem("process", n));
        return this.filterValues(this.autoCompleteStorage.process);
    };

    Search.prototype.loadTransitionReferences = function () {
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

    };
*/
    return Search;
});