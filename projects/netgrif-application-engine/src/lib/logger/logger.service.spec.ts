import {TestBed} from '@angular/core/testing';

import {LoggerService} from './logger.service';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [LoggerService]});
        service = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should returned formatted message', () => {
        const testString = 'Testing string to log';
        const logged = service.info(testString);
        expect(logged).toBeInstanceOf(String);
        expect(logged).toContain(testString);
    });
});
