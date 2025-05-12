import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActorResourceService} from "./actor-resource.service";

describe('ActorResourceService', () => {
    let service: ActorResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(ActorResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should assignRoles', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.assignRoles('id', {}).subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/authorization/id/assign');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    // todo 2058 remove roles

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
