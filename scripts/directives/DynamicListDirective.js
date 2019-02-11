define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').directive('dynamicList', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.ready(function () {
                        $timeout(function () {
                            const childElementType = attrs['dynamicList'];
                            const numberOfItems = attrs['items'];

                            if (!childElementType || !numberOfItems) {
                                console.log("!childElementType || !numberOfItems");
                                return;
                            }

                            const childElement = element[0].querySelector(childElementType);
                            if (!childElement) {
                                console.log("!childElement");
                                return;
                            }

                            const height = angular.element(childElement).outerHeight(true);

                            element[0].style.setProperty('height', 'calc(' + numberOfItems + ' * ' + height + 'px)', 'important');
                            element[0].style.setProperty('min-height', 'auto');
                            element[0].style.setProperty('overflow-y', 'scroll');
                        });
                    });
                }
            };
        }
    ]);
});