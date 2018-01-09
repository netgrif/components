define(['angular','../modules/Tasks'],function (angular) {
    angular.module('ngTasks').directive('taskPriority',
        function ($compile, $i18n) {
            var low = `<i class="material-icons color-fg-green-500">arrow_downward</i> ${$i18n.block.task.priority.low}`;
            var medium = `<i class="material-icons color-fg-amber-500">arrow_upward</i> ${$i18n.block.task.priority.medium}`;
            var high = `<i class="material-icons color-fg-red-500">arrow_upward</i> ${$i18n.block.task.priority.high}`;

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