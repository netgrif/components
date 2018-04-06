define(['angular', '../modules/Workflow', '../modules/Main'],
    function (angular) {
        angular.module('ngWorkflow').controller('WorkflowPanelController',
            ['$log', '$scope', '$http', '$snackbar', '$user', '$fileUpload', '$timeout', '$mdExpansionPanelGroup', '$cache', '$i18n', '$rootScope', 'resource', 'links',
                function ($log, $scope, $http, $snackbar, $user, $fileUpload, $timeout, $mdExpansionPanelGroup, $cache, $i18n, $rootScope, resource, links) {
                    const self = this;

                    self.links = links;

                    self.parseDate = function (isoDate) {
                        return `${isoDate.dayOfMonth}.${isoDate.monthValue}.${isoDate.year}`
                    };

                    //TODO model file download
                    self.downloadModel = function () {
                        const downloadWindow = window.open(self.links.file.href);
                        downloadWindow.onload = () => downloadWindow.close();
                    };

                    Object.assign(self,resource);
                    self.uploadDate = self.parseDate(self.createdDate);

                    self.details = {
                        title: {
                            name: $i18n.page.workflow.data.item.file.title,
                            icon: 'linear_scale',
                            value: self.title
                            // button: {
                            //     name: 'file_download',
                            //     tooltip: $i18n.page.workflow.data.item.file.download
                            // }
                        },
                        author: {
                            name: $i18n.page.workflow.data.item.author.title,
                            icon: 'account_circle',
                            value: self.author.fullName,
                            tooltip: self.author.email
                        },
                        uploadDate: {
                            name: $i18n.page.workflow.data.item.uploadDate.title,
                            icon: 'today',
                            value: self.uploadDate
                        }
                    };
                    // self.stats = {
                    //     places: {
                    //         name: $i18n.page.workflow.data.item.places.title,
                    //         icon: 'group_work',
                    //         value: self.places
                    //     },
                    //     transitions: {
                    //         name: $i18n.page.workflow.data.item.transitions.title,
                    //         icon: 'check_box',
                    //         value: self.transitions
                    //     },
                    //     arcs: {
                    //         name: $i18n.page.workflow.data.item.arcs.title,
                    //         icon: 'trending_flat',
                    //         value: self.arcs
                    //     },
                    //     roles: {
                    //         name: $i18n.page.workflow.data.item.roles.title,
                    //         icon: 'perm_identity',
                    //         value: self.roles
                    //     },
                    //     data: {
                    //         name: $i18n.page.workflow.data.item.data.title,
                    //         icon: 'storage',
                    //         value: self.dataSet
                    //     },
                    //     actions: {
                    //         name: $i18n.page.workflow.data.item.actions.title,
                    //         icon: 'toys',
                    //         value: self.actions
                    //     }
                    // };
                }]);
    });