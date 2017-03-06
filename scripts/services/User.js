/**
 * Created by Milan on 14.2.2017.
 */
define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$user', function () {
        var user = {
            id: 0,
            login: undefined,
            authority: undefined,
            name: undefined,

            getProfile: function () {
                //TODO: ajax to get user profile
            },
            clear: function () {
                user.id = 0;
                user.login = undefined;
                user.authority = undefined;
                user.name = undefined;
            }
        };
        return user;
    });
});
