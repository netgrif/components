define(['angular', 'angularRoute', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$orgs', function ($http, $location, $rootScope, $log) {

        const groupsUrl = "/api/group/my";

        const orgs = {
            loadGroupsOfUser: function (callback = angular.noop) {
                $http.get(groupsUrl)
                    .then(response => {
                        callback(true, response.$response().data._embedded.groups);
                    }, error => {
                        $log.error(error);
                        callback(false, {});
                    });
            },
        };
        return orgs;
    });
});
