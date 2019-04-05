define(['angular', 'config', 'scripts/version', '../modules/Main'], function (angular, config, version) {
    angular.module('ngMain').factory('$config', function ($log) {

        function applyApiBase(url) {
            if (url.includes("http://") || url.includes("https://"))
                return url;
            return service.apiPath + url;
        }

        function buildRequestUrl(endpoint) {
            if (!endpoint.url)
                return service.apiPath;
            if (!endpoint.params)
                return applyApiBase(endpoint.url);

            Object.keys(endpoint.params).forEach(param => {
                if (!endpoint.url.includes(`{${param}}`)) return;
                endpoint.url = endpoint.url.replace(`{${param}}`, endpoint.params[param]);
            });

            return applyApiBase(endpoint.url);
        }

        const service = {
            /**
             * Modify provided url to contained required address (i.e. url starts with basePath)
             * @param {string} url
             * @return {string}
             */
            sanitizeUrl: function (url) {
                const searchIndex = url.includes("http://") ? 7 : (url.includes("https://") ? 8 : 0);
                const slash = url.indexOf("/", searchIndex);
                if (slash === -1)
                    return url + service.basePath;
                if (url.includes(service.basePath, searchIndex))
                    return url;
                const start = url.substring(0, slash);
                const end = url.substring(slash);
                return start + service.basePath + end;
            },

            /**
             * Build complete url for requesting backend API.
             * Base API url address if set in global configuration file.
             * @param {Object | string} endpoint address or endpoint config object of the requested endpoint
             * @param {string} endpoint.url address of the requested endpoint
             * @param {Object} endpoint.params the object with values of path params
             * @return {string}
             */
            getApiUrl: function (endpoint) {
                if (typeof endpoint === 'string')
                    return applyApiBase(endpoint);
                else
                    return buildRequestUrl(endpoint);
            }
        };

        return Object.assign(service, config, version);
    });
});
