define(['angular', 'angularRoute', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$orgs', function ($http, $location, $rootScope, $log, $config) {

        const loggedUserGroupsUrl = "/group/my";

        const orgs = {

            loggedUserGroups: undefined,

            loadGroupsOfUser: function (callback = angular.noop) {
                $http.get($config.getApiUrl(loggedUserGroupsUrl))
                    .then(response => {
                        orgs.loggedUserGroups = response.$response().data._embedded.groups;
                        callback(true, orgs.loggedUserGroups);
                    }, error => {
                        $log.error(error);
                        callback(false, undefined);
                    });
            },
        };
        return orgs;
    });
});
