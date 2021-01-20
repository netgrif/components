import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractSearchPredicateComponent} from './abstract-search-predicate.component';
import {Component, Inject} from '@angular/core';
import {NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';
import {LoggerService} from '../../logger/services/logger.service';
import {defaultCaseSearchCategoriesFactory} from '../category-factory/default-categories-factories';
import {CategoryFactory} from '../category-factory/category-factory';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractSearchPredicateComponent', () => {
    let component: TestSearchPredicateComponent;
    let fixture: ComponentFixture<TestSearchPredicateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                TestSearchPredicateComponent
            ],
            providers: [
                CategoryFactory,
                {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSearchPredicateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-search-predicate',
    template: ''
})
class TestSearchPredicateComponent extends AbstractSearchPredicateComponent {
    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Category<any>>,
                logger: LoggerService) {
        super(searchCategories, logger);
    }
}
