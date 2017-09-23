
define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').directive('evalAttrAsExpr', function evalAttrAsExpr() {
        /*
            Directive to evaluate expression inside another attribute of element,
            which cannot evaluate expression itself.
            Directive is only in the form of attribute.
            It takes as parameter name of another attribute in which expression needs to be evaluated.

            <directive md-component-id="expr" eval-attr-as-expr="mdComponentId" ...>
         */
        return {
            restrict: 'A',
            controller: function ($scope, $element, $attrs) {
                let attrToEval = $attrs.evalAttrAsExpr.split(" ");
                attrToEval.forEach(attr => $attrs[attrToEval] = $scope.$eval($attrs[attrToEval]));
            },
            priority: 9999
        };
    });
});

