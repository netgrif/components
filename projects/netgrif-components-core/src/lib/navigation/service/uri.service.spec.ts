import {TestBed} from '@angular/core/testing';
import { UriService } from './uri.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationService } from '../../configuration/configuration.service';
import { TestLoggingConfigurationService } from '../../utility/tests/test-logging-config';
import { AuthenticationModule } from '../../authentication/authentication.module';

describe('UriService', () => {
    let service: UriService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                AuthenticationModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService}
            ]
        });
        service = TestBed.inject(UriService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
