define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$style', function () {
        let el = angular.element;

        return {
            mainView: function () {

				// el('.btn-menu > span').css({
				// 	marginLeft: '-1px',
				// 	fontSize: '15px'
				// });

            }
        };
    });
});
