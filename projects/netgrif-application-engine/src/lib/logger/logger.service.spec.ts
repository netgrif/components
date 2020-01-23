import {TestBed} from '@angular/core/testing';

import {LoggerService, LogLevel} from './logger.service';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should returned formatted message', () => {
        const testString = 'Testing string to log: ';
        service.info(testString + 'INFO');
        service.debug(testString + 'DEBUG');
        service.error(testString + 'ERRROR');
        service.warn(testString + 'WARN');
        service.log(LogLevel.ALL, testString + ' WILD CARD');
    });
});
