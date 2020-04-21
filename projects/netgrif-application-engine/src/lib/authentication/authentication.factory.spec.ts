import {authenticationServiceFactory} from './authentication.factory';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestConfigurationService} from '../utility/tests/test-config';


describe('authenticationServiceFactory', () => {
    it('should use transform function', () => {
        const config = new TestConfigurationService();
        const http = new HttpClient(new OurHttp());
        expect(authenticationServiceFactory(config, http)).toBeTruthy();
    });
});

class OurHttp extends HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return undefined;
    }
}
