import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterFieldContentComponent} from './filter-field-content.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService, TestConfigurationService, FilterField, FilterType, NAE_FILTER_FIELD} from '@netgrif/components-core';
import {AdvancedSearchComponentModule} from '../../../search/advanced-search/advanced-search.module';

describe('FilterFieldContentComponent', () => {
    let component: FilterFieldContentComponent;
    let fixture: ComponentFixture<FilterFieldContentComponent>;

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
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_FILTER_FIELD, useValue: field}
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
