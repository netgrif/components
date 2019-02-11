/*
 Register all directives that need to be loaded
 directive itself should be handling registration to angular app module
 */
var path = 'scripts/directives/';
define([
    path + 'DynamicListDirective',
    path + 'FileModelDirective',
    path + 'EvalAttrAsExpr',
    path + 'TaskPriorityDirective',
    path + 'OpenOnFocusDirective'
], function () {});
