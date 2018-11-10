/*
 Register all services that need to be loaded
 service itself should be handling registration to angular app module
 */
// TODO 19.6.2017 add services (FileUpload)
var path = 'scripts/services/';
define([path + 'Loading', path + 'Auth', path + 'Snackbar', path + 'Localization',
    path + 'User', path + 'Dialog', path + 'AuthHttpInterceptor', path + 'FileUpload',
    path + 'CacheService', path + 'Process', path + 'ConfigService', path + 'FilterRepository'], function () {
});
