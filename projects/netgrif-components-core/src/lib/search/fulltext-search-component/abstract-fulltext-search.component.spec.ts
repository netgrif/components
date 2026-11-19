import {AbstractFulltextSearchComponent} from './abstract-fulltext-search.component';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TestCaseBaseFilterProvider} from '../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractFulltextSearchComponent', () => {
    let component: TestFulltextSearchComponent;
    let fixture: ComponentFixture<TestFulltextSearchComponent>;
    let searchService: SearchService;

    beforeEach(waitForAsync(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestFulltextSearchComponent],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    })));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFulltextSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        searchService = TestBed.inject(SearchService);
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    // NAE-1243
    it('should set and clear fulltext search', fakeAsync(() => {
        const fc = component.fullTextFormControl;
        expect(fc).toBeTruthy();
        const spySet = spyOn(searchService, 'setFullTextFilter');
        const spyClear = spyOn(searchService, 'clearFullTextFilter');
        fc.setValue('hello world');
        tick(600);
        expect(spySet).toHaveBeenCalled();
        fc.setValue('');
        tick(600);
        expect(spyClear).toHaveBeenCalled();
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});


@Component({
    selector: 'ncc-test-fulltext-search',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestFulltextSearchComponent extends AbstractFulltextSearchComponent {
    constructor(searchService: SearchService) {
        super(searchService);
    }
}
