import {inject, TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ConfigurationService', () => {
    let service: ConfigurationService;

    describe('with TestConfigurationService', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
                providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
            });
            service = TestBed.inject(ConfigurationService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should get config', (done) => {
            service.getAsync().subscribe(conf => {
                expect(conf).toEqual(service.get());
                done();
            });
        });

        it('should get providers', () => {
            expect(service.get().providers).toEqual({
                auth: {
                    address: 'http://localhost:8080/api/',
                    authentication: 'Basic',
                    endpoints: {
                        login: 'auth/login',
                        logout: 'auth/logout',
                        signup: 'auth/signup',
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
            });
        });

        it('should get dashboard', () => {
            expect(service.getViewByPath('dashboard')).toEqual({
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
            });
        });

        // NAE-1179
        it('should get view by path', () => {
            expect(service.getViewByPath('task')).toEqual({
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
            });
            expect(service.getViewByPath('non_existent')).toBeUndefined();
        });

        // NAE-1179
        it('should get child view by path', () => {
            expect(service.getViewByPath('task/some_tasks')).toEqual({
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
            });
            expect(service.getViewByPath('task/non_existent')).toBeUndefined();
        });

        it('URLs should be absolute', () => {
            const config = service.getConfigurationSubtree(['providers']);
            expect(config).toBeTruthy();
            expect(config?.auth?.address).toEqual('http://localhost:8080/api/');
            const resources = config?.resources;
            expect(Array.isArray(resources)).toBeTrue();
            resources.forEach(resource => {
                expect(resource?.address).toEqual('http://localhost:8080/api/');
            });
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    describe('with relative URLs', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, RouterTestingModule.withRoutes([])],
                providers: [{provide: ConfigurationService, useClass: RelativeURLsConfigurationService}]
            });
            service = TestBed.inject(ConfigurationService);
        });

        it('URLs should be relative', () => {
            const urlBase = location.origin;
            const config = service.getConfigurationSubtree(['providers']);
            expect(config).toBeTruthy();
            expect(config?.auth?.address).toEqual(`${urlBase}/api/hello`);
            const resources = config?.resources;
            expect(Array.isArray(resources)).toBeTrue();
            resources.forEach(resource => {
                expect(resource?.address).toEqual(`${urlBase}/api/world`);
            });
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });
});

class RelativeURLsConfigurationService extends TestConfigurationService {
    constructor() {
        super();
        this.configuration.providers.auth.address = '/hello';
        (this.configuration.providers.resources as any).forEach(resource => {
            resource.address = '/world';
        });
        this.resolveEndpointURLs(); // resolveURLs is called in super, and we changed the URLs to relative later
    }
}
