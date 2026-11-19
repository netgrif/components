import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    ConfigurationService,
    TestConfigurationService,
    FilterField,
    FieldTypeResource,
    NAE_FILTER_FIELD,
    SearchService, NAE_BASE_FILTER, SimpleFilter, BaseFilter
} from '@netgrif/components-core';
import {AdvancedSearchComponentModule} from '../../../search/advanced-search/advanced-search.module';
import { FilterFieldTabViewContentComponent } from './filter-field-tab-view-content.component';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterFieldTabViewContentComponent', () => {
    let component: FilterFieldTabViewContentComponent;
    let fixture: ComponentFixture<FilterFieldTabViewContentComponent>;

    beforeEach(async () => {
        const field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        await TestBed.configureTestingModule({
            declarations: [FilterFieldTabViewContentComponent],
            imports: [
                AdvancedSearchComponentModule
            ],
            providers: [
                SearchService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_FILTER_FIELD, useValue: field},
                {
                    provide: NAE_BASE_FILTER,
                    useValue: { filter: SimpleFilter.emptyCaseFilter()} as BaseFilter
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFieldTabViewContentComponent);
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
