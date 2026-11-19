import {TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AnonymousService} from './anonymous.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AnonymousService', () => {
    let service: AnonymousService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes([])],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(AnonymousService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

