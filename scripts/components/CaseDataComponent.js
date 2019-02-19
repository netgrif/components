define(['angular', '../modules/Main'],
    function (angular) {
        function CaseDataController() {
            const ctrl = this;

            ctrl.downloadFile = function (event) {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                const downloadWindow = window.open(`/api/workflow/case/${ctrl.caseId}/file/${ctrl.field.stringId}`);
                downloadWindow.onload = () => downloadWindow.close();
            }
        }

        angular.module('ngMain').component('caseData', {
            templateUrl: 'views/app/lists/list_items/case_data_list_item_field.html',
            controller: CaseDataController,
            bindings: {
                field: '<',
                caseId: '<'
            }
        });
    });
