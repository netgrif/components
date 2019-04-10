define(['angular', '../classes/Filter', '../modules/Main', '../services/Loading', '../services/Auth', '../services/ConfigService'], function (angular, Filter) {
    angular.module('ngMain').controller('MainController', ['$loading', '$auth', '$log', '$scope', '$user', '$i18n', '$cache', '$location', '$mdSidenav', '$rootScope', '$http', '$config', '$filterRepository', '$q',
        function ($loading, $auth, $log, $scope, $user, $i18n, $cache, $location, $mdSidenav, $rootScope, $http, $config, $filterRepository, $q) {
            const self = this;

            self.loaderVisible = true;
            self.counterFilters = [];
            self.counters = {};

            const loaderContainer = angular.element("div#loader-container");
            const viewContainer = angular.element("div#view-container");
            let dataLoadingStarted = false;

            $loading.setMainControllerCallback(setShowingLoading);
            viewContainer.hide();

            self.startLoadingData = function loadData() {
                if (dataLoadingStarted) return;
                dataLoadingStarted = true;
                //load necessary data on beginning
                $log.debug("Data loaded");
                $log.debug($user);
                $loading.showLoading(false);
            };

            self.logout = function () {
                $auth.logout();
            };

            self.createCase = function (type) {
                if ($location.path().includes(type)) {
                    $rootScope.$emit("caseCreate", type);
                } else {
                    const o = {};
                    o[type] = true;
                    $cache.put("create", o);
                    $location.path("/" + type);
                }
            };

            function setShowingLoading(show) {
                self.loaderVisible = show;
                if (show) {
                    viewContainer.hide();
                    loaderContainer.show();
                } else {
                    loaderContainer.hide();
                    viewContainer.show();
                }
            }

            self.toggleSidenav = function (componentId) {
                $mdSidenav(componentId).toggle();
            };

            self.closeSidenav = function (componentId) {
                $mdSidenav(componentId).close();
            };

            self.navigationClick = function (navigationItem) {
                $rootScope.$emit("navClick", {
                    item: navigationItem
                });
                self.reloadCounters();
            };

            function formatCounter(value) {
                if (value > 9999)
                    return "9999+";
                else
                    return "" + value;
            }

            self.reloadCounters = function () {
                if (!self.counterFilters || self.counterFilters.length === 0)
                    return;
                self.counterFilters.forEach(counter => {
                    const filter = $filterRepository.get(counter);
                    if (!filter || !filter.query)
                        return;
                    const request = {
                        method: "POST",
                        url: $config.getApiUrl(filter.type === Filter.CASE_TYPE ? "/workflow/case/count" : "/task/count"),
                        data: JSON.parse(filter.query)
                    };
                    $http(request).then(response => {
                        if (response && response.data) {
                            self.setCounter(counter, response.data.count)
                        }
                    });
                });
            };

            self.setCounter = function (counter, count) {
                if (!self.counters[counter]) {
                    self.counters[counter] = {
                        count: 0,
                        display: ""
                    };
                }
                self.counters[counter].count = count ? count : 0;
                self.counters[counter].display = formatCounter(self.counters[counter].count);
            };

            self.counterFilters = Object.entries($config.show).filter(attrs => attrs[1].countBadge).map(attrs => attrs[0]);
            self.reloadCounters();

            const tabContentLoadListener = $rootScope.$on('tabContentLoad', (event, data) => {
                if (data.reloadAll)
                    self.reloadCounters();
                // self.setCounter(data.viewId, data.count);
            });

            const reloadCountersListener = $rootScope.$on("reloadCounters", (event) => {
                self.reloadCounters();
            });

            $scope.$on('$destroy', tabContentLoadListener);
            $scope.$on('$destroy', reloadCountersListener);

        }]);
});