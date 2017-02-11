/**
 * Created by Milan on 11.2.2017.
 */
define(['angular','../modules/Workflow'],function (angular) {
    angular.module('ngWorkflow').factory('$fileUpload',function ($log, $http) {
        return {
            upload: function (file, meta, url, callback) {
                var formData = new FormData();
                formData.append('file',file);
                meta && formData.append('meta', meta);
                $http.post(url, formData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (response) {
                    $log.debug(response);
                    callback && callback(response);

                }, function () {
                    $log.debug("File upload failed!");
                    callback && callback();
                });
            }
        };
    });
});
