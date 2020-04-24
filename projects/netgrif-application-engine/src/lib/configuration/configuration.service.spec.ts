import {TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {DashboardCardTypes} from '../dashboard/cards/model/dashboard-card-types';
import {TestConfigurationService} from '../utility/tests/test-config';

describe('ConfigurationService', () => {
    let service: ConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(ConfigurationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get config', () => {
        service.getAsync().subscribe(conf => {
            expect(conf).toEqual(service.get());
        })

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
                    verify: 'auth/token/verify',
                    invite: 'auth/invite'
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
        });
    });

    it('should get dashboard', () => {
        expect(service.getViewByPath('dashboard')).toEqual( {
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
        });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
