import {AbstractFulltextSearchComponent} from './abstract-fulltext-search.component';
import {Component} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TestCaseBaseFilterProvider} from '../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('AbstractFulltextSearchComponent', () => {
    let component: TestFulltextSearchComponent;
    let fixture: ComponentFixture<TestFulltextSearchComponent>;
    let searchService: SearchService;

    beforeEach(waitForAsync(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
            ],
            providers: [
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                TestFulltextSearchComponent,
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
    selector: 'nae-test-fulltext-search',
    template: ''
})
class TestFulltextSearchComponent extends AbstractFulltextSearchComponent {
    constructor(searchService: SearchService) {
        super(searchService);
    }
}
