import {TestBed} from '@angular/core/testing';
import {EventQueueService} from './event-queue.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('EventQueueService', () => {
    let service: EventQueueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(EventQueueService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
