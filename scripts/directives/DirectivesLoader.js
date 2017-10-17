/*
 Register all directives that need to be loaded
 directive itself should be handling registration to angular app module
 */
var path = 'scripts/directives/';
define([path+'FileModelDirective',path+'EvalAttrAsExpr'], function () {});
