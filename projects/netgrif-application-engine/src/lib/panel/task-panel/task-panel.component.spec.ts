import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPanelComponent} from './task-panel.component';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {Observable, of, Subject} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from './policy';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {ConfigurationService} from '../../configuration/configuration.service';
import {DashboardCardTypes} from '@netgrif/application-engine';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {TaskViewService} from '../../view/task-view/task-view.service';

describe('TaskPanelComponent', () => {
    let component: TaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                AuthenticationModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                TaskViewService
            ],
            declarations: [TestWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-task-panel [taskPanelData]="taskPanel" [selectedHeaders$]="selectedHeaders$"></nae-task-panel>'
})
class TestWrapperComponent {
    taskPanel: TaskPanelData = {
        task: {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            cols: undefined,
            dataGroups: [],
            _links: {}
        },
        changedFields: new Subject<ChangedFields>()
    };
    selectedHeaders$ = new Observable<Array<HeaderColumn>>();
}

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
