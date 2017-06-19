define(['angular','../modules/Main'],function (angular) {
    angular.module('ngMain').factory('$style', function () {
        let el = angular.element;

        return {
            mainView: function () {

                el('.btn-menu > .material-icons').css({
					marginRight: '14px',
					marginTop: '1.5px',
					marginBottom: '1.5px',
					fontSize: '24px'
				});

				el('.btn-menu > span').css({
					marginLeft: '-1px',
					fontSize: '15px'
				});

                el('.btn-menu > span').css({
                    marginLeft: '-1px',
                    fontSize: '15px'
                });
            }
        };
    });
});
