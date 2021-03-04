import {AbstractAdvancedSearchComponent} from './abstract-advanced-search.component';
import {Component} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {
    AdvancedSearchComponentInitializationService
} from '../advanced-search-component-initialization-service/advanced-search-component-initialization.service';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestCaseSearchServiceFactory} from '../../utility/tests/test-factory-methods';

describe('AbstractAdvancedSearchComponent', () => {
    let component: TestAdvancedSearchComponent;
    let fixture: ComponentFixture<TestAdvancedSearchComponent>;

    beforeEach(waitForAsync(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
            ],
            providers: [
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory}
            ],
            declarations: [
                TestAdvancedSearchComponent,
            ]
        }).compileComponents();
    })));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestAdvancedSearchComponent);
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
    template: '',
    providers: [AdvancedSearchComponentInitializationService]
})
class TestAdvancedSearchComponent extends AbstractAdvancedSearchComponent {
    constructor(searchService: SearchService, initializationService: AdvancedSearchComponentInitializationService) {
        super(searchService, initializationService);
    }
}
