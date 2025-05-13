import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RbacResourceService} from "./rbac-resource.service";

describe('RbacResourceService', () => {
    let service: RbacResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(RbacResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should findRoleIds', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.findRoleIds('actorId').subscribe(res => {
                        expect(res.size).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/authorization/actorId/roles');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
