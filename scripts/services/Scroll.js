/**
 * Created by tomin on 20-Mar-17.
 */
define(['angular', 'angularMaterial', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$scroll', function ($log, $anchorSmoothScroll) {

        return {
            toTop: function () {
                // TODO hide and show btnClass
                $anchorSmoothScroll.scrollTo('top');
                $log.debug("Service Scroll method toTop triggered");
            }
        }

    });
});
