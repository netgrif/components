define(['angular', '../modules/Tasks'], function (angular) {
    angular.module('ngTasks').directive('naeOpenOnFocus',
        function () {
            return {
                scope: true,
                restrict: 'A',
                link: function (scope, elem, attr, ctrl) {
                    scope.showOptions = true;
                    if ((attr['mdOnClose'])) {
                        attr['mdOnClose'] = "showOptions=false;" + (attr['mdOnClose']);
                    } else {
                        (attr['mdOnClose']) = "showOptions=false;"
                    }

                    elem.bind('focus', function () {
                        if (scope.showOptions) {
                            // console.log(scope, elem, attr, ctrl);
                            elem.triggerHandler('click');
                        }
                    });

                    elem.bind('blur', function () {
                        scope.showOptions = true;
                    });
                }
            };
        }
    );
});