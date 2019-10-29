define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$user', function ($log, $http, $snackbar, $config) {
        const user = {
            id: 0,
            login: undefined,
            authority: undefined,
            name: undefined,
            roles: undefined,
            groups: undefined,
            preference: {
                taskFilters: {},
                caseFilters: {},
                caseViewHeaders: {}
            },

            clear: function () {
                user.id = 0;
                user.login = undefined;
                user.authority = undefined;
                user.name = undefined;
                user.roles = undefined;
                user.preferences = undefined;
            },

            fromResource: function (resource) {
                user.id = resource.id;
                user.login = resource.email;
                user.authority = resource.authorities.map(authority => authority.authority);
                user.name = resource.fullName;
                user.roles = resource.processRoles.map(role => role.stringId);
                user.groups = resource.groups;
            },

            /**
             * Change users roles
             * @param {Array} roles
             */
            changeRoles: function (roles) {
                if (roles instanceof Array) {
                    user.roles = roles;
                }
            },

            /**
             * Check if user has specified authority
             * @param {Array / String} auth
             * @returns {boolean}
             */
            hasAuthority: function (auth) {
                if (!auth || !user.authority) return false;
                if (auth instanceof Array) {
                    return auth.some(a => user.authority.some(u => u === a));
                } else
                    return user.authority.some(a => a === auth);
            },

            /**
             * Check if user has specified role
             * @param {String} role
             * @returns {boolean}
             */
            hasRole: function (role) {
                if (!role || !user.roles) return false;
                return user.roles.some(r => r === role);
            },

            /**
             * Check if user can perform specified action
             * @param {Object} roles
             * @param {String} action
             * @returns {boolean}
             */
            canDo: function (roles, action) {
                if (!roles || !action || !user.roles || !(roles instanceof Object)) return false;
                return user.roles.some(role => roles[role] ? roles[role][action] : false);
            },

            /**
             * Check if user has specified permission
             * @param {String} permission
             * @returns {boolean}
             */
            hasPermission: function (permission) {
                if (!permission) return false;
                const perm = "PERM_" + permission.toUpperCase();
                return user.hasAuthority(perm);
            },

            getAsObject: function () {
                return {
                    id: user.id,
                    email: user.login,
                    fullname: user.name,
                    name: user.name.split(" ")[0],
                    surname: user.name.split(" ")[1],
                    authorities: user.authority,
                    userProcessRoles: user.roles.map(role => {
                        roleId: role
                    })
                }
            },

            savePreferenceLocale: function (value) {
                this.preferences.locale = value;
                localStorage.setItem("locale", value);
                this.savePreference();
            },

            getPreferenceLocale: function () {
                return this.preferences.locale;
            },

            /**
             * @param key - task view viewId
             * @param value - list of filters stringIds
             */
            savePreferenceTaskFilters: function (key, value) {
                this.preferences.taskFilters[key] = value;
                this.savePreference();
            },

            /**
             * @param key - task view viewId
             * @returns list of filters stringIds
             */
            getPreferenceTaskFilters: function (key) {
                return this.preferences.taskFilters[key];
            },

            /**
             * @param key - case view viewId
             * @param value - list of filters stringIds
             */
            savePreferenceCaseFilters: function (key, value) {
                this.preferences.caseFilters[key] = value;
                this.savePreference();
            },

            /**
             * @param key - case view viewId
             * @returns list of filters stringIds
             */
            getPreferenceCaseFilters: function (key) {
                return this.preferences.caseFilters[key];
            },

            /**
             * @param key - case view viewId
             * @param value - list of headers
             */
            savePreferenceCaseHeaders: function (key, value) {
                this.preferences.caseViewHeaders[key] = value;
                this.savePreference();
            },

            getPreferenceCaseHeaders: function (key) {
                return this.preferences.caseViewHeaders[key];
            },

            savePreference: function (callback = angular.noop) {
                $http.post($config.getApiUrl("/user/preferences"), this.preferences).then(response => {
                    $log.info(response);
                    callback && callback(true);
                }, error => {
                    $log.debug(error);
                    callback && callback(false);
                });
            },

            loadPreferences: function (callback = angular.noop) {
                $http.get($config.getApiUrl("/user/preferences")).then(response => {
                    this.preferences = response;
                    callback && callback(true);
                }, error => {
                    $log.debug(error);
                    callback && callback(false);
                });
            }
        };
        return user;
    });
});
