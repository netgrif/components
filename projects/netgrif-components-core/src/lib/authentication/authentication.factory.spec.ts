import {authenticationServiceFactory} from './authentication.factory';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestConfigurationService} from '../utility/tests/test-config';
import {BasicAuthenticationService} from './services/methods/basic-authentication/basic-authentication.service';
import {TestBed} from '@angular/core/testing';


describe('authenticationServiceFactory', () => {
    it('should use transform function', () => {
        const config = new TestConfigurationService();
        const http = new HttpClient(new OurHttp());
        expect(authenticationServiceFactory(config, http)).toEqual(new BasicAuthenticationService(http, config));
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class OurHttp extends HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return undefined;
    }
}
