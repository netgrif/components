import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFieldTabViewComponent } from './filter-field-tab-view.component';
import {
    ConfigurationService,
    FilterField,
    FieldTypeResource,
    NAE_FILTER_FIELD,
    TestConfigurationService
} from '@netgrif/components-core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AdvancedSearchComponentModule } from '../../search/advanced-search/advanced-search.module';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('FilterFieldTabViewComponent', () => {
    let component: FilterFieldTabViewComponent;
    let fixture: ComponentFixture<FilterFieldTabViewComponent>;

    beforeEach(async () => {
        const field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        await TestBed.configureTestingModule({
            declarations: [
                FilterFieldTabViewComponent
            ],
            imports: [
                AdvancedSearchComponentModule
            ],
            providers: [
                {provide: NAE_FILTER_FIELD, useValue: field},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
