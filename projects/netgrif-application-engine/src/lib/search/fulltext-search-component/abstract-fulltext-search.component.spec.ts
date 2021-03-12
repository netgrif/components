import {AbstractFulltextSearchComponent} from './abstract-fulltext-search.component';
import {Component} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TestCaseBaseFilterProvider} from '../../utility/tests/test-factory-methods';

describe('AbstractFulltextSearchComponent', () => {
    let component: TestFulltextSearchComponent;
    let fixture: ComponentFixture<TestFulltextSearchComponent>;

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
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

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
