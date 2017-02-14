/**
 * Created by Milan on 14.2.2017.
 */
define(['angular','../modules/Tasks'],function (angular) {
    angular.module('ngTasks').directive('taskPriority',
        function ($compile, $log) {
            var low = '<i class="material-icons color-fg-green-500">arrow_downward</i>Low';
            var medium = '<i class="material-icons color-fg-amber-500">arrow_upward</i> Medium';
            var high = '<i class="material-icons color-fg-red-500">arrow_upward</i> High';

            var getTemplate = function(priority) {
                switch (priority){
                    case "1": return low;
                    case "2": return medium;
                    case "3": return high;
                }
            };

            var linker = function (scope, element, attrs) {
                element.html(getTemplate(attrs.priority)).show();
                $compile(element.contents())(scope);
            };

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    priority: '@'
                },
                link: linker
            };
        });
});