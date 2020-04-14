import {Injectable} from '@angular/core';
import {ConfigurationService} from '@netgrif/application-engine';

@Injectable({
    providedIn: 'root'
})
export class NaeExampleAppConfigurationService extends ConfigurationService {

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
                            signup: 'auth/signup'
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
                        }
                    ]
                },
                views: {
                    layout: 'empty',
                    routes: {
                        dashboard: {
                            type: '',
                            layout: {
                                name: ''
                            },
                            access: 'private',
                            navigation: {
                                title: 'Dashboard',
                                icon: 'dashboard'
                            }
                        },
                        cases: {
                            type: '',
                            layout: {
                                name: ''
                            },
                            access: 'private',
                            navigation: {
                                title: 'Cases',
                                icon: 'settings'
                            },
                            routes: {
                                some_cases: {
                                    type: '',
                                    layout: {
                                        name: ''
                                    },
                                    access: 'private',
                                    navigation: {
                                        icon: 'account_circle'
                                    },
                                    routes: {
                                        some_specifics: {
                                            type: '',
                                            layout: {
                                                name: ''
                                            },
                                            access: 'private',
                                            navigation: true
                                        }
                                    }
                                }
                            }
                        },
                        task: {
                            type: '',
                            layout: {
                                name: ''
                            },
                            access: 'private',
                            navigation: {
                                title: 'Tasks',
                                icon: 'assignment'
                            },
                            routes: {
                                some_tasks: {
                                    type: '',
                                    layout: {
                                        name: ''
                                    },
                                    access: 'private',
                                    navigation: false,
                                    routes: {
                                        some_specifics: {
                                            type: '',
                                            layout: {
                                                name: ''
                                            },
                                            access: 'private',
                                            navigation: true
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
                        access: 'public',
                        query: 'select * from case where title like ${some-param}'
                    }
                },
                i18n: [
                    'sk-SK',
                    'en-US'
                ],
                defaults: {
                    log: {
                        level: 'INFO',
                        logWithDate: true,
                        serializeExtraParams: true,
                        includeLogLevel: true,
                        publishers: [
                            'console'
                        ]
                    }
                }
            }
        );
    }
}
