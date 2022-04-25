import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardResourceService} from './dashboard-resource.service';

describe('DashboardResourceService', () => {
    let service: DashboardResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(DashboardResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getDashboardData', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getDashboardData('case', {aggs: {result: {terms: {field: 'dataSet.text.value.keyword'}}}}).subscribe(res => {
                        expect(res.aggregations).toEqual({});
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/dashboard/search?type=case');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({aggregations: {}});
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
