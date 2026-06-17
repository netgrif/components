import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {of} from 'rxjs';

import {ProxyAuthenticationService} from './proxyAuthentication.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ProxyAuthenticationService', () => {
    let service: ProxyAuthenticationService;
    let httpMock: HttpTestingController;

    const mockConfig: Partial<ConfigurationService> = {
        loaded$: of(true) as any,

        snapshot: {
            providers: {
                auth: {
                    authentication: 'basic',
                    address: 'http://localhost:8080',
                    endpoints: {login: '/api/auth/login'}
                }
            }
        } as any,

        get(): any {
            return (this.snapshot as any);
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ProxyAuthenticationService,
                {provide: ConfigurationService, useValue: mockConfig}
            ]
        });

        service = TestBed.inject(ProxyAuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('delegates to BasicAuthenticationService when auth=basic', fakeAsync(() => {
        const credentials: any = {username: 'u', password: 'p'};
        let response: any;

        service.login(credentials).subscribe(res => response = res);

        const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
        expect(req.request.method).toBe('GET');

        req.flush({id: '1', name: 'User'});

        tick();

        expect(response).toBeTruthy();
    }));
});
