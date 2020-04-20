import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowViewComponent} from './workflow-view.component';
import {MaterialModule} from '../../material/material.module';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, TemplateRef} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PanelModule} from '../../panel/panel.module';
import {SideMenuContentModule} from '../../side-menu/content-components/side-menu-content.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {DashboardCardTypes} from '../../dashboard/cards/model/dashboard-card-types';

describe('WorkflowViewComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowViewComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientModule,
                PanelModule,
                HttpClientTestingModule,
                SideMenuContentModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkflowViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
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
