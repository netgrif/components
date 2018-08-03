define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$user', function () {
        const user = {
            id: 0,
            login: undefined,
            authority: undefined,
            name: undefined,
            roles: undefined,
            groups: undefined,

            clear: function () {
                user.id = 0;
                user.login = undefined;
                user.authority = undefined;
                user.name = undefined;
                user.roles = undefined;
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

            savePreference: function (key, value) {
                localStorage.setItem("userPreference-" + key, JSON.stringify(value));
            },
            getPreference: function (key) {
                const value = localStorage.getItem("userPreference-" + key);
                if (value)
                    return JSON.parse(value);
                return undefined;
            },
            removePreference: function (key) {
                localStorage.removeItem("userPreference-" + key);
            }
        };
        return user;
    });
});
