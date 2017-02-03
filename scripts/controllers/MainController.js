/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','../modules/Main','../services/Loading'],function (angular) {
    angular.module('ngMain').controller('MainController',['$loading','$log', '$scope',
    function ($loading, $log, $scope) {
        var self = this;

        self.loaderVisible = true;

        var loaderContainer = angular.element("div#loader-container");
        var viewContainer = angular.element("div#view-container");
        var dataLoadingStarted = false;

        $loading.setMainControllerCallback(setShowingLoading);
       // $loading.registerLoadWatcher("/", loadData);
        viewContainer.hide();

        self.startLoadingData = loadData;
        function loadData() {
            if(dataLoadingStarted) return;
            dataLoadingStarted = true;
            //load necessary data on beginning
            $log.debug("Data loaded");
            $loading.showLoading(false);

        }

        function setShowingLoading(show) {
            self.loaderVisible = show;
            if(show){
                viewContainer.hide();
                loaderContainer.show();
            } else {
                loaderContainer.hide();
                viewContainer.show();
            }
        }


    }]);
});
