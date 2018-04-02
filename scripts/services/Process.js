define(['angular', '../classes/Transaction', '../modules/Main'], function (angular, Transaction) {
    angular.module('ngMain').factory('$process', function ($q, $log, $http) {
        function Net(id, title) {
            this.id = id;
            this.title = title;

            this.transitions = [];
            this.transactions = [];
        }

        Net.prototype.loadTransitions = function () {
            const self = this;
            return $http.post("/res/petrinet/transition/refs", [this.id]).then(response => {
                return response.$request().$get("transitionReferences").then(resources => {
                    self.transitions = resources.map(r => {
                        return {id: r.entityId, title: r.title, netId: r.petriNetId}
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
            return $http.get("/res/petrinet/" + self.id + "/transactions").then(response => {
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

        Net.prototype.loadAll = function () {
            const self = this;
            return $q.all([this.loadTransitions(), this.loadTransactions()]).then(() => {
                console.log("Loaded transitions and transactions for net " + self.title);
                return true;
            });
        };

        Net.prototype.transition = function (title) {
            return this.transitions.find(t => t.title === title);
        };

        const process = {
            nets: [],

            init: function () {
                return process.loadNets();
            },

            get: function (title) {
                return process.nets.find(n => n.title === title);
            },

            loadNets: function () {
                if (process.nets.length > 0) {
                    const deferred = $q.defer();
                    deferred.resolve(true);
                    return deferred.promise;
                }

                return $http.get("/res/petrinet/refs").then(response => {
                    return response.$request().$get("petriNetReferences").then(resources => {
                        process.nets = resources.map(r => new Net(r.entityId, r.title));
                        const loaders = [];
                        if (process.nets.length > 0) {
                            process.nets.forEach(n => {
                                loaders.push(n.loadTransitions());
                                loaders.push(n.loadTransactions());
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
