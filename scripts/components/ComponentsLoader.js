/*
 Register all components that need to be loaded
 component itself should be handling registration to angular app module
 */

var path = 'scripts/components/';
define(['CaseDataComponent']
    .map(ctrl => path + ctrl), function () {
});
