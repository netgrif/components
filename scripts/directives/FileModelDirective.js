
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').directive('fileModel',['$parse',
        function ($parse) {
            return {
                restrict: 'A',
                scope: {
                    fileModel:"@",
                    fileChangeCallback:"@",
                    fileChangeArg:"@"
                },
                link: function(scope, element, attrs){
                    element.bind('change',function () {
                        scope.$parent.$apply(function () {
                            $parse(scope.fileModel).assign(scope.$parent, element[0].files[0]);
                            $parse(scope.fileChangeCallback)(scope.$parent)($parse(scope.fileChangeArg)(scope.$parent));
                        });
                    });
                }
            };
        }]);
});
