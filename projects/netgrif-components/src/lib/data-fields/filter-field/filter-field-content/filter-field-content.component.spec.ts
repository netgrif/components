import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterFieldContentComponent} from './filter-field-content.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    ConfigurationService, TestConfigurationService, FilterField, FieldTypeResource, NAE_FILTER_FIELD,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES
} from '@netgrif/components-core';
import {AdvancedSearchComponentModule} from '../../../search/advanced-search/advanced-search.module';

describe('FilterFieldContentComponent', () => {
    let component: FilterFieldContentComponent;
    let fixture: ComponentFixture<FilterFieldContentComponent>;

    beforeEach(async () => {
        const field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        await TestBed.configureTestingModule({
            imports: [
                AdvancedSearchComponentModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_FILTER_FIELD, useValue: field},
                NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
                NAE_DEFAULT_TASK_SEARCH_CATEGORIES
            ],
            declarations: [
                FilterFieldContentComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFieldContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
