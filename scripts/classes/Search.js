define(['./Filter'], function (Filter) {

    /**
     * @param parent Parent controller
     * @param searchType Search.SEARCH_CASES or Search.SEARCH_TASKS
     * @param angular $process, $http, $config
     * @param config options: considerWholeSearchInput
     * @constructor
     */
    function Search(parent, searchType, angular, config = {}) {
        Object.assign(this, angular, config);

        const self = this;

        this.parent = parent;
        this.searchType = searchType;
        this.query = "";

        this.allNets = new Set();
        this.possibleNets = new Set();

        // bound variables
        this.searchCategory = undefined;
        this.searchDatafield = undefined;
        this.searchOperator = undefined;
        this.searchArguments = [];
        this.searchObjects = [];

        this.chipParts = [];
        this.chips = [];
        this.enabledCategories = [];

        this.categories = {};
        this.categories[Search.SEARCH_CASES] = {
            visualId: {
                name: "Visual Id",
                allowedOperators: [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE],
                getElasticKeyword: function () {
                    return ["visualId"];
                },
                getQueryArguments: function () {
                    return self.searchArguments;
                },
                isEnabled: function () {
                    return true;
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
                    if(!self.searchArguments[index])
                        return this._filterArguments("");
                    return this._filterArguments(self.searchArguments[index]);
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
                },
                isEnabled: function () {
                    return this._filterArguments("").length > 0;
                },
                _filterArguments: function (text) {
                    return self._filterAutocompleteItems(text, this);
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
                },
                isEnabled: function () {
                    return true;
                }
            },
            creationDate: {
                name: "Creation Date",
                allowedOperators: [Search.OPERATOR.EQUAL_DATE, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE_DATE],
                argsInputType: function () {
                    return "date";
                },
                getElasticKeyword: function () {
                    return ["creationDateSortable"];
                },
                getQueryArguments: function () {
                    return self.searchArguments;
                },
                isEnabled: function () {
                    return true;
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
                },
                isEnabled: function () {
                    return true;
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
                    if(!self.searchDatafield)
                        return this._filterDatafields("");
                    return this._filterDatafields(self.searchDatafield);
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
                },
                isEnabled: function () {
                    return this._filterDatafields("").length > 0;
                },
                _filterDatafields: function (text) {
                    return self._filterAutocompleteItems(text, this);
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
                    if(!self.searchArguments[index])
                        return this._filterArguments("");
                    return this._filterArguments(self.searchArguments[index]);
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
                },
                isEnabled: function () {
                    return this._filterArguments("").length > 0;
                },
                _filterArguments: function (text) {
                    return self._filterAutocompleteItems(text, this);
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
                    if(!self.searchArguments[index])
                        return this._filterArguments("");
                    return this._filterArguments(self.searchArguments[index]);
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
                },
                isEnabled: function () {
                    return this._filterArguments("").length > 0;
                },
                _filterArguments: function (text) {
                    return self._filterAutocompleteItems(text, this);
                }
            }
        };
        this.categories[Search.SEARCH_TASKS] = {
            process: self.categories[Search.SEARCH_CASES].process,
            task: self.categories[Search.SEARCH_CASES].task,
            role: self.categories[Search.SEARCH_CASES].role,
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
                    if( !self.searchObjects || self.searchObjects.length === 0)
                        return [];

                    let args = [];
                    self.searchObjects.forEach(function (userObject) {
                        args.push(userObject.id);
                    });
                    return args;
                },
                isEnabled: function () {
                    return true;
                }
            }
        };

        this.populateAutocomplete();
        this.fillAllNets();
        this.resetPossibleNets();
        this.evaluateEnabledCategories();
    }

    Search.SEARCH_CASES = Filter.CASE_TYPE;
    Search.SEARCH_TASKS = Filter.TASK_TYPE;

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
            createQuery: function (keywords, args, equalityOperator) {
                return "(!"+equalityOperator.createQuery(keywords, args)+")";
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
                    let arg1 = Search.wrapWithQuotes(args[0]);
                    let arg2 = Search.wrapWithQuotes(args[1]);
                    if(arg1.wrapped || arg2.wrapped)
                        throw new Error("Range queries don't support phrases as arguments!");
                    simpleQueries.push("("+keyword+":["+arg1.value+" TO "+arg2.value+"])");
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
            createQuery: function (keywords, args) {
                let arg = Search.wrapWithQuotes(args[0]);
                if(arg.wrapped)
                    return "("+keywords[0]+":"+arg.value+"~3)";
                else
                    return "("+keywords[0]+":"+arg.value+"~)";
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
        },
        EQUAL_DATE: {},
        IN_RANGE_DATE: {}
    };
    Object.assign(Search.OPERATOR.EQUAL_DATE, Search.OPERATOR.EQUAL);
    Search.OPERATOR.EQUAL_DATE.createQuery = function(keywords, args) {
        return Search.OPERATOR.IN_RANGE_DATE.createQuery(keywords, [args[0], args[0]]);
    };
    Object.assign(Search.OPERATOR.IN_RANGE_DATE, Search.OPERATOR.IN_RANGE);
    Search.OPERATOR.IN_RANGE_DATE.createQuery = function(keywords, args) {
        let arg2 = new Date(args[1]);
        arg2.setDate(arg2.getDate()+1); // javascript handles rollover
        return "("+keywords[0]+":["+args[0].getTime()+" TO "+arg2.getTime()+"})";
    };

    Search.ELASTIC = {
        ESCAPABLE_CHARACTERS: new Set (['+', '-', '=', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/']),
        UNESCAPABLE_CHARACTERS: new Set(['<', '>'])
    };

    Search.operatorQuery = function(keywords, args, operator) {
        let simpleQueries = [];
        keywords.forEach(function (keyword) {
            args.forEach(function (arg) {
                simpleQueries.push(Search.simpleOperatorQuery(keyword, Search.wrapWithQuotes(arg).value, operator));
            });
        });
        return Search.bindQueries(simpleQueries, "OR");
    };

    Search.simpleOperatorQuery = function(keyword, arg, operator) {
        return "("+keyword+":"+operator+arg+")";
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

    Search.escapeInput = function(input) {
        let output = "";
        for(let i = 0; i < input.length; i++) {
            if(Search.ELASTIC.UNESCAPABLE_CHARACTERS.has(input.charAt(i)))
                continue;
            if(Search.ELASTIC.ESCAPABLE_CHARACTERS.has(input.charAt(i)))
                output += "\\";
            output += input.charAt(i);
        }
        return output;
    };

    Search.wrapWithQuotes = function(input) {
        if(typeof input === "string" && input.includes(" "))
            return {value: '"'+input+'"', wrapped: true};
        else
            return {value: input, wrapped: false};
    };


    Search.prototype.populateAutocomplete = function () {
        for (let key in this.categories[Search.SEARCH_CASES]) {
            if(this.categories[Search.SEARCH_CASES].hasOwnProperty(key) && this.categories[Search.SEARCH_CASES][key].hasOwnProperty("autocompleteItems")) {
                this.categories[Search.SEARCH_CASES][key].autocompleteItems.clear();
            }
        }

        this.$process.nets.forEach(function (net) {
            this.addNameToIdMapping("process", net.title, net.id, net.id);

            net.transitions.forEach(function (transition) {
                this.addNameToIdMapping("task", transition.title, transition.id, transition.netId);
            }, this);

            net.roles.forEach(function (role) {
                this.addNameToIdMapping("role", role.name, role.id, net.id);
            }, this);

            if(this.searchType === Search.SEARCH_CASES) {
                net.immediateData.forEach(function (immediateData) {
                    if(immediateData.type !== "date" && immediateData.type !== "dateTime")
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

    Search.prototype.fillAllNets = function() {
        this.categories[Search.SEARCH_CASES].process.autocompleteItems.forEach(function (value, key) {
            value.forEach(function (autocompleteObject) {
                this.allNets.add(autocompleteObject.netId);
            }, this);
        }, this);
    };

    Search.prototype.resetPossibleNets = function() {
        this.possibleNets.clear();
        this.allNets.forEach(function (netId) {
            this.possibleNets.add(netId);
        }, this);
        this.filterPossibleNets();
    };

    Search.prototype.filterPossibleNets = function() {
        let setUnions = [];
        if(this.chips.length > 0) {
            this.chips.forEach(function (chip) {
                let union = this._possibleNetsUnionFromChipParts(chip.chipParts);
                if(union.size > 0)
                    setUnions.push(union);
            }, this);
        }

        let setIntersection = new Set();
        this.possibleNets.forEach(function (netId) {
            for(let i = 0; i < setUnions.length; i++) {
                if( !setUnions[i].has(netId))
                    return; // continue for the outer forEach loop
            }
            setIntersection.add(netId);
        });

        this.possibleNets = setIntersection;
        this.evaluateEnabledCategories();
    };

    Search.prototype._possibleNetsUnionFromChipParts = function(chipParts) {
        let union = new Set();
        chipParts.forEach(function (chipPart) {
            if(chipPart.possibleNets) {
                if(chipPart.isComplement) {
                    let complement = new Set(this.allNets);
                    chipPart.possibleNets.forEach(function (netId) {
                        complement.delete(netId);
                    });
                    complement.forEach(function (netId) {
                        union.add(netId);
                    });
                }
                else {
                    chipPart.possibleNets.forEach(function (netId) {
                        union.add(netId);
                    });
                }
            }
        }, this);
        return union;
    };

    Search.prototype.evaluateEnabledCategories = function() {
        this.enabledCategories.splice(0, this.enabledCategories.length);
        for(let key in this.categories[this.searchType]) {
            if(this.categories[this.searchType][key].isEnabled())
                this.enabledCategories.push(this.categories[this.searchType][key]);
        }
        return this.enabledCategories;
    };

    Search.prototype.allArgumentsFilled = function() {
        if(!this.searchOperator)
            return false;
        for(let argIndex = 0; argIndex < this.searchOperator.numberOfOperands; argIndex++) {
            if( typeof this.searchArguments[argIndex] === "undefined" || this.searchArguments[argIndex].toString().length === 0)
                return false;
        }
        return true;
    };

    Search.prototype.addChipPart = function () {
        let possibleNets = [];
        switch (this.searchCategory.name) {
            case "Process":
            case "Task":
            case "Role":
                this.searchCategory.autocompleteItems.get(this.searchArguments[0]).forEach(function (autocompleteItem) {
                    possibleNets.push(autocompleteItem.netId);
                });
                this.chipParts.push(new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments, possibleNets));
                break;
            case "Dataset":
                this.searchCategory.autocompleteItems.get(this.searchDatafield).forEach(function (autocompleteItem) {
                    possibleNets.push(autocompleteItem.netId);
                });
                this.chipParts.push(new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments, possibleNets));
                break;
            default:
                this.chipParts.push(new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments));
                break;
        }
        this.resetInputFields();
    };

    Search.prototype.resetInputFields = function () {
        this.searchCategory = undefined;
        this.searchDatafield = undefined;
        this.searchOperator = undefined;
        this.searchArguments.splice(0, this.searchArguments.length);
        this.searchObjects.splice(0, this.searchObjects.length);
    };

    Search.prototype.clearFieldsCategory = function() {
        this.searchDatafield = undefined;
        this.clearFieldsDatafield();
    };

    Search.prototype.clearFieldsDatafield = function() {
        this.searchOperator = undefined;
        this.clearFieldsOperator();
    };

    Search.prototype.clearFieldsOperator = function() {
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

    Search.prototype.buildSearchQuery = function () {
        if(this.allArgumentsFilled() || this.chipParts.length > 0) {
            this.addChip();
        }
        let queries = [];
        this.chips.forEach(function (chip) {
            queries.push(chip.query);
        });
        this.query = Search.bindQueries(queries, "AND");
        console.log(this.query); // TODO remove after development
        return this.query;
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

    Search.prototype.getFilter = function () {
        return new Filter("", this.searchType, this.buildSearchQuery(), undefined, this.parent, this.chips);
    };

    Search.prototype.populateFromFilter = function (filter) {
        if( !filter.query)
            return;

        this.resetInputFields();

        if( !filter.conjunctiveQueryParts || filter.conjunctiveQueryParts.length === 0) {
            this.chips.push(Chip.createChip("custom filter" /* TODO i18n */, filter.query));
            return;
        }

        filter.conjunctiveQueryParts.forEach(function (filterChip) {
            if( !filterChip.query || filterChip.query.length === 0) {
                console.error("Filter has chip with no query! skipping");
                console.error(filterChip);
                return; // continue
            }

            this.chips.push( Chip.createChip(
                filterChip.text && filterChip.text.length > 0 ? filterChip.text : "custom filter", // TODO i18n
                filterChip.query,
                filterChip.chipParts
            ));

        }, this);

    };

    Search.prototype._filterAutocompleteItems = function (text, category) {
        let filtered = [];
        category.autocompleteItems.forEach(function (value, key) {
            if(key.includes(text)) {
                for(let i = 0; i < value.length; i++) {
                    if(this.possibleNets.has(value[i].netId)) {
                        filtered.push(key);
                        break;
                    }
                }
            }
        }, this);
        return filtered;
    };


    function ChipPart(category, operator, arguments, possibleNets = undefined) {
        let escapedArguments = [];
        arguments.forEach(function (argument) {
            escapedArguments.push(Search.escapeInput(argument));
        });

        this.text = this.createElementaryText(category, operator, escapedArguments);
        this.query = this.createElementaryQuery(category, operator);
        this.possibleNets = possibleNets;
        this.isComplement = operator === Search.OPERATOR.NOT_EQUAL;
        if(this.isComplement) {
            switch (category.name) {
                case "Process":
                    break;
                case "Dataset":
                    // the complement doesn't affect the process but the value of the datafield in it
                    this.isComplement = false;
                    break;
                default:
                    // not enough information to deduce anything about possible nets
                    this.possibleNets = undefined;
                    this.isComplement = undefined;
            }
        }
    }

    ChipPart.prototype.createElementaryQuery = function (category, operator) {
        if(category.argsInputType() === "date")
            return operator.createQuery(category.getElasticKeyword(), category.getQueryArguments(), Search.OPERATOR.EQUAL_DATE);
        else
            return operator.createQuery(category.getElasticKeyword(), category.getQueryArguments(), Search.OPERATOR.EQUAL);
    };
    
    ChipPart.prototype.createElementaryText = function (category, operator, arguments) {
        return category.name+" "+operator.createText(arguments);
    };


    function Chip(chipParts, booleanOperator) {
        this.text = this.createElementaryText(chipParts);
        this.chipParts = chipParts.slice(0);
        let queries = [];
        this.chipParts.forEach(function (chipPart) {
            queries.push(chipPart.query);
        });
        this.query = Search.bindQueries(queries, booleanOperator);
    }

    Chip.prototype.createElementaryText = function (chipParts) {
        let text = chipParts[0].text;
        for(let i = 1; i < chipParts.length; i++)
            text += " | " + chipParts[i].text;
        return text;
    };

    Chip.createChip = function(text, query, chipParts = undefined) {
        return {
            text: text,
            query: query,
            chipParts: chipParts ? chipParts : []
        }
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