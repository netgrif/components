define(['./Filter'], function (Filter) {

    /**
     * @param parent Parent controller
     * @param searchType Search.SEARCH_CASES or Search.SEARCH_TASKS
     * @param guiComplexity which GUIs are displayed to the user (Search.COMPLEX_GUI, Search.HEADER_GUI, Search.COMBINED_GUI)
     * @param angular $process, $http, $config, $i18n
     * @param config options: considerWholeSearchInput
     * @constructor
     */
    function Search(parent, searchType, guiComplexity, angular, config = {}) {
        Object.assign(this, angular, config);

        const self = this;

        this.parent = parent;
        this.searchType = searchType;
        this.guiComplexity = guiComplexity;

        this.allNets = new Set();
        this.possibleNets = new Set();

        this.headerSearchFieldsMetadata = [];

        // bound variables
        this.searchCategory = undefined;
        this.searchDatafield = undefined;
        this.searchOperator = undefined;
        this.searchArguments = {};
        this.searchArguments[Search.COMPLEX_GUI] = [];
        this.searchArguments[Search.HEADER_GUI] = [];
        this.searchObjects = {};
        this.searchObjects[Search.COMPLEX_GUI] = [];
        this.searchObjects[Search.HEADER_GUI] = [];

        this.chipParts = {
            committed: [],
            predicted: undefined
        };
        this.chips = {
            committed: [],
            predicted: undefined
        };

        this.enabledCategories = [];

        this.categories = {};
        this.categories[Search.SEARCH_CASES] = {
            visualId: {
                name: "Visual Id",
                headerName: "meta-visualId",
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL];
                },
                getElasticKeyword: function () {
                    return ["visualId"];
                },
                getQueryArguments: function (inputGui) {
                    return self.searchArguments[inputGui];
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return this.getQueryArguments(Search.COMPLEX_GUI);
                },
                isEnabled: function () {
                    return true;
                }
            },
            process: {
                name: "Process",
                autocompleteItems: new Map(),
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL];
                },
                argsInputType: function () {
                    return "autocomplete";
                },
                autocompleteFilter: function(inputGui, index) {
                    if(!self.searchArguments[inputGui][index])
                        return this._filterArguments("");
                    return this._filterArguments(self.searchArguments[inputGui][index]);
                },
                getElasticKeyword: function () {
                    return ["processId"];
                },
                getQueryArguments: function (inputGui) {
                    let args = [];
                    this.autocompleteItems.get(self.searchArguments[inputGui][0]).forEach(function (autocomplete) {
                        args.push(autocomplete.id);
                    });
                    return args;
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return self.searchArguments[Search.COMPLEX_GUI];
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
                headerName: "meta-title",
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.LIKE];
                },
                getElasticKeyword: function () {
                    return ["title"];
                },
                getQueryArguments: function (inputGui) {
                    return self.searchArguments[inputGui];
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return this.getQueryArguments(Search.COMPLEX_GUI);
                },
                isEnabled: function () {
                    return true;
                }
            },
            creationDate: {
                name: "Creation Date",
                headerName: "meta-creationDate",
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL_DATE, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN_DATE, Search.OPERATOR.LESS_THAN_DATE, Search.OPERATOR.IN_RANGE_DATE];
                },
                argsInputType: function () {
                    return "date";
                },
                getElasticKeyword: function () {
                    return ["creationDateSortable"];
                },
                getQueryArguments: function (inputGui) {
                    return self.searchArguments[inputGui];
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return self.formatDateArguments(this.getQueryArguments(Search.COMPLEX_GUI));
                },
                isEnabled: function () {
                    return true;
                }
            },
            author: {
                name: "Author",
                headerName: "meta-author",
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL];
                },
                getElasticKeyword: function () {
                    return ["authorEmail", "authorName"];
                },
                getQueryArguments: function (inputGui) {
                    return self.searchArguments[inputGui];
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return this.getQueryArguments(Search.COMPLEX_GUI);
                },
                isEnabled: function () {
                    return true;
                }
            },
            dataset: {
                name: "Dataset",
                autocompleteItems: new Map(),
                allowedOperators: function (datafieldType, datafieldMapKey) {
                    let defaultOperators = [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE, Search.OPERATOR.IS_NULL, Search.OPERATOR.LIKE];

                    if(!datafieldType) {
                        let datafields = this.autocompleteItems.get(datafieldMapKey);
                        if(!datafields || datafields.length == 0)
                            return defaultOperators;
                        datafieldType = datafields[0].inputType;
                    }

                    switch (datafieldType) {
                        default:
                            return defaultOperators;

                        case "number":
                            return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN, Search.OPERATOR.LESS_THAN, Search.OPERATOR.IN_RANGE, Search.OPERATOR.IS_NULL];

                        case "date":
                            return [Search.OPERATOR.EQUAL_DATE, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.MORE_THAN_DATE, Search.OPERATOR.LESS_THAN_DATE, Search.OPERATOR.IN_RANGE_DATE, Search.OPERATOR.IS_NULL];
                    }
                },
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
                        keywords.push(this.fullKeywordFromId(keyword.id));
                    }, this);
                    return keywords;
                },
                getQueryArguments: function (inputGui) {
                    return self.searchArguments[inputGui];
                },
                getTextPrefix: function() {
                    return "Datafield "+self.searchDatafield;
                },
                getFormattedArguments: function() {
                    switch (this.argsInputType()) {
                        case "date":
                            return self.formatDateArguments(this.getQueryArguments(Search.COMPLEX_GUI));
                        default:
                            return this.getQueryArguments(Search.COMPLEX_GUI);
                    }
                },
                isEnabled: function () {
                    return this._filterDatafields("").length > 0;
                },
                fullKeywordFromId: function (datafieldId) {
                    return "dataSet."+datafieldId+".value";
                },
                _filterDatafields: function (text) {
                    return self._filterAutocompleteItems(text, this);
                }
            },
            task: {
                name: "Task",
                autocompleteItems: new Map(),
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL];
                },
                argsInputType: function () {
                    return "autocomplete";
                },
                autocompleteFilter: function(inputGui, index) {
                    if(!self.searchArguments[inputGui][index])
                        return this._filterArguments("");
                    return this._filterArguments(self.searchArguments[inputGui][index]);
                },
                getElasticKeyword: function () {
                    return ["taskIds"];
                },
                getQueryArguments: function (inputGui) {
                    return self.searchArguments[inputGui];
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return this.getQueryArguments(Search.COMPLEX_GUI);
                },
                overrideQueryGeneration: function (operator) {
                    let matchingAutocompleteItems = [];
                    this.getQueryArguments(Search.COMPLEX_GUI).forEach(function (taskName) {
                        matchingAutocompleteItems = matchingAutocompleteItems.concat(this.autocompleteItems.get(taskName));
                    }, this);
                    let elementarySubqueries = [];
                    matchingAutocompleteItems.forEach(function (autocompleteItem) {
                        let simpleSubqueries = [];
                        simpleSubqueries.push(Search.OPERATOR.EQUAL.createQuery(this.getElasticKeyword(), [autocompleteItem.id]));
                        simpleSubqueries.push(Search.OPERATOR.EQUAL.createQuery(self.categories[self.searchType].process.getElasticKeyword(), [autocompleteItem.netId]));
                        elementarySubqueries.push(Search.bindQueries(simpleSubqueries, "AND"));
                    }, this);
                    let equalsQuery = Search.bindQueries(elementarySubqueries, "OR");
                    if(operator === Search.OPERATOR.EQUAL)
                        return equalsQuery;
                    if(operator === Search.OPERATOR.NOT_EQUAL)
                        return "(!"+equalsQuery+")";
                    console.error("unsupported operator");
                    return "";
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
                autocompleteItems: new Map(),
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL];
                },
                argsInputType: function () {
                    return "autocomplete";
                },
                autocompleteFilter: function(inputGui, index) {
                    if(!self.searchArguments[inputGui][index])
                        return this._filterArguments("");
                    return this._filterArguments(self.searchArguments[inputGui][index]);
                },
                getElasticKeyword: function () {
                    return ["enabledRoles"];
                },
                getQueryArguments: function (inputGui) {
                    let args = [];
                    this.autocompleteItems.get(self.searchArguments[inputGui][0]).forEach(function (autocomplete) {
                        args.push(autocomplete.id);
                    });
                    return args;
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return self.searchArguments[Search.COMPLEX_GUI];
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
            task: {},
            role: self.categories[Search.SEARCH_CASES].role,
            user: {
                name: "User",
                autocompleteItems: new Map(),
                allowedOperators: function () {
                    return [Search.OPERATOR.EQUAL, Search.OPERATOR.NOT_EQUAL, Search.OPERATOR.IS_NULL];
                },
                argsInputType: function () {
                    return "user";
                },
                getElasticKeyword: function () {
                    return ["userId"];
                },
                getQueryArguments: function (inputGui) {
                    if( !self.searchObjects[inputGui] || self.searchObjects[inputGui].length === 0)
                        return [];

                    let args = [];
                    self.searchObjects[inputGui].forEach(function (userObject) {
                        args.push(userObject.id);
                    });
                    return args;
                },
                getTextPrefix: function() {
                    return this.name;
                },
                getFormattedArguments: function() {
                    return self.searchArguments[Search.COMPLEX_GUI];
                },
                isEnabled: function () {
                    return true;
                }
            }
        };
        // Override some functionality
        Object.assign(this.categories[Search.SEARCH_TASKS].task, this.categories[Search.SEARCH_CASES].task);
        this.categories[Search.SEARCH_TASKS].task.getElasticKeyword = function () {
            return ["transitionId"];
        };

        this.populateAutocomplete();
        this.fillVariableAllNets();
        this.resetPossibleNets();
        this.evaluateEnabledCategories();
        this.setHeaderInputMetadata();
    }

    Search.SEARCH_CASES = Filter.CASE_TYPE;
    Search.SEARCH_TASKS = Filter.TASK_TYPE;

    Search.COMPLEX_GUI = "COMPLEX";
    Search.HEADER_GUI = "HEADER";
    Search.COMBINED_GUI = "COMBINED";

    Search.OPERATOR = {
        EQUAL: {
            display: "=",
            numberOfOperands: 1,
            createQuery: function(keywords, args) {
                return Search._operatorQuery(keywords, args, "");
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
                return Search._operatorQuery(keywords, args, ">");
            },
            createText: function (args) {
                return Search.operatorText(args, ">");
            }
        },
        LESS_THAN: {
            display: "<",
            numberOfOperands: 1,
            createQuery: function (keywords, args) {
                return Search._operatorQuery(keywords, args, "<");
            },
            createText: function (args) {
                return Search.operatorText(args, "<");
            }
        },
        IN_RANGE: {
            display: "in range",
            numberOfOperands: 2,
            createQuery: function (keywords, args) {
                return Search.forEachKeyword(keywords, function (keyword) {
                    let arg1 = Search.wrapWithQuotes(args[0]);
                    let arg2 = Search.wrapWithQuotes(args[1]);
                    if(arg1.wrapped || arg2.wrapped)
                        throw new Error("Range queries don't support phrases as arguments!");
                    return "("+keyword+":["+arg1.value+" TO "+arg2.value+"])";
                });
            },
            createText: function (args) {
                return "is between "+args[0]+" and "+args[1];
            }
        },
        LIKE: {
            display: "like",
            numberOfOperands: 1,
            createQuery: function (keywords, args) {
                return "("+keywords[0]+":"+args[0]+")";
            },
            createText: function (args) {
                return Search.operatorText(args, "is like");
            }
        },
        IS_NULL: {
            display: "is null",
            numberOfOperands: 0,
            createQuery: function (keywords) {
                return Search.forEachKeyword(keywords, function (keyword) {
                    return "((!(_exists_:"+keyword+")) OR ("+keyword+":\"\"))";
                });
            },
            createText: function () {
                return "is null";
            }
        },
        EQUAL_DATE: {},
        IN_RANGE_DATE: {},
        MORE_THAN_DATE: {},
        LESS_THAN_DATE: {}
    };
    // Inherit and override some functionality
    Object.assign(Search.OPERATOR.EQUAL_DATE, Search.OPERATOR.EQUAL);
    Search.OPERATOR.EQUAL_DATE.createQuery = function(keywords, args) {
        return Search.OPERATOR.IN_RANGE_DATE.createQuery(keywords, [args[0], args[0]]);
    };
    Object.assign(Search.OPERATOR.IN_RANGE_DATE, Search.OPERATOR.IN_RANGE);
    Search.OPERATOR.IN_RANGE_DATE.createQuery = function(keywords, args) {
        let arg2 = new Date(args[1]);
        arg2.setDate(arg2.getDate()+1); // javascript handles rollover
        return Search.forEachKeyword(keywords, function (keyword) {
            return "("+keyword+":["+args[0].getTime()+" TO "+arg2.getTime()+"})";
        });
    };
    Object.assign(Search.OPERATOR.MORE_THAN_DATE, Search.OPERATOR.MORE_THAN);
    Search.OPERATOR.MORE_THAN_DATE.createQuery = function(keywords, args) {
        let arg1 = new Date(args[0]);
        arg1.setDate(arg1.getDate()+1);
        arg1.setMilliseconds(arg1.getMilliseconds()-1);
        return Search.OPERATOR.MORE_THAN.createQuery(keywords, [arg1.getTime()])
    };
    Object.assign(Search.OPERATOR.LESS_THAN_DATE, Search.OPERATOR.LESS_THAN);
    Search.OPERATOR.LESS_THAN_DATE.createQuery = function(keywords, args) {
        return Search.OPERATOR.LESS_THAN.createQuery(keywords, [new Date(args[0]).getTime()])
    };

    Search.ELASTIC = {
        ESCAPABLE_CHARACTERS: new Set (['+', '-', '=', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/']),
        UNESCAPABLE_CHARACTERS: new Set(['<', '>'])
    };

    Search.forEachKeyword = function(keywords, simpleQueryConstructor) {
        let simpleQueries = [];
        keywords.forEach(function (keyword) {
            simpleQueries.push(simpleQueryConstructor(keyword));
        });
        return Search.bindQueries(simpleQueries, "OR");
    };

    Search._operatorQuery = function(keywords, args, operator) {
        return Search.forEachKeyword(keywords, function (keyword) {
            return Search.simpleOperatorQuery(keyword, Search.wrapWithQuotes(args[0]).value, operator);
        });
    };

    Search.simpleOperatorQuery = function(keyword, arg, operator) {
        return "("+keyword+":"+operator+arg+")";
    };

    Search.operatorText = function(args, operator) {
        return operator+" "+args[0];
    };

    Search.bindQueries = function(queries, bindingOperator) {
        if(queries.length === 0)
            return "";

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
        if(typeof input === "string") {
            let output = "";
            for(let i = 0; i < input.length; i++) {
                if(Search.ELASTIC.UNESCAPABLE_CHARACTERS.has(input.charAt(i)))
                    continue;
                if(Search.ELASTIC.ESCAPABLE_CHARACTERS.has(input.charAt(i)))
                    output += "\\";
                output += input.charAt(i);
            }
            return output;
        }
        return input;
    };

    Search.wrapWithQuotes = function(input) {
        if(typeof input === "string" && input.includes(" "))
            return {value: '"'+input+'"', wrapped: true};
        else
            return {value: input, wrapped: false};
    };

    Search.queryByCaseStringId = function(caseStringId, searchType) {
        if(searchType === Search.SEARCH_CASES)
            return Search.simpleOperatorQuery("stringId", caseStringId, "");
        if(searchType === Search.SEARCH_TASKS)
            return Search.simpleOperatorQuery("caseId", caseStringId, "");
        console.error("unknown search type '"+searchType+"'");
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
                    if(immediateData.type !== "dateTime") // TODO remove after dateTime is supported
                        this.addNameToIdMapping("dataset", immediateData.title, immediateData.stringId, net.id, immediateData.type);
                }, this);

                let typeCollision = true;
                while(typeCollision) {
                    typeCollision = false;
                    let mixedTypesMap = this.categories[Search.SEARCH_CASES].dataset.autocompleteItems;
                    this.categories[Search.SEARCH_CASES].dataset.autocompleteItems = new Map();
                    mixedTypesMap.forEach(function (value, key) {
                        let type = value[0].inputType;
                        let i;
                        for(i = 1; i < value.length; i++) {
                            if(value[i].inputType !== type)
                                break;
                        }
                        if(i === value.length) {
                            if(!this.categories[Search.SEARCH_CASES].dataset.autocompleteItems.has(key))
                                this.categories[Search.SEARCH_CASES].dataset.autocompleteItems.set(key, value);
                            else {
                                typeCollision = true;
                                value.forEach(function (autocompleteItem) {
                                    this.addNameToIdMapping("dataset", key, autocompleteItem.id, autocompleteItem.netId, autocompleteItem.inputType);
                                }, this);
                            }
                        }
                        else {
                            typeCollision = true;
                            value.forEach(function (autocompleteItem) {
                                this.addNameToIdMapping("dataset", key+" ["+autocompleteItem.inputType+"]", autocompleteItem.id, autocompleteItem.netId, autocompleteItem.inputType); // TODO i18n
                            }, this);
                        }
                    }, this);
                }
            }
        }, this);
    };

    Search.prototype.addNameToIdMapping = function(categoryName, name, id, netId, inputType) {
        if(this.categories[this.searchType][categoryName].autocompleteItems.has(name))
            this.categories[this.searchType][categoryName].autocompleteItems.get(name).push(new AutocompleteItem(id, netId, inputType));
        else
            this.categories[this.searchType][categoryName].autocompleteItems.set(name, [new AutocompleteItem(id, netId, inputType)]);
    };

    Search.prototype.fillVariableAllNets = function() {
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
        if(this.chips.committed.length > 0) {
            this.chips.committed.forEach(function (chip) {
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
            if( typeof this.searchArguments[Search.COMPLEX_GUI][argIndex] === "undefined" || this.searchArguments[Search.COMPLEX_GUI][argIndex].toString().length === 0)
                return false;
        }
        return true;
    };

    Search.prototype.removableChipsExist = function() {
        return this.chipParts.committed.length === 0 && this.chips.committed.filter(chip => chip.canRemove).length === 0;
    };

    Search.prototype.commitChipPart = function () {
        this._predictChipPart();
        if(this.chipParts.predicted) {
            this.chipParts.committed.push(this.chipParts.predicted);
            this.resetInputFields();
            this.chipParts.predicted = undefined;
        }
    };

    Search.prototype.resetInputFields = function () {
        this.searchCategory = undefined;
        this.clearDatafieldInput();
        this.clearHeaderInput();
    };

    Search.prototype.clearDatafieldInput = function() {
        this.searchDatafield = undefined;
        this.clearOperatorInput();
    };

    Search.prototype.clearOperatorInput = function() {
        this.searchOperator = undefined;
        this.clearArgumentsInput();
    };

    Search.prototype.clearArgumentsInput = function() {
        this.searchArguments[Search.COMPLEX_GUI].splice(0, this.searchArguments[Search.COMPLEX_GUI].length);
        this.searchObjects[Search.COMPLEX_GUI].splice(0, this.searchObjects[Search.COMPLEX_GUI].length);
    };

    Search.prototype.clearHeaderInput = function() {
        this.searchArguments[Search.HEADER_GUI].splice(0, this.searchArguments[Search.HEADER_GUI].length);
        this.searchObjects[Search.HEADER_GUI].splice(0, this.searchObjects[Search.HEADER_GUI].length);
    };

    Search.prototype.clearFilter = function() {
        this.chipParts.committed.splice(0, this.chipParts.committed.length);
        this.chipParts.predicted = undefined;
        this.chips.committed = this.chips.committed.filter(chip => !chip.canRemove);
        this.chips.predicted = undefined;
    };

    Search.prototype.commitChip = function () {
        this.commitChipPart();
        this._predictChip();
        if(this.chips.predicted) {
            this.chips.committed.push(this.chips.predicted);
            this.chipParts.committed.splice(0, this.chipParts.committed.length);
            this.chips.predicted = undefined;
        }
    };

    Search.prototype.buildSearchQuery = function (chips) {
        let queries = [];
        chips.forEach(function (chip) {
            queries.push(chip.query);
        });
        console.log(Search.bindQueries(queries, "AND")); // TODO remove after development
        return Search.bindQueries(queries, "AND");
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

    Search.prototype.getFilter = function() {
        let combinedChips;

        if(this.guiComplexity === Search.COMPLEX_GUI || this.guiComplexity === Search.COMBINED_GUI) {
            this._predictChip();
            if(this.chips.predicted)
                combinedChips = [].concat(this.chips.committed, [this.chips.predicted]);
            else
                combinedChips = this.chips.committed;
        }
        if(this.guiComplexity === Search.HEADER_GUI || this.guiComplexity === Search.COMBINED_GUI) {
            combinedChips = combinedChips.concat(this.createChipsFromHeaderInput());
        }

        if(this.possibleNets.size < this.allNets.size && !this.containsProcessQuery(combinedChips)) {
            let netQueries = [];
            this.possibleNets.forEach(function (netId) {
                netQueries.push(Search.OPERATOR.EQUAL.createQuery(this.categories[Search.SEARCH_CASES].process.getElasticKeyword(), [netId]));
            }, this);
            combinedChips = combinedChips.concat([Chip.createChip("", Search.bindQueries(netQueries, "OR"))]);
        }

        return new Filter("", this.searchType, this.buildSearchQuery(combinedChips), undefined, this.parent, combinedChips);
    };

    Search.prototype.populateFromFilter = function (filter) {
        if( !filter.query)
            return;

        this.resetInputFields();
        this.chips.committed.splice(0, this.chips.committed.length);

        let filterChip = Chip.createChip(filter.title, filter.query);
        filterChip.canRemove = false;
        this.chips.committed.push(filterChip);
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

    Search.prototype._predictChipPart = function () {
        if(this.allArgumentsFilled()) {
            let possibleNets = [];
            switch (this.searchCategory.name) {
                case "Process":
                case "Task":
                case "Role":
                    this.searchCategory.autocompleteItems.get(this.searchArguments[Search.COMPLEX_GUI][0]).forEach(function (autocompleteItem) {
                        possibleNets.push(autocompleteItem.netId);
                    });
                    this.chipParts.predicted = new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments[Search.COMPLEX_GUI], Search.COMPLEX_GUI, possibleNets);
                    break;
                case "Dataset":
                    this.searchCategory.autocompleteItems.get(this.searchDatafield).forEach(function (autocompleteItem) {
                        possibleNets.push(autocompleteItem.netId);
                    });
                    this.chipParts.predicted = new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments[Search.COMPLEX_GUI], Search.COMPLEX_GUI, possibleNets);
                    break;
                default:
                    this.chipParts.predicted = new ChipPart(this.searchCategory, this.searchOperator, this.searchArguments[Search.COMPLEX_GUI], Search.COMPLEX_GUI);
                    break;
            }
        }
        else
            this.chipParts.predicted = undefined;
    };

    Search.prototype._predictChip = function () {
        this._predictChipPart();
        let combinedChipParts;
        if(this.chipParts.predicted)
            combinedChipParts = [].concat(this.chipParts.committed, [this.chipParts.predicted]);
        else
            combinedChipParts = this.chipParts.committed;

        if(combinedChipParts.length > 0)
            this.chips.predicted = new Chip(combinedChipParts, "OR");
        else
            this.chips.predicted = undefined;
    };

    Search.prototype.formatDateArguments = function(arguments) {
        let formattedArguments = [];
        arguments.forEach(function (arg) {
            formattedArguments.push(arg.toLocaleDateString(this.$i18n.current(), {year:"numeric", month:"numeric", day:"numeric"}));
        }, this);
        return formattedArguments;
    };

    Search.prototype.setHeaderInputMetadata = function () {
        this.headerSearchFieldsMetadata.splice(0, this.headerSearchFieldsMetadata.length);
        if(this.parent.headers) {
            for(const key of Object.keys(this.parent.headers.selected)) {
                let headerItem = this.parent.headers.selected[key];
                if(headerItem) {
                    if(headerItem.stringId.startsWith("meta-")) {
                        for(const category of Object.keys(this.categories[this.searchType])) {
                            if(headerItem.stringId === this.categories[this.searchType][category].headerName) {
                                this.headerSearchFieldsMetadata.push(
                                    new HeaderSearchMetadata(
                                        this.categories[this.searchType][category].getElasticKeyword(),
                                        this.categories[this.searchType][category].argsInputType && this.categories[this.searchType][category].argsInputType(),
                                        this.categories[this.searchType][category].allowedOperators
                                    )
                                );
                                break;
                            }
                        }
                    }
                    else {
                        for(let datafield of this.categories[this.searchType].dataset.autocompleteItems.get(headerItem.title)) {
                            if(headerItem.stringId === datafield.id) {
                                this.headerSearchFieldsMetadata.push(
                                    new HeaderSearchMetadata(
                                        [this.categories[this.searchType].dataset.fullKeywordFromId(datafield.id)],
                                        datafield.inputType,
                                        this.categories[this.searchType].dataset.allowedOperators
                                    )
                                );
                                break;
                            }
                        }
                    }
                }
            }
        }
    };

    Search.prototype.createChipsFromHeaderInput = function () {
        let fakeChipParts = [];

        for(let i = 0; i < this.headerSearchFieldsMetadata.length; i++) {
            let operator = Search.OPERATOR.EQUAL;
            if(this.headerSearchFieldsMetadata[i].allowedOperators(this.headerSearchFieldsMetadata[i].inputType).includes(Search.OPERATOR.LIKE))
                operator = Search.OPERATOR.LIKE;
            if(this.headerSearchFieldsMetadata[i].inputType==="date")
                operator = Search.OPERATOR.EQUAL_DATE;

            if(this.searchArguments[Search.HEADER_GUI][i]) {
                fakeChipParts.push(Chip.createChip("", operator.createQuery(this.headerSearchFieldsMetadata[i].elasticKeyword, [this.searchArguments[Search.HEADER_GUI][i]])));
            }
        }

        if(fakeChipParts.length > 0)
            return [new Chip(fakeChipParts, "AND")];
        else
            return [];
    };

    Search.prototype.containsProcessQuery = function(chips) {
        for(let i = 0; i < chips.length; i++) {
            if(chips[0].query.includes(this.categories[Search.SEARCH_CASES].process.getElasticKeyword()+":"))
                return true;
        }
        return false;
    };


    function ChipPart(category, operator, arguments, inputGui, possibleNets = undefined) {
        let escapedArguments = [];
        arguments.forEach(function (argument) {
            escapedArguments.push(Search.escapeInput(argument));
        });

        this.text = this.createElementaryText(category, operator, escapedArguments);
        this.query = this.createElementaryQuery(category, operator, inputGui);
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

    ChipPart.prototype.createElementaryQuery = function (category, operator, inputGui) {
        if(category.overrideQueryGeneration)
            return category.overrideQueryGeneration(operator);

        if(category.argsInputType && category.argsInputType() === "date")
            return operator.createQuery(category.getElasticKeyword(), category.getQueryArguments(inputGui), Search.OPERATOR.EQUAL_DATE);
        else
            return operator.createQuery(category.getElasticKeyword(), category.getQueryArguments(inputGui), Search.OPERATOR.EQUAL);
    };
    
    ChipPart.prototype.createElementaryText = function (category, operator) {
        return category.getTextPrefix()+" "+operator.createText(category.getFormattedArguments());
    };


    function Chip(chipParts, booleanOperator) {
        this.text = this.createElementaryText(chipParts);
        this.chipParts = chipParts.slice(0);
        let queries = [];
        this.chipParts.forEach(function (chipPart) {
            queries.push(chipPart.query);
        });
        this.query = Search.bindQueries(queries, booleanOperator);
        this.canRemove = true;
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


    function HeaderSearchMetadata(elasticKeyword, inputType, allowedOperators) {
        this.elasticKeyword = elasticKeyword;
        this.inputType = inputType;
        this.allowedOperators = allowedOperators;
    }

    return Search;
});