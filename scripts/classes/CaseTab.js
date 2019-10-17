define(['./Tab', './Case', './Filter', './Search'], function (Tab, Case, Filter, Search) {
    /**
     * Constructor for CaseTab class
     * Angular dependencies: $http, $dialog, $snackbar, $user, $fileUpload, $timeout, $i18n, $process, $config
     * @param {String} label
     * @param {Object} controller
     * @param {Filter} baseFilter
     * @param {Object} angular
     * @param {Object} config - authorityToCreate(string), allowedNets(array of Net objects)
     * @constructor
     */
    function CaseTab(label, controller, baseFilter, angular, config = {}) {
        Tab.call(this, 0, label);

        this.controller = controller;
        this.authorityToCreate = "ROLE_USER";
        this.allowedNets = [];
        Object.assign(this, angular, config);

        this.cases = [];
        this.newCase = {
            title: this.$i18n.block.case.newTitle
        };

        this.activeFilter = baseFilter;
        this.createDialogTitle = this.allowedNets.length === 1 ? (!this.allowedNets[0].defaultCaseName ? label : this.allowedNets[0].defaultCaseName) : label;

        this.headers = {
            sortItem: undefined,
            mode: CaseTab.HEADER_MODE_SORT,
            lastMode: CaseTab.HEADER_MODE_SORT,
            metaData: [],
            processData: [],
            selected: {
                column0: undefined,
                column1: undefined,
                column2: undefined,
                column3: undefined,
                column4: undefined
            },
            changeMode: function (newMode, saveLastMode = true) {
                if(saveLastMode)
                    this.lastMode = this.mode;
                this.mode = newMode;
            }
        };
        this.buildHeaders();

        this.caseSearch = new Search(this, Search.SEARCH_CASES, Search.HEADER_GUI, {
            $process: this.$process,
            $http: this.$http,
            $config: this.$config,
            $i18n: this.$i18n,
            $timeout: this.$timeout
        }, {});

        this.constants = {
            HEADER_MODE_EDIT: CaseTab.HEADER_MODE_EDIT,
            HEADER_MODE_SORT: CaseTab.HEADER_MODE_SORT,
            HEADER_MODE_SEARCH: CaseTab.HEADER_MODE_SEARCH,

            HEADERS_SORT_DIR_ASC: CaseTab.HEADERS_SORT_DIR_ASC
        };
    }

    CaseTab.prototype = Object.create(Tab.prototype);
    CaseTab.prototype.constructor = CaseTab;

    CaseTab.URL_SEARCH = "/workflow/case/search";

    CaseTab.HEADERS_PREFERENCE_KEY = "caseHeaders";
    CaseTab.HEADERS_SORT_DIR_ASC = "asc";
    CaseTab.HEADERS_SORT_DIR_DESC = "desc";

    CaseTab.HEADER_MODE_EDIT = "edit";
    CaseTab.HEADER_MODE_SORT = "sort";
    CaseTab.HEADER_MODE_SEARCH = "search";

    CaseTab.prototype.activate = function () {
        this.newCase.title = this.getDefaultCaseTitle();

        if (this.cases.length === 0)
            this.load(false);
    };

    function getMetaDataReference(id, title, type) {
        return {
            stringId: "meta-" + id,
            title: title,
            type: type,
            sort: {
                enable: false,
                dir: CaseTab.HEADERS_SORT_DIR_ASC
            }
        };
    }

    CaseTab.prototype.buildHeaders = function () {
        this.headers.metaData = [
            getMetaDataReference("title", this.$i18n.block.case.header.title, "text"),
            getMetaDataReference("creationDate", this.$i18n.block.case.header.createDate, "date"),
            getMetaDataReference("author", this.$i18n.block.case.header.author, "user"),
            getMetaDataReference("visualId", this.$i18n.block.case.header.visualID, "text"),
        ];
        this.allowedNets.forEach(net => {
            if (!net.immediateData)
                return;
            this.headers.processData.push({
                title: net.title,
                identifier: net.identifier,
                immediateData: net.immediateData.map(data => {
                    data['process'] = net.identifier;
                    data['sort'] = {
                        enable: false,
                        dir: CaseTab.HEADERS_SORT_DIR_ASC
                    };
                    data['netId'] = net.id;
                    return data;
                })
            })
        });

        if (this.preselectedHeaders) {
            this.preselectedHeaders.forEach((fieldId, index) => {
                if (fieldId.startsWith("meta-")) {
                    this.headers.selected['column' + index] = this.headers.metaData.find(field => field.stringId === fieldId);
                } else {
                    const fieldProcess = fieldId.substring(0, fieldId.indexOf("-"));
                    const process = this.headers.processData.find(process => process.identifier === fieldProcess);
                    if (process) {
                        const fieldStringId = fieldId.substring(fieldId.indexOf("-") + 1);
                        this.headers.selected['column' + index] = process.immediateData.find(field => field.stringId === fieldStringId);
                    }
                }
            });
        }
    };

    CaseTab.prototype.onHeaderChange = function (headerId) {
        this.cases.forEach(useCase => useCase.changeSelectedData(headerId, this.headers.selected[headerId]));
    };

    CaseTab.prototype.saveHeaders = function () {
        let headers = Object.values(this.headers.selected)
            .filter(header => { return !!header })
            .map(header => {
                if (header.process)
                    return header.process + "-" + header.stringId;
                return header.stringId;
            });

        let preferenceKey = this.viewId + "-" + CaseTab.HEADERS_PREFERENCE_KEY;
        let oldPreference = this.$user.getPreferenceCaseHeaders(preferenceKey);

        let searchInputCleared = false;
        if(oldPreference) {
            for(let i = 0; i < headers.length; i++) {
                if(oldPreference[i] && headers[i] !== oldPreference[i]) {
                    this.caseSearch.clearHeaderInput(i);
                    searchInputCleared = true;
                }
            }
        }

        this.$user.savePreferenceCaseHeaders(preferenceKey, headers);
        this.caseSearch.setHeaderInputMetadata();
        if(searchInputCleared)
            this.search();
    };

    CaseTab.prototype.flipDirection = function (dir) {
        if (dir === CaseTab.HEADERS_SORT_DIR_ASC)
            return CaseTab.HEADERS_SORT_DIR_DESC;
        else if (dir === CaseTab.HEADERS_SORT_DIR_DESC)
            return CaseTab.HEADERS_SORT_DIR_ASC;
        return dir;
    };

    CaseTab.prototype.changeSorting = function (header) {
        if(!header)
            return;

        this.headers.sortItem = header;
        if (header.sort.enable) {
            header.sort.dir = this.flipDirection(header.sort.dir);
            this.search();
        } else {
            Object.values(this.headers.selected).some(h => {
                if (h !== undefined && h.sort.enable) {
                    h.sort.enable = false;
                    return true;
                }
                return false;
            });
            header.sort.enable = true;
            this.search();
        }
    };

    CaseTab.prototype.getSortParam = function () {
        const sortHeader = Object.values(this.headers.selected).find(h => {
            if (!h) return false;
            return h.sort.enable;
        });
        if (!sortHeader)
            return "stringId,desc";

        const fieldId = sortHeader.stringId.substring(sortHeader.stringId.indexOf("-") + 1);
        if (sortHeader.stringId.startsWith("meta-")) {
            if (fieldId === "creationDate")
                return "creationDateSortable," + sortHeader.sort.dir;
            if (fieldId === "title")
                return "titleSortable," + sortHeader.sort.dir;
            return fieldId + "," + sortHeader.sort.dir;
        } else {
            return "dataSet." + fieldId + ".sortable," + sortHeader.sort.dir;
        }
    };

    CaseTab.prototype.buildSearchRequest = function (next) {
        const request = {
            method: "POST",
            url: next && this.page.next ? this.page.next : this.$config.getApiUrl(CaseTab.URL_SEARCH),
            data: {}
        };
        if(this.activeFilter.query.length > 0)
            request.data.query = this.activeFilter.query;

        if (!next) {
            request.params = {
                sort: this.getSortParam()
            }
        }

        return request;
    };

    CaseTab.prototype.search = function () {
        if (this.cases.length === 0)
            this.cases.splice(0, this.cases.length);
        this.activeFilter = this.caseSearch.getFilter();
        this.load(false);
    };

    CaseTab.prototype.load = function (next) {
        if (this.loading || !this.activeFilter) return;
        if (next && this.page.totalElements === this.cases.length) return;

        const self = this;
        const config = this.buildSearchRequest(next);

        self.loading = true;
        this.$http(config).then(function (response) {
            self.page = Object.assign(self.page, response.page);
            if (self.page.totalElements === 0) {
                self.$snackbar.info(self.$i18n.block.snackbar.noCases);
                self.cases.splice(0, self.cases.length);
                self.loading = false;
                self.emitNumberOfCases();
                return;
            }
            const rawData = response.$response().data._embedded.cases;
            response.$request().$get("cases").then(function (resources) {
                if (self.page.totalPages !== 1) {
                    self.page.last = response.$href("last");
                    if (config.url !== self.page.last)
                        self.page.next = response.$href("next");
                }
                self.parseCase(resources, rawData, next);
                self.loading = false;
                self.emitNumberOfCases();
            }, function () {
                self.$snackbar.error(self.$i18n.block.snackbar.noResourceForCasesFound);
                self.page.last = undefined;
                self.page.next = undefined;
                self.cases.splice(0, self.cases.length);
                self.loading = false;
                self.emitNumberOfCases();
            });
        }, function () {
            self.$snackbar.error(self.$i18n.block.snackbar.gettingCasesFailed);
            self.loading = false;
        })
    };

    CaseTab.prototype.parseCase = function (resources, rawData, next) {
        const cases = [];

        resources.forEach((r, i) => cases.push(new Case(this, null, r, rawData[i]._links, {
            $http: this.$http,
            $dialog: this.$dialog,
            $snackbar: this.$snackbar,
            $user: this.$user,
            $fileUpload: this.$fileUpload,
            $i18n: this.$i18n,
            $config: this.$config
        }, {
            caseDelete: this.caseDelete,
            preselectedData: Object.values(this.headers.selected)
        })));

        if (next) cases.forEach(useCase => this.cases.push(useCase));
        else this.cases = cases;
    };

    CaseTab.prototype.emitNumberOfCases = function () {
        if (!this.$rootScope)
            return;
        this.$rootScope.$emit('tabContentLoad', {
            count: this.page.totalElements,
            viewId: this.viewId,
            reloadAll: true
        });
    };

    CaseTab.prototype.openCase = function (useCase) {
        this.controller.openTaskTab(useCase);
    };

    CaseTab.prototype.closeCase = function (useCase) {
        this.controller.closeTab(useCase.stringId);
    };

    CaseTab.prototype.openNewCaseDialog = function (title) {
        if (this.allowedNets.length === 0) {
            this.$snackbar.warning(this.$i18n.block.snackbar.noRequiredNetUploaded);
            return;
        }

        this.$dialog.showByTemplate('create_case', this, {title: this.createDialogTitle, onOpenAutoFocus: true});
    };

    CaseTab.prototype.getDefaultCaseTitle = function () {
        return this.allowedNets.length > 0 && this.allowedNets[0].defaultCaseName ? this.allowedNets[0].defaultCaseName : this.$i18n.block.case.newTitle;
    };

    CaseTab.prototype.changeNewCaseTitle = function () {
        this.newCase.title = this.allowedNets.find(net => net.id === this.newCase.netId).defaultCaseName;
        if (!this.newCase.title)
            this.newCase.title = this.getDefaultCaseTitle();
    };

    /**
     * Check if all the space in md-content is taken by md-tab (if inview is not in view) and load next page if needed
     */
    CaseTab.prototype.checkSize = function() {
        let self = this;
        if (self.page.next) {
            this.$timeout(() => {
                let tab = angular.element("md-tabs")[0].offsetHeight;
                let content = angular.element("md-content")[0].offsetHeight;
                if (content / tab > 0.9) {
                    self.load(true);
                }
            }, 0);
        }
    };

    CaseTab.prototype.createCase = function () {
        if (this.allowedNets.length === 0 || jQuery.isEmptyObject(this.newCase)) {
            this.$dialog.closeCurrent();
            return;
        }

        const self = this;
        if (this.allowedNets.length === 1)
            this.newCase.netId = this.allowedNets[0].id;
        if (!this.newCase.netId) {
            this.$dialog.closeCurrent();
            return;
        }

        this.$http.post(this.$config.getApiUrl("/workflow/case"), JSON.stringify(this.newCase))
            .then(function (response) {
                if (response) {
                    self.$dialog.closeCurrent();
                    self.newCase = {
                        title: self.getDefaultCaseTitle()
                    };

                    self.openCase(new Case(self, null, response, null, {
                        $http: self.$http,
                        $dialog: self.$dialog,
                        $snackbar: self.$snackbar,
                        $user: self.$user,
                        $fileUpload: self.$fileUpload,
                        $i18n: self.$i18n,
                        $config: self.$config
                    }));
                    self.cases.splice(0, self.cases.length);
                    self.page = {};
                }
            }, function () {
                self.$snackbar.error(self.$i18n.block.snackbar.creatingNewCaseFailed);
                self.newCase = {
                    title: self.getDefaultCaseTitle()
                };
                $process.init().then(() => self.allowedNets = $process.nets);
            });
    };

    CaseTab.prototype.delete = function (useCase) {
        this.cases.splice(this.cases.indexOf(useCase), 1);
    };

    return CaseTab;
});

