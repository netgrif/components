define(['angular', '../modules/Main'], function (angular) {
    angular.module('ngMain').filter('cut', function ($config) {
        return function (value, wordwise, tail) {
            if (!value) return '';

            let max = $config.show.caseTitleLength;
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
});