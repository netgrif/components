define(['angular', '../modules/Documents', '../modules/Main'],
    function (angular) {
        angular.module('ngDocuments').controller('DocumentsController',
            ['$log', '$scope', '$timeout','$dialog',
                function ($log, $scope, $timeout, $dialog) {
                    const self = this;

                    self.pdfDialog = function () {
                        $dialog.showByTemplate('viewpdf',self,{title: "Preview"});
                    }

                }]);
    });
