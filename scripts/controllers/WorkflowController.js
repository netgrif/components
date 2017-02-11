/**
 * Created by Milan on 11.2.2017.
 */
define(['angular','../modules/Workflow', '../services/FileUpload'],function (angular) {
    angular.module('ngWorkflow').controller('WorkflowController',
        ['$log','$scope', '$rootScope','$fileUpload',
        function ($log, $scope, $rootScope, $fileUpload) {
            var self = this;

            self.petriNetMeta = {};


            self.uploadPetriNet = function () {
                var file = $rootScope.mFile;
                //console.dir(file);
                var meta = jQuery.isEmptyObject(self.petriNetMeta) ? undefined : JSON.stringify(self.petriNetMeta);
                $fileUpload.upload(file,meta,"/petrinet", function (response) {

                });
            }
    }]);
});