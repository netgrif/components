import {ConfigurationService} from '../../configuration/configuration.service';

export class TestConfigurationService extends ConfigurationService {
    constructor() {
        super({
            extends: 'nae-default',
            providers: {
                auth: {
                    address: 'http://localhost:8080/api/',
                    authentication: 'Basic',
                    endpoints: {
                        login: 'auth/login',
                        logout: 'auth/logout',
                        signup: 'auth/signup',
                        changePassword: 'auth/changePassword',
                        verification: 'auth/verify',
                        verify: 'auth/token/verify',
                        invite: 'auth/invite',
                        reset: 'auth/reset',
                        recover: '/auth/recover'
                    },
                    sessionBearer: 'X-Auth-Token'
                },
                resources: [
                    {
                        name: 'case',
                        address: 'http://localhost:8080/api/',
                        format: 'hal',
                        openApi: 'https://swagger.io'
                    },
                    {
                        name: 'task',
                        address: 'http://localhost:8080/api/',
                        format: 'json'
                    },
                    {
                        name: 'petrinet',
                        address: 'http://localhost:8080/api/',
                        format: 'json'
                    },
                    {
                        name: 'user',
                        address: 'http://localhost:8080/api/',
                        format: 'json'
                    },
                    {
                        name: 'dashboard',
                        address: 'http://localhost:8080/api/',
                        format: 'json'
                    },
                    {
                        name: 'impersonation',
                        address: 'http://localhost:8080/api/',
                        format: 'json'
                    }
                ]
            },
            views: {
                dashboard: {
                    layout: {
                        name: 'dashboard',
                        params: {
                            columns: 4,
                            cards: [
                                {
                                    type: 'count',
                                    title: 'All tasks',
                                    resourceType: 'Task',
                                    filter: {},
                                    layout: {
                                        x: 0,
                                        y: 0,
                                        rows: 1,
                                        cols: 1
                                    }
                                },
                                {
                                    type: 'iframe',
                                    url: 'https://netgrif.com/',
                                    layout: {
                                        x: 2,
                                        y: 0,
                                        rows: 2,
                                        cols: 2
                                    }
                                },
                                {
                                    type: 'count',
                                    title: 'All cases',
                                    resourceType: 'Case',
                                    filter: {},
                                    layout: {
                                        x: 1,
                                        y: 1,
                                        rows: 1,
                                        cols: 1
                                    }
                                }, {
                                    type: 'pie',
                                    title: 'Custom',
                                    resourceType: 'case',
                                    query: {
                                        aggs: {
                                            result: {
                                                terms: {
                                                    field: 'dataSet.text.value.keyword'
                                                }
                                            }
                                        }
                                    },
                                    filter: {},
                                    layout: {
                                        x: 0,
                                        y: 1,
                                        rows: 1,
                                        cols: 1
                                    }
                                }, {
                                    type: 'bar',
                                    title: 'Custom',
                                    resourceType: 'case',
                                    query: {aggs: {result: {terms: {field: 'dataSet.text.value.keyword'}}}},
                                    xAxisLabel: 'Country',
                                    yAxisLabel: 'Population',
                                    filter: {},
                                    layout: {
                                        x: 2,
                                        y: 1,
                                        rows: 1,
                                        cols: 1
                                    }
                                }, {
                                    type: 'line',
                                    title: 'Custom',
                                    resourceType: 'case',
                                    query: {
                                        aggs: {
                                            result1: {terms: {field: 'dataSet.text.value.keyword'}},
                                            result2: {terms: {field: 'dataSet.text.value.keyword'}}
                                        }
                                    },
                                    xAxisLabel: 'Country',
                                    yAxisLabel: 'Population',
                                    filter: {},
                                    layout: {
                                        x: 0,
                                        y: 2,
                                        rows: 1,
                                        cols: 1
                                    }
                                }, {
                                    type: 'lineargauge',
                                    title: 'Custom',
                                    resourceType: 'case',
                                    query: {aggs: {types_count: {value_count: {field: 'dataSet.text.value.keyword'}}}},
                                    xAxisLabel: 'Country',
                                    yAxisLabel: 'Population',
                                    units: 'cases',
                                    filter: {},
                                    layout: {
                                        x: 1,
                                        y: 2,
                                        rows: 1,
                                        cols: 1
                                    }
                                }, {
                                    type: 'default',
                                    layout: {
                                        x: 2,
                                        y: 2,
                                        rows: 1,
                                        cols: 1
                                    }
                                }
                            ]
                        },
                        componentName: 'MyDashboard'
                    },
                    access: 'private',
                    navigation: {
                        title: 'Dashboard',
                        icon: 'dashboard'
                    },
                    routing: {
                        path: 'comp-dashboard'
                    }
                },
                cases: {
                    layout: {
                        name: 'emptyView',
                        params: {
                            allowedNets: []
                        }
                    },
                    access: 'private',
                    navigation: {
                        title: 'Cases',
                        icon: 'settings'
                    },
                    routing: {
                        path: 'cases'
                    },
                    children: {
                        some_cases: {
                            layout: {
                                name: 'emptyView'
                            },
                            access: 'private',
                            navigation: {
                                icon: 'account_circle'
                            },
                            routing: {
                                path: 'some_cases'
                            },
                            children: {
                                some_specifics: {
                                    layout: {
                                        name: 'emptyView'
                                    },
                                    access: 'private',
                                    navigation: true,
                                    routing: {
                                        path: 'some_specifics'
                                    }
                                }
                            }
                        }
                    }
                },
                task: {
                    layout: {
                        name: 'emptyView',
                        params: {
                            allowedNets: []
                        }
                    },
                    access: 'private',
                    navigation: {
                        title: 'Tasks',
                        icon: 'assignment'
                    },
                    routing: {
                        path: 'task'
                    },
                    children: {
                        some_tasks: {
                            layout: {
                                name: 'emptyView'
                            },
                            access: 'private',
                            navigation: false,
                            routing: {
                                path: 'some_tasks'
                            },
                            children: {
                                some_specifics: {
                                    layout: {
                                        name: 'emptyView'
                                    },
                                    access: 'private',
                                    navigation: true,
                                    routing: {
                                        path: 'some_specifics'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            theme: {
                name: 'example-classico',
                pallets: {
                    light: {
                        primary: {
                            50: '',
                            100: '',
                            200: '',
                            300: '',
                            400: '',
                            500: '',
                            600: '',
                            700: '',
                            800: '',
                            900: '',
                            A100: '',
                            A200: '',
                            A400: '',
                            A700: '',
                            contrast: {
                                light: [
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900'
                                ],
                                dark: [
                                    '50',
                                    '100',
                                    '200'
                                ]
                            }
                        },
                        secondary: {
                            50: '',
                            100: '',
                            200: '',
                            300: '',
                            400: '',
                            500: '',
                            600: '',
                            700: '',
                            800: '',
                            900: '',
                            A100: '',
                            A200: '',
                            A400: '',
                            A700: '',
                            contrast: {
                                light: [
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900'
                                ],
                                dark: [
                                    '50',
                                    '100',
                                    '200'
                                ]
                            }
                        },
                        warn: {
                            50: '',
                            100: '',
                            200: '',
                            300: '',
                            400: '',
                            500: '',
                            600: '',
                            700: '',
                            800: '',
                            900: '',
                            A100: '',
                            A200: '',
                            A400: '',
                            A700: '',
                            contrast: {
                                light: [
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900'
                                ],
                                dark: [
                                    '50',
                                    '100',
                                    '200'
                                ]
                            }
                        }
                    },
                    dark: {
                        primary: 'blue',
                        secondary: 'pink'
                    }
                }
            },
            assets: [
                '../../../assets'
            ],
            filters: {
                'all-cases': {
                    title: 'All Cases',
                    type: 'Case',
                    access: 'public',
                    body: [],
                    mergeOperator: 'AND'
                },
                'all-tasks': {
                    title: 'All Tasks',
                    type: 'Task',
                    access: 'public',
                    body: {}
                },
                'some-tasks': {
                    title: 'All Tasks',
                    type: 'Task',
                    access: 'public',
                    body: [{}],
                    mergeOperator: 'AND'
                }
            },
            i18n: [
                'sk-SK',
                'en-US'
            ],
            services: {
                log: {
                    logWithDate: true,
                    serializeExtraParams: true,
                    includeLogLevel: true,
                    publishers: [
                        'console',
                        'localStorage'
                    ]
                },
                auth: {
                    loginRedirect: 'login'
                },
                legal: {
                    termsOfService: 'https://netgrif.com/',
                    privacyPolicy: 'https://netgrif.com/'
                },
                groupNavigation: {
                    groupNavigationRoute: 'config-route'
                }
            }
        });
    }
}
