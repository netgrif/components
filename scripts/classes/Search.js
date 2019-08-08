define(['./Filter'], function (Filter) {

    /**
     * @param parent Parent controller
     * @param searchType TODO
     * @param angular $process, $http, $config
     * @param config options: considerWholeSearchInput
     * @constructor
     */
    function Search(parent, searchType, angular, config = {}) {
        Object.assign(this, angular, config);

        const self = this;

        this.parent = parent;
        this.searchType = searchType;
        this.query = {};

        // bound variables
        this.searchCategory = undefined;
        this.searchDatafield = undefined;
        this.searchOperator = undefined;
        this.searchArguments = [];
        this.searchObjects = [];

        this.chipParts = [];
        this.chips = [];

        this.categories = {
            case: {
                visualId: {
                    name: "Visual Id",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    getElasticKeyword: function () {
                        return ["visualId"];
                    },
                    getQueryArguments: function () {
                        return self.searchArguments;
                    }
                },
                process: {
                    name: "Process",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    autocompleteItems: new Map(),
                    argsInputType: function () {
                        return "autocomplete";
                    },
                    autocompleteFilter: function(index) {
                        return Array.from(this.autocompleteItems.keys()).filter( item => item.includes(self.searchArguments[index]));
                    },
                    getElasticKeyword: function () {
                        return ["processIdentifier"];
                    },
                    getQueryArguments: function () {
                        let args = [];
                        this.autocompleteItems.get(self.searchArguments[0]).forEach(function (autocomplete) {
                            args.push(autocomplete.id);
                        });
                        return args;
                    }
                },
                title: {
                    name: "Title",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    getElasticKeyword: function () {
                        return ["title"];
                    },
                    getQueryArguments: function () {
                        return self.searchArguments;
                    }
                },
                creationDate: {
                    name: "Creation Date",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE],
                    argsInputType: function () {
                        return "date";
                    },
                    getElasticKeyword: function () {
                        return ["creationDate"];
                    },
                    getQueryArguments: function () {
                        return self.searchArguments;
                    }
                },
                author: {
                    name: "Author",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    getElasticKeyword: function () {
                        return ["authorEmail", "authorName"];
                    },
                    getQueryArguments: function () {
                        return self.searchArguments;
                    }
                },
                dataset: {
                    name: "Dataset",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE, Search.OPERATOR.IS_NULL, Search.OPERATOR.LIKE],
                    autocompleteItems: new Map(),
                    argsInputType: function () {
                        return this.autocompleteItems.get(self.searchDatafield)[0].inputType;
                    },
                    datafieldFilter: function () {
                        return Array.from(this.autocompleteItems.keys()).filter(item => item.includes(self.searchDatafield));
                    },
                    getElasticKeyword: function () {
                        let keywords = [];
                        this.autocompleteItems.get(self.searchDatafield).forEach(function (keyword) {
                            keywords.push("dataSet."+keyword.id+".value");
                        });
                        return keywords;
                    },
                    getQueryArguments: function () {
                        return self.searchArguments;
                    }
                },
                task: {
                    name: "Task",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    autocompleteItems: new Map(),
                    argsInputType: function () {
                        return "autocomplete";
                    },
                    autocompleteFilter: function(index) {
                        return Array.from(this.autocompleteItems.keys()).filter( item => item.includes(self.searchArguments[index]));
                    },
                    getElasticKeyword: function () {
                        return ["taskIds"];
                    },
                    getQueryArguments: function () {
                        let args = [];
                        this.autocompleteItems.get(self.searchArguments[0]).forEach(function (autocomplete) {
                            args.push(autocomplete.id);
                        });
                        return args;
                    }
                },
                role: {
                    name: "Role",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                    autocompleteItems: new Map(),
                    argsInputType: function () {
                        return "autocomplete";
                    },
                    autocompleteFilter: function(index) {
                        return Array.from(this.autocompleteItems.keys()).filter( item => item.includes(self.searchArguments[index]));
                    },
                    getElasticKeyword: function () {
                        return ["enabledRoles"];
                    },
                    getQueryArguments: function () {
                        let args = [];
                        this.autocompleteItems.get(self.searchArguments[0]).forEach(function (autocomplete) {
                            args.push(autocomplete.id);
                        });
                        return args;
                    }
                }
            },
            task: {
                process: undefined,
                task: undefined,
                role: undefined,
                user: {
                    name: "User",
                    allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.IS_NULL, Search.OPERATOR.LIKE],
                    autocompleteItems: new Map(),
                    argsInputType: function () {
                        return "user";
                    },
                    getElasticKeyword: function () {
                        return ["userId"];
                    },
                    getQueryArguments: function () {
                        let args = [];
                        self.searchObjects.forEach(function (userObject) {
                            args.push(userObject.id);
                        });
                        return args;
                    }
                }
            }
        };
        this.categories.task.process = self.categories.case.process;
        this.categories.task.task = self.categories.case.task;
        this.categories.task.role = self.categories.case.role;

        this.populateAutocomplete();
    }

    Search.SEARCH_CASES = "case";
    Search.SEARCH_TASKS = "task";

    Search.OPERATOR = {
        EQUAL: {
            display: "=",
            numberOfOperands: 1,
            createQuery: function(keywords, args) {
                return Search.operatorQuery(keywords, args, "");
            },
            createText: function (args) {
                return Search.operatorText(args, "=");
            }
        },
        NOT_EQUAL: {
            display: "!=",
            numberOfOperands: 1,
            createQuery: function (keywords, args) {
                return "(!"+Search.OPERATOR.EQUAL.createQuery(keywords, args)+")";
            },
            createText: function (args) {
                return Search.operatorText(args, "!=");
            }
        },
        MORE_THAN: {
            display: ">",
            numberOfOperands: 1,
            createQuery: function (keywords, args) {
                return Search.operatorQuery(keywords, args, ">");
            },
            createText: function (args) {
                return Search.operatorText(args, ">");
            }
        },
        LESS_THAN: {
            display: "<",
            numberOfOperands: 1,
            createQuery: function (keywords, args) {
                return Search.operatorQuery(keywords, args, "<");
            },
            createText: function (args) {
                return Search.operatorText(args, "<");
            }
        },
        IN_RANGE: {
            display: "in range",
            numberOfOperands: 2,
            createQuery: function (keywords, args) {
                let simpleQueries = [];
                keywords.forEach(function (keyword) {
                    simpleQueries.push("("+keyword+":["+args[0]+" TO "+args[1]+"])");
                });
                return Search.bindQueries(simpleQueries, "OR");
            },
            createText: function (args) {
                return "is between "+args[0]+" and "+args[1];
            }
        },
        LIKE: {
            display: "like",
            numberOfOperands: 1,
            // TODO how 2 fuzzy?
            createQuery: function (keywords, args) {
                return "("+keywords[0]+":\""+args[0]+"\"~2)";
            },
            createText: function (args) {
                return Search.operatorText(args, "is like");
            }
        },
        IS_NULL: {
            display: "is null",
            numberOfOperands: 0,
            createQuery: function (keywords) {
                let simpleQueries = [];
                keywords.forEach(function (keyword) {
                    simpleQueries.push("((!(_exists_:"+keyword+")) OR ("+keyword+":\"\"))");
                });
                return Search.bindQueries(simpleQueries, "OR");
            },
            createText: function (args) {
                return "is null";
            }
        }
    };

    Search.operatorQuery = function(keywords, args, operator) {
        let simpleQueries = [];
        keywords.forEach(function (keyword) {
            args.forEach(function (arg) {
                simpleQueries.push(Search.simpleOperatorQuery(keyword, arg, operator));
            });
        });
        return Search.bindQueries(simpleQueries, "OR");
    };

    Search.simpleOperatorQuery = function(keyword, arg, operator) {
        return "("+keyword+":"+operator+"\""+arg+"\")";
    };

    Search.operatorText = function(args, operator) {
        return operator+" "+args[0];
    };

    Search.bindQueries = function(queries, bindingOperator) {
        let query = "";
        if(queries.length > 1)
            query += "(";
        query += queries[0];
        for(let i = 1; i < queries.length; i++)
            query += " "+bindingOperator+" " + queries[i];
        if(queries.length > 1)
            query += ")";
        return query;
    };


    Search.prototype.populateAutocomplete = function () {
        for (let key in this.categories.case) {
            if(this.categories.case.hasOwnProperty(key) && this.categories.case[key].hasOwnProperty("autocompleteItems")) {
                this.categories.case[key].autocompleteItems.clear();
            }
        }

        this.$process.nets.forEach(function (net) {
            this.addNameToIdMapping("process", net.identifier, net.id);

            net.transitions.forEach(function (transition) {
                this.addNameToIdMapping("task", transition.title, transition.id, transition.netId);
            }, this);

            net.roles.forEach(function (role) {
                this.addNameToIdMapping("role", role.name, role.id, net.id);
            }, this);

            if(this.searchType === Search.SEARCH_CASES) {
                net.immediateData.forEach(function (immediateData) {
                    this.addNameToIdMapping("dataset", immediateData.title, immediateData.stringId, net.id, immediateData.type);
                }, this);
            }
        }, this);
    };

    Search.prototype.addNameToIdMapping = function(categoryName, name, id, netId, inputType) {
        if(this.categories[this.searchType][categoryName].autocompleteItems.has(name))
            this.categories[this.searchType][categoryName].autocompleteItems.get(name).push(new AutocompleteItem(id, netId, inputType));
        else
            this.categories[this.searchType][categoryName].autocompleteItems.set(name, [new AutocompleteItem(id, netId, inputType)]);
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

    Search.prototype.addChipPart = function () {
        this.chipParts.push(new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments));
        this.resetInputFields();
    };

    Search.prototype.resetInputFields = function () {
        this.searchCategory = undefined;
        this.searchDatafield = undefined;
        this.searchOperator = undefined;
        this.searchArguments.splice(0, this.searchArguments.length);
        this.searchObjects.splice(0, this.searchObjects.length);
    };

    Search.prototype.addChip = function () {
        if(this.allArgumentsFilled()) {
            this.addChipPart();
            this.resetInputFields();
        }
        this.chips.push(new Chip(this.chipParts, "OR"));
        this.chipParts.splice(0, this.chipParts.length);
    };

    Search.prototype.buildQuery = function () {
        if(this.allArgumentsFilled() || this.chipParts.length > 0) {
            this.addChip();
        }
        let queries = [];
        this.chips.forEach(function (chip) {
            queries.push(chip.elementQuery);
        });
        this.query = {
            query: Search.bindQueries(queries, "AND")
        };
        console.log(this.query);
    };

    Search.prototype.queryUsers = function(searchText) {
        let requestBody = {
            fulltext: searchText
        };
        return this.$http.post(this.$config.getApiUrl("/user/search"), requestBody).then(response => {
            return response.$request().$get("users").then(function (resources) {
                let users = [];
                resources.forEach(function (user) {
                    users.push(new UserSearchObject(user.fullName, user.email, user.id));
                });
                return users;
            });
        }, error => {
            console.log("User search query failed");
            console.log(error);
        });
    };


    function ChipPart(category, operator, arguments) {
        this.elementText = this.createElementText(category, operator, arguments);
        this.elementQuery = this.createElementQuery(category, operator);
    }

    ChipPart.prototype.createElementQuery = function (category, operator) {
        return operator.createQuery(category.getElasticKeyword(), category.getQueryArguments());
    };
    
    ChipPart.prototype.createElementText = function (category, operator, arguments) {
        return category.name+" "+operator.createText(arguments);
    };


    function Chip(chipParts, booleanOperator) {
        this.elementText = this.createElementText(chipParts);
        let queries = [];
        chipParts.forEach(function (chipPart) {
            queries.push(chipPart.elementQuery);
        });
        this.elementQuery = Search.bindQueries(queries, booleanOperator);
    }

    Chip.prototype.createElementText = function (chipParts) {
        let text = chipParts[0].elementText;
        for(let i = 1; i < chipParts.length; i++)
            text += " | " + chipParts[i].elementText;
        return text;
    };


    function AutocompleteItem(id, netId, inputType) {
        this.id = id;
        this.netId = netId;
        this.inputType = inputType;
    }

    function UserSearchObject(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
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