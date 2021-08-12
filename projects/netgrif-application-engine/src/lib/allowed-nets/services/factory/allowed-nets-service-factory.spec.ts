import {TestBed} from '@angular/core/testing';
import {AllowedNetsServiceFactory} from './allowed-nets-service-factory';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('AllowedNetsServiceFactory', () => {
    let service: AllowedNetsServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
