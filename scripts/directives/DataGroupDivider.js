
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').directive('dataGroupDivider', function dataGroupDivider() {
        return {
            restrict: 'E',
            template: '<div layout="row" layout-align="start center" style="margin-top: 20px;margin-bottom: 10px;" flex="100">\n' +
            '                            <div flex="20" style="height: 3px;background-color: rgba(18, 178, 210, .50);"></div>\n' +
            '                            <span style="margin-left: 7px;margin-right: 7px;">{{title}}</span>\n' +
            '                            <div flex style="height: 3px;background-color: rgba(18, 178, 210, .50);"></div>\n' +
            '                        </div>',
            scope:{
                title: '@'
            },
            controller: function (scope, element, attrs) {
                console.log(scope);
                console.log(scope.title);
            }
        };
    });
}); // TODO 24.8.2017 To be removed?

