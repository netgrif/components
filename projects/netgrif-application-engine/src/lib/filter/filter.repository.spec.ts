import {FilterRepository} from './filter.repository';
import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {SimpleFilter} from './models/simple-filter';
import {FilterType} from './models/filter-type';
import {LoggerService} from '../logger/services/logger.service';

describe('FilterRepository', () => {
    let service: FilterRepository;
    let logSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(FilterRepository);

        logSpy = spyOn(TestBed.inject(LoggerService), 'warn');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set and get filters', () => {
        service.saveFilter(new SimpleFilter('id', FilterType.TASK, {}));
        service.saveFilter(new SimpleFilter('id', FilterType.TASK, {}));
        expect(logSpy).toHaveBeenCalledWith(`Filter with id 'id' already exists in the repository and will be replaced!`);
        expect(service.getFilter('id')).toEqual(new SimpleFilter('id', FilterType.TASK, {}));
    });

    afterAll(() => {
         TestBed.resetTestingModule();
    });
});

