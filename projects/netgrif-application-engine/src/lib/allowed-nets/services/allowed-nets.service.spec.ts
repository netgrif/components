import {TestBed} from '@angular/core/testing';
import {AllowedNetsService} from './allowed-nets.service';
import {TestNoAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from './factory/allowed-nets-service-factory';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('AllowedNetsService', () => {
    let service: AllowedNetsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        });
        service = TestBed.inject(AllowedNetsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
