
define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$user', function () {
        var user = {
            id: 0,
            login: undefined,
            authority: undefined,
            name: undefined,
            roles: undefined,

            getProfile: function () {
                //TODO: ajax to get user profile
            },
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

            canDelegate: function (delegateRole) {
                if(!user.roles || !delegateRole) return;
                return user.roles.includes(delegateRole);
            },
            canAssign: function (assignRole) {
                if(!user.roles || !assignRole) return;
                return user.roles.includes(assignRole);
            }
        };
        return user;
    });
});
