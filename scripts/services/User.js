
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
            changeRoles: function (roles){
                if(roles instanceof Array){
                    user.roles = roles;
                }
            },

            /**
             * Check if user has specified auhority
             * @param {String} auth
             * @returns {boolean}
             */
            hasAuthority: function (auth) {
                if(!auth || !authority) return false;
                return authority.some(a => a === auth);
            },

            /**
             * Check if user has specified role
             * @param {String} role
             * @returns {boolean}
             */
            hasRole: function (role) {
                if(!role || !roles) return false;
                return roles.some(r => r === role);
            },

            canDelegate: function (delegateRole) {
                return user.hasRole(delegateRole);
            },
            canAssign: function (assignRole) {
                return user.hasRole(assignRole);
            }
        };
        return user;
    });
});
