define(['angular', '../modules/Tasks'], function (angular) {
    angular.module('ngTasks').directive('taskPriority',
        function ($compile, $i18n) {

            let low = `<span flex layout="row" layout-align="start center"><i class="material-icons color-fg-green-500 margin-right-2x">arrow_downward</i>${$i18n.block.priority.low}</span>`;
            let medium = `<span flex layout="row" layout-align="start center"><i class="material-icons color-fg-amber-500 margin-right-2x">arrow_upward</i>${$i18n.block.priority.medium}</span>`;
            let high = `<span flex layout="row" layout-align="start center"><i class="material-icons color-fg-red-500 margin-right-2x">priority_high</i>${$i18n.block.priority.high}</span>`;

            const getTemplate = function (priority) {
                priority = parseInt(priority.toString());
                if (priority <= 1 || isNaN(priority) || !priority)
                    return high;
                else if (priority === 2)
                    return medium;
                else if (priority >= 3)
                    return low;
            };

            const linker = function (scope, element, attrs) {
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