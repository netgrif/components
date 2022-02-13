import {TestBed} from '@angular/core/testing';
import {AllowedNetsService} from './allowed-nets.service';
import {TestNoAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from './factory/allowed-nets-service-factory';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {ProcessService} from '../../process/process.service';

describe('AllowedNetsService', () => {
    let service: AllowedNetsService;
    let mockProcessService: MockProcessService;

    describe('with no nets', () => {

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

    });

    describe('with mocked process service', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                    {provide: ProcessService, useClass: MockProcessService}
                ]
            });
            service = TestBed.inject(AllowedNetsService);
            mockProcessService = TestBed.inject(ProcessService) as unknown as MockProcessService;
        });

        it('should share allowed nets', () => {
            expect(service).toBeTruthy();
            const sub1 = service.allowedNets$.subscribe(() => {});
            const callsAfterOneSub = mockProcessService.numberOfCalls;
            const sub2 = service.allowedNets$.subscribe(() => {});
            expect(mockProcessService.numberOfCalls).toEqual(callsAfterOneSub);
            sub1.unsubscribe();
            sub2.unsubscribe();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Injectable()
class MockProcessService {
    public numberOfCalls = 0;

    public getNets() {
        this.numberOfCalls++;
        return of([]);
    }
}
