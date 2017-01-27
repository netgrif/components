/**
 * Created by Milan on 27.1.2017.
 */
define(['angular','../modules/Main'], function (angular) {
    angular.module('ngMain').controller('ContentRoutingController',
    ['$log','$scope','contentRouter', function ($log, $scope, contentRouter) {
        var self = this;

        self.isLoading = true;

        self.templateLoaded = function mainTemplateLoaded() {
            $log.debug("Main template loaded!");
            contentRouter.mainLoaded(allModulesLoaded);
        };

        function allModulesLoaded() {
            $log.debug("All modules loaded!");
            self.isLoading = false;
        }



    }]);
});
