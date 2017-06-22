
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').directive('fileModel',['$parse',
    function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var model = $parse(attrs.fileModel);
                var callback = $parse(attrs.fileChangeCallback);
                var callbackArg = $parse(attrs.fileChangeArg);
                var modelSetter = model.assign;
                var parentScope = scope.$parent;

                element.bind('change',function () {
                    parentScope.$apply(function () {
                        modelSetter(parentScope, element[0].files[0]);
                        callback(parentScope)(callbackArg(parentScope));
                    });
                });
            }
        };
    }]);
});
