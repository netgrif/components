
define(['angular','i18n!nls/ui','../modules/Main'],function (angular, ui) {
    angular.module('ngMain').factory('$i18n',function ($config, $user) {

        // function mapLocal(obj) {
        //     let mapped;
        //     if(obj instanceof Object){
        //         mapped = {};
        //         Object.keys(obj).forEach(key => mapped[key] = mapLocal(obj[key]));
        //
        //     } else if(obj instanceof Array){
        //         mapped = [];
        //         obj.forEach(item => mapped.push(mapLocal(item)));
        //
        //     } else {
        //         mapped = obj;
        //     }
        //     return mapped;
        // }
        let myi18n = {
            change: function (locale) {
                if(!locale || locale === localStorage.getItem('locale')) return;
                $user.savePreferenceLocale(locale);
                location.reload();
            },
            current: function () {
                return localStorage.getItem('locale') || $config.defaults.locale;
            }
        };

        return Object.assign(ui,myi18n);
    });
});
