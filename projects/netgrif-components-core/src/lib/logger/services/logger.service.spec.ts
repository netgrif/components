import {TestBed} from '@angular/core/testing';
import {LoggerService} from './logger.service';
import {LocalStorageLogPublisher} from '../publishers/local-storage-log-publisher';
import {LogLevel} from './log-level';
import {ConfigurationService} from '../../configuration/configuration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestLoggingConfigurationService} from '../../utility/tests/test-logging-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoggerService', () => {
    const testString = 'Testing string to log: ';
    let service: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService}
            ]
        });
        service = TestBed.inject(LoggerService);

        spyOn(console, 'log');
        spyOn(console, 'info');
        spyOn(console, 'debug');
        spyOn(console, 'warn');
        spyOn(console, 'error');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have set log level', () => {
        expect(service.level).toBeDefined();
        expect(service.level).toBe(LogLevel.ALL);
    });

    it('should call info log', () => {
        service.info(testString + 'INFO');
        expect(console.info).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeDefined();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toContain(testString);
    });

    it('should call debug log', () => {
        service.debug(testString + 'DEBUG');
        expect(console.debug).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeDefined();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toContain(testString);
    });

    it('should call error log', () => {
        service.error(testString + 'ERRROR', new Error('Error message').toString(), {data: 'This is a object that failed'});
        expect(console.error).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeDefined();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toContain(testString);
    });

    it('should call warn log', () => {
        service.warn(testString + 'WARN');
        expect(console.warn).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeDefined();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toContain(testString);
    });

    it('should call generic log', () => {
        service.log(LogLevel.ALL, testString + ' WILD CARD', {extraData: 'Foo message'});
        expect(console.log).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeDefined();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toContain(testString);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
