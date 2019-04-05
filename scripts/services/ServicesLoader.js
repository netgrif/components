/*
 Register all services that need to be loaded
 service itself should be handling registration to angular app module
 */
var path = 'scripts/services/';
define([path + 'Loading', path + 'Auth', path + 'Snackbar', path + 'Localization',
        path + 'User', path + 'Dialog', path + 'AuthHttpInterceptor', path + 'FileUpload',
        path + 'CacheService', path + 'Process', path + 'ConfigService', path + 'FilterRepository',
        path + 'Organization', path + 'BrowserSupportNotification', path + 'AuthTokenService'],
    function () {
    });
