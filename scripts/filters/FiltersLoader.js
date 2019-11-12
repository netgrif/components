/*
 Register all filters that need to be loaded
 filter itself should be handling registration to angular app module
 */
var path = 'scripts/filters/';
define(['Cut']
    .map(ctrl => path + ctrl), function () {
});