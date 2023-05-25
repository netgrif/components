import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    ConfigurationService,
    TestConfigurationService,
    FilterField,
    FilterType,
    NAE_FILTER_FIELD,
    SearchService, NAE_BASE_FILTER, SimpleFilter, BaseFilter
} from '@netgrif/components-core';
import {AdvancedSearchComponentModule} from '../../../search/advanced-search/advanced-search.module';
import { FilterFieldTabViewContentComponent } from './filter-field-tab-view-content.component';

describe('FilterFieldTabViewContentComponent', () => {
    let component: FilterFieldTabViewContentComponent;
    let fixture: ComponentFixture<FilterFieldTabViewContentComponent>;

    beforeEach(async () => {
        const field = new FilterField('', '', '', {
            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
        }, [], {}, '', '');

        await TestBed.configureTestingModule({
            imports: [
                AdvancedSearchComponentModule,
                HttpClientTestingModule
            ],
            providers: [
                SearchService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_FILTER_FIELD, useValue: field},
                {
                    provide: NAE_BASE_FILTER,
                    useValue: { filter: SimpleFilter.emptyCaseFilter()} as BaseFilter
                }
            ],
            declarations: [
                FilterFieldTabViewContentComponent
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
