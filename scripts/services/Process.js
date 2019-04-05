define(['angular', '../classes/Transaction', '../modules/Main'], function (angular, Transaction) {
    angular.module('ngMain').factory('$process', function ($q, $log, $http, $config) {
        function Net(id, identifier, resource, links) {
            this.id = id;
            this.identifier = identifier;
            this.links = links;

            Object.assign(this, resource);

            this.transitions = [];
            this.transactions = [];
            this.roles = [];
        }

        Net.prototype.loadTransitions = function () {
            const self = this;
            return $http.get($config.getApiUrl("/petrinet/transitions"), {params: {ids: [self.id]}}).then(response => {
                return response.$request().$get("transitionReferences").then(resources => {
                    self.transitions = resources.map(r => {
                        return {id: r.stringId, title: r.title, netId: r.petriNetId}
                    });
                    // console.log("Transitions of " + self.title + " has been loaded");
                    return self.transitions;
                }, () => {
                    console.log("References for transitions of net " + self.title + " were not found!");
                    return [];
                });
            }, error => {
                console.error("References for transitions of net " + self.title + " were not found!");
                console.log(error);
                return [];
            });
        };

        Net.prototype.loadTransactions = function () {
            const self = this;
            return $http.get($config.getApiUrl({
                url: "/petrinet/{id}/transactions",
                params: {id: self.id}
            })).then(response => {
                return response.$request().$get("transactions").then(resources => {
                    self.transactions = resources.map(r => new Transaction(r, {}));
                    // console.log("Transactions of " + self.title + " has been loaded");
                    return self.transactions;
                }, () => {
                    console.log("References for transactions of net " + self.title + " were not found!");
                    return [];
                });
            }, error => {
                console.error("Reference for transactions of net " + self.title + " failed to load!");
                console.log(error);
                return [];
            });
        };

        Net.prototype.loadRoles = function () {
            const self = this;
            return $http.get($config.getApiUrl({url: "/petrinet/{id}/roles", params: {id: self.id}})).then(response => {
                return response.$request().$get("processRoles").then(resources => {
                    self.roles = resources.map(r => {
                        return {id: r.stringId, name: r.name, desc: r.description}
                    });
                    return self.roles;
                }, () => {
                    console.log("Roles reference resources of net " + self.title + " were not found!");
                    return [];
                });
            }, error => {
                console.error("Roles reference of net " + self.title + "failed to load!");
                console.log(error);
                return [];
            });
        };

        Net.prototype.loadAll = function () {
            const self = this;
            return $q.all([this.loadTransitions(), this.loadTransactions(), this.loadRoles()]).then(() => {
                console.log("Loaded transitions and transactions for net " + self.title);
                return true;
            });
        };

        Net.prototype.transition = function (title) {
            return this.transitions.find(t => t.title === title);
        };

        Net.prototype.role = function (name) {
            return this.roles.find(r => r.name === name);
        };

        const process = {
            nets: [],

            init: function () {
                return process.loadNets();
            },

            get: function (identifier) {
                return process.nets.find(n => n.identifier === identifier || n.id === identifier);
            },

            /**
             * Complete load of all processes, transitions, transactions, and roles.
             * All load functions are asynchronous and promise is returned for every load function.
             * @param {boolean} [force] - force reload of all process and it's parts
             * @returns {Promise | Array} - promise that is resolved when all process are done loading
             */
            loadNets: function (force = false) {
                if (!force && process.nets.length > 0) {
                    const deferred = $q.defer();
                    deferred.resolve(true);
                    return deferred.promise;
                }

                return $http.get($config.getApiUrl("/petrinet"), {params: {version: "^"}}).then(response => {
                    return response.$request().$get("petriNetReferences").then(resources => {
                        process.nets = resources.map(r => new Net(r.stringId, r.identifier, r));
                        const loaders = [];
                        if (process.nets.length > 0) {
                            process.nets.forEach(n => {
                                loaders.push(n.loadTransitions());
                                loaders.push(n.loadTransactions());
                                loaders.push(n.loadRoles());
                            })
                        }
                        return $q.all(loaders);

                    }, () => {
                        console.log("Failed to parse Petri net resources");
                        return [];
                    });
                }, error => {
                    console.error("Failed to load Petri nets");
                    console.log(error);
                    return [];
                });
            }
        };

        return process;
    });
});
