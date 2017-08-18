define(['angular', '../modules/Documents', '../modules/Main'],
    function (angular) {
        angular.module('ngDocuments').controller('DocumentsController',
            ['$log', '$scope', '$timeout','$dialog','$i18n',
                function ($log, $scope, $timeout, $dialog, $i18n) {
                    const self = this;

                    self.pdfDialog = function () {
                        $dialog.showByTemplate('viewpdf',self,{title: "Preview"});
                    }

                }]);
    });
