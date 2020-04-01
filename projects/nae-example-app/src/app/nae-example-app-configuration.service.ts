import { Injectable } from '@angular/core';
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
                    sessionBearer: 'x-auth-token'
                },
                resources: [{
                    name: 'main',
                    address: 'http://localhost:8080/api/',
                    format: 'json'
                }]
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
                name: 'default',
                pallets: {
                    light: {
                        primary: 'blue'
                    },
                    dark: {
                        primary: 'blue'
                    }

                }
            },
            assets: [],
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
        });
    }
}
