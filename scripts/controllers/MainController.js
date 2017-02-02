/**
 * Created by Milan on 31.1.2017.
 */
define(['angular','../modules/Main','../services/Loading'],function (angular) {
    angular.module('ngMain').controller('MainController',['$loading','$log', '$scope',
    function ($loading, $log, $scope) {
        var self = this;

        $scope.showLoading = true;

        var dataLoadingStarted = false;

        $loading.setMainControllerCallback(setLoading);
       // $loading.registerLoadWatcher("/", loadData);

        self.startLoadingData = loadData;
        function loadData() {
            if(dataLoadingStarted) return;
            dataLoadingStarted = true;
            //load necessary data on beginning
            $log.debug("Data loaded");
            if($scope.showLoading){
                $loading.showLoading(false);
                //TODO resolve angular error
                //TEMP solution - very bad!!!!
                angular.element(".loading-container").hide();
            }

        }

        function setLoading(show) {
            $scope.showLoading = show;
        }


    }]);
});
