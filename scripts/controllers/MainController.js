/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','../modules/Main','../services/Loading'],function (angular) {
    angular.module('ngMain').controller('MainController',['$loading','$log',
    function ($loading, $log) {
        var self = this;

        self.showLoading = true;

        var dataLoadingStarted = false;

        $loading.setMainControllerCallback(setLoading);
       // $loading.registerLoadWatcher("/", loadData);

        self.startLoadingData = loadData;
        function loadData() {
            if(dataLoadingStarted) return;
            dataLoadingStarted = true;
            //load necessary data on beginning
            $log.debug("Data loaded");
            self.showLoading = false;
        }


        function setLoading(show) {
            self.showLoading = show;
        }


    }]);
});
