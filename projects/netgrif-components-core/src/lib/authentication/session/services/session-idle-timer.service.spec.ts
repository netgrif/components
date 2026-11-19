import {TestBed} from "@angular/core/testing";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {TestConfigurationService} from "../../../utility/tests/test-config";
import {SessionIdleTimerService} from "./session-idle-timer.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('SessionIdleTimerService', () => {
    let service: SessionIdleTimerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes([])],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(SessionIdleTimerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start/stop timer', () => {
        expect(service.startTimer).toBeTruthy();
        expect(service.remainSeconds$).toBeTruthy();
        expect(service.stopTimer).toBeTruthy();
    });


    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
