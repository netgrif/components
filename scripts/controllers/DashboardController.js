define(['angular', '../classes/Case', '../classes/Filter', '../classes/DataField', '../modules/Main'],
    function (angular, Case, Filter, DataField) {
        angular.module('ngMain').controller('DashboardController',
            ['$log', '$scope', '$user', '$snackbar', '$http', '$dialog', '$fileUpload', '$mdExpansionPanelGroup', '$cache', '$location', '$timeout', '$i18n', '$process',
                function ($log, $scope, $user, $snackbar, $http, $dialog, $fileUpload, $mdExpansionPanelGroup, $cache, $location, $timeout, $i18n, $process) {
                    const self = this;

                    self.limit = 3;
                    self.sort = {
                        attribute: "_id",
                        direction: "desc"
                    };

                    // TODO 12.12.2018 Button examples for commented section in button data-field html
                    self.datafields = [
                        new DataField(this, {
                            name: 'Button type text',
                            description: false,
                            type: 'button',
                            primary: false,
                            placeholder: 'Button text',
                            // no tooltip
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n}),
                        new DataField(this, {
                            name: 'Button type text raised',
                            description: false,
                            type: 'button raised',
                            primary: true,
                            placeholder: 'Button text raised',
                            // no tooltip
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n}),
                        new DataField(this, {
                            name: 'Button type icon',
                            description: false,
                            type: 'icon',
                            primary: false,
                            placeholder: 'cake',
                            tooltip: {
                                direction: 'right',
                                placeholder: 'Test tooltip text'
                            },
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n}),
                        new DataField(this, {
                            name: 'Button type FAB',
                            description: false,
                            type: 'fab',
                            primary: false,
                            placeholder: 'bug_report',
                            tooltip: {
                                direction: 'right',
                                placeholder: 'Test tooltip text'
                            },
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n}),
                        new DataField(this, {
                            name: 'Button type FAB',
                            description: false,
                            type: 'fab',
                            primary: true,
                            placeholder: 'bug_report',
                            // no tooltip
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n}),
                        new DataField(this, {
                            name: 'Button type long text',
                            description: false,
                            type: 'button',
                            primary: true,
                            placeholder: 'Button with looooooooooooooooooooooooooong text',
                            // no tooltip
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n}),
                        new DataField(this, {
                            name: 'Button type text with href',
                            description: false,
                            type: 'button',
                            primary: true,
                            placeholder: 'Link text',
                            // no tooltip
                            value: "https://google.com",
                            disabled: false,
                            active: false
                        }, {}, {$dialog, $user, $snackbar, $fileUpload, $i18n})
                    ];

                }]);
    });
