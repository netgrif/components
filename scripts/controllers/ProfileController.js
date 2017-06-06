/**
 * Created on 4.2.2017.
 */
define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').controller('ProfileController', ['$log', '$scope', '$http', '$snackbar',
    function ($log, $scope, $http, $snackbar) {
        const self = this;

        const TOTAL_INPUTS = 5;

        self.user = {};
        self.completion = 0;

        self.loadProfile = function () {
            $http.get("/res/user/me").then(function (response) {
                self.user = response;
                self.updateCompletion();
                // $log.debug(self.user);

            }, function () {
                $snackbar.error("Unable to load user data");
            });
        };

        self.updateCompletion = function () {
            self.completion = parseResponse(self.user) / TOTAL_INPUTS * 100;
        };

        function capitalizeFirstLetter(string) {
            const str = string.toLowerCase();

            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        self.getRoleName = function(authority) {
            const name = authority.substring(authority.indexOf('_') + 1);

            return capitalizeFirstLetter(name);
        };

        let parseResponse = user => {
            let inputs = 0;

            if (!user) return;

            if (user.name)
                inputs++;
            if (user.surname)
                inputs++;
            if (user.email)
                inputs++;
            if (user.telNumber)
                inputs++;
            if (user.avatar)
                inputs++;

            return inputs;
        };

        self.loadProfile();

    }]);
});
