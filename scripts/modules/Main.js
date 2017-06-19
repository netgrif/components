/*
    Main module
    async load directive, inner content routing
 */
define(['angular', 'angularRoute', 'angularRouteSegment'], function (angular) {
    return angular.module('ngMain', ['ngRoute', 'route-segment']);
});