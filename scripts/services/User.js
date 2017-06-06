define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$user', function () {
        const user = {
            id: 0,
            login: undefined,
            authority: undefined,
            name: undefined,
            roles: undefined,

            clear: function () {
                user.id = 0;
                user.login = undefined;
                user.authority = undefined;
                user.name = undefined;
                user.roles = undefined;
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
             * Check if user has specified auhority
             * @param {String} auth
             * @returns {boolean}
             */
            hasAuthority: function (auth) {
                if (!auth || !user.authority) return false;
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
            }
        };
        return user;
    });
});
