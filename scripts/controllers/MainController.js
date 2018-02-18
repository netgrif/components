define(['angular', '../modules/Main', '../services/Loading', '../services/Auth'], function (angular) {
    angular.module('ngMain').controller('MainController', ['$loading', '$auth', '$log', '$scope', '$style', '$user', '$i18n', '$cache', '$location', '$mdSidenav', '$rootScope',
        function ($loading, $auth, $log, $scope, $style, $user, $i18n, $cache, $location, $mdSidenav, $rootScope) {
            const self = this;

            self.loaderVisible = true;

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
                $style.mainView();
                $loading.showLoading(false);

            };

            self.logout = function () {
                $auth.logout();
            };

            self.createCase = function (type) {
                if($location.path().includes(type)){
                    $rootScope.$emit("caseCreate",type);
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
            }

        }]);
});
