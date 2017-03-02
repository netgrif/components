/**
 * Created by martin on 25.2.2017.
 */
define(['angular','angularCharts','../modules/Roles','../modules/Main'],
    function (angular) {
        angular.module('ngRoles').controller('RolesController',
            ['$log','$scope','$timeout',
                function ($log, $scope, $timeout) {
                    var self = this;


                    self.loadPetriNets = function () {
                        $http.get("/res/petrinet/refs").then(function (response) {
                            $log.debug(response);
                            $log.debug(response.$request());
                            response.$request().$get("petriNetReferences").then(function (resource) {
                                self.petriNetRefs = resource;
                            });
                        }, function () {
                            $log.debug("Petri net refs get failed!");
                        });
                    };




                }]);
    });