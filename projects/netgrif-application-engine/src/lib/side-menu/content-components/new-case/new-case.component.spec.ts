import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCaseComponent} from './new-case.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {DashboardCardTypes} from '@netgrif/application-engine';

describe('NewCaseComponent', () => {
    let component: NewCaseComponent;
    let fixture: ComponentFixture<NewCaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [NewCaseComponent],
            providers: [{
                provide: NAE_SIDE_MENU_CONTROL, factory: () => {
                        return new SideMenuControl(undefined, undefined, undefined, []);
                    }
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
                ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class TestConfigurationService extends ConfigurationService {
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
                        layout: {
                            name: 'dashboard',
                            params: {
                                columns: 4,
                                cards: [{
                                    type: DashboardCardTypes.COUNT,
                                    title: 'All tasks',
                                    resourceType: 'task',
                                    filter: '{}',
                                    layout: {
                                        x: 0,
                                        y: 0,
                                        rows: 1,
                                        cols: 1
                                    }
                                }, {
                                    type: DashboardCardTypes.IFRAME,
                                    url: 'https://netgrif.com/',
                                    layout: {
                                        x: 2,
                                        y: 0,
                                        rows: 2,
                                        cols: 2
                                    }
                                }, {
                                    type: DashboardCardTypes.COUNT,
                                    title: 'All cases',
                                    resourceType: 'case',
                                    filter: '{}',
                                    layout: {
                                        x: 1,
                                        y: 1,
                                        rows: 1,
                                        cols: 1
                                    }
                                }]
                            }
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
        });
    }
}

