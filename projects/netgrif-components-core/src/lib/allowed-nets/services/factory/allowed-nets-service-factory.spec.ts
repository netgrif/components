import {TestBed} from '@angular/core/testing';
import {AllowedNetsServiceFactory} from './allowed-nets-service-factory';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AllowedNetsServiceFactory', () => {
    let service: AllowedNetsServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(AllowedNetsServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
