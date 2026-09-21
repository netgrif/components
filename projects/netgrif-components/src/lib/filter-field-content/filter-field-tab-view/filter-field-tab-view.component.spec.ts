import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFieldTabViewComponent } from './filter-field-tab-view.component';
import {
    ConfigurationService,
    FilterField,
    FilterType,
    NAE_FILTER_FIELD,
    TestConfigurationService
} from '@netgrif/components-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdvancedSearchComponentModule } from '../../search/advanced-search/advanced-search.module';

describe('FilterFieldTabViewComponent', () => {
    let component: FilterFieldTabViewComponent;
    let fixture: ComponentFixture<FilterFieldTabViewComponent>;

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
                {provide: NAE_FILTER_FIELD, useValue: field},
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ],
            declarations: [
                FilterFieldTabViewComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFieldTabViewComponent);
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
