/**
 * Created by Milan on 11.2.2017.
 */
define(['angular','../modules/Workflow'],function (angular) {
    angular.module('ngWorkflow').directive('fileModel',['$parse','$rootScope',
    function ($parse, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change',function () {
                    $rootScope.$apply(function () {
                        modelSetter($rootScope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
});
