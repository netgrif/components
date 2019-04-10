define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$authToken', function ($log, $q) {

        const EXPIRATION = 1200000;

        function createToken(headerValue) {
            if (!headerValue)
                return null;
            return {
                token: headerValue,
                created: new Date().getTime()
            };
        }

        function saveToken(token) {
            if (!token || !token.token)
                return;
            const at = {
                // t: btoa(token.token.replace("-", "%")),
                t: btoa(token.token),
                e: token.created
            };
            localStorage.setItem("at", JSON.stringify(at));
        }

        function clearToken() {
            localStorage.removeItem("at");
        }

        function validate(token) {
            if (!token || !token.token)
                return false;
            const now = new Date().getTime();
            return now - token.created < EXPIRATION;
        }

        function getToken() {
            const at = JSON.parse(localStorage.getItem("at"));
            if (!at || !at.t)
                return null;
            return {
                // token: atob(at.t.replace("%", "-")),
                token: atob(at.t),
                created: at.e
            };
        }

        const interceptor = {
            token: undefined,

            request: function (request) {
                if (interceptor.token && interceptor.token.token)
                    request.headers['x-auth-token'] = interceptor.token.token;

                return request;
            },

            response: function (response) {
                const received = response.headers('x-auth-token');

                if (received && (!interceptor.token || !interceptor.token.token || received !== interceptor.token.token)) {
                    interceptor.token = createToken(received);
                    saveToken(interceptor.token);
                }

                return response;
            },

            responseError: function (rejection) {
                if (rejection.status === 401 && interceptor.token) {
                    $log.debug("Auth Token is invalid");
                    interceptor.token = null;
                    clearToken();
                }
                return $q.reject(rejection);
            },

            clear: function () {
                clearToken();
            },

            init: function () {
                interceptor.token = getToken();
            }
        };
        return interceptor;
    });
});
