import {TestBed} from '@angular/core/testing';
import {LogPublisherService} from './log-publisher.service';
import {LogPublisher} from '../publishers/log-publisher';
import {LogEntry} from '../models/log-entry';
import {LocalStorageLogPublisher} from '../publishers/local-storage-log-publisher';
import {LogLevel} from './log-level';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LogPublisherService', () => {
    let service: LogPublisherService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(LogPublisherService);
    });

    beforeEach(() => {
        spyOn(service, 'register').and.callThrough();
        spyOn(console, 'debug');
        spyOn(console, 'clear').and.callThrough();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should registry a publisher', () => {
        const publisher = new class extends LogPublisher {
            clear(): void {
            }

            log(entry: LogEntry): void {
            }
        }(service);
        expect(service.register).toHaveBeenCalled();
        expect(service.publishers.length).toBe(new TestConfigurationService().get().services.log.publishers.length + 1);
        expect(service.publishers).toContain(publisher);
    });

    it('should publish entry', () => {
        const testString = 'Test';
        service.publish(new LogEntry(LogLevel.DEBUG, testString));
        expect(console.debug).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeDefined();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toContain(testString);
    });

    it('should clear all the log', () => {
        service.clearAll();
        expect(console.clear).toHaveBeenCalled();
        expect(localStorage.getItem(LocalStorageLogPublisher.DEFAULT_KEY)).toBeFalsy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
