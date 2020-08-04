import {TestBed} from '@angular/core/testing';
import {RoutingBuilderService} from './routing-builder.service';
import {ViewService} from '../view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {RouterModule} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('RoutingBuilderService', () => {
    let service: RoutingBuilderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([]), NoopAnimationsModule],
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
});
