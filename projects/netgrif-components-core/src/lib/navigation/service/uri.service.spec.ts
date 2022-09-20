import {TestBed} from '@angular/core/testing';
import { UriService } from './uri.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationService } from '../../configuration/configuration.service';
import { TestLoggingConfigurationService } from '../../utility/tests/test-logging-config';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { UriResourceService } from './uri-resource.service';
import { MockUriResourceService } from '../../utility/tests/mocks/mock-uri-resource.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UriService', () => {
    let service: UriService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                AuthenticationModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService},
                {provide: UriResourceService, useClass: MockUriResourceService}
            ]
        });
        service = TestBed.inject(UriService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get node by path', done => {
        const sub = service.getNodeByPath('test');
        sub.subscribe(res => {
            expect(res.uriPath).toEqual('root/test1')
            done();
        })
    });

    it('should get nodes by level', done => {
        const sub = service.getNodesOnLevel(1);
        sub.subscribe(res => {
            expect(res.length).toEqual(2)
            done();
        })
    });

    it('should get child nodes', done => {
        const sub = service.getChildNodes();
        sub.subscribe(res => {
            expect(res.length).toEqual(2)
            done();
        })
    });

});
