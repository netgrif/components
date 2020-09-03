import {TestBed} from '@angular/core/testing';
import {CaseViewService} from './case-view-service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Observable, of} from 'rxjs';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {ConfigCaseViewServiceFactory} from './factory/config-case-view-service-factory';
import {SearchService} from '../../../search/search-service/search.service';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {FilterType} from '../../../filter/models/filter-type';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Task} from '../../../resources/interface/task';
import {Page} from '../../../resources/interface/page';
import {tap, delay} from 'rxjs/operators';
import {Case} from '../../../resources/interface/case';

const localCaseViewServiceFactory = (factory: ConfigCaseViewServiceFactory) => {
    return factory.create('cases');
};

const searchServiceFactory = () => {
    return new SearchService(new SimpleFilter('', FilterType.CASE, {}));
};

describe('CaseViewService', () => {
    let service: CaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule,
                NoopAnimationsModule],
            providers: [
                {provide: CaseResourceService, useClass: MyResources},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                ConfigCaseViewServiceFactory,
                {
                    provide: CaseViewService,
                    useFactory: localCaseViewServiceFactory,
                    deps: [ConfigCaseViewServiceFactory]
                },
                {
                    provide: SearchService,
                    useFactory: searchServiceFactory
                }
            ]
        });
        service = TestBed.inject(CaseViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load cases', () => {
        service.reload();
        service.cases$.subscribe(res => {
            expect(res.length).toEqual(0);
        });

        service.reload();
        service.cases$.subscribe(res => {
            expect(res.length).toEqual(0);
        });

        service.loading$.subscribe(res => {
            expect(res).toBeFalse();
        });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyResources {
    private delay = 0;
    private result: Array<Case> = [];
    private callback: () => void = () => {};

    setResponse(_delay: number, cases: Array<Case>, callback: () => void = () => {}) {
        this.delay = _delay;
        this.result = cases;
        this.callback = callback;
    }

    searchCases(): Observable<Page<Case>> {
        const callback = this.callback;
        const content = [...this.result];
        return of({
            content,
            pagination: {
                size: content.length,
                totalElements: content.length,
                totalPages: 1,
                number: 0
            }
        }).pipe(delay(this.delay),
            tap(() => {
                callback();
            })
        );
    }
}
