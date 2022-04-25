import {TestBed} from '@angular/core/testing';
import {RoutingBuilderService} from './routing-builder.service';
import {ViewService} from '../view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RoutingBuilderService', () => {
    let service: RoutingBuilderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                {provide: ViewService, useClass: TestViewService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(RoutingBuilderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
