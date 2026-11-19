import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterStringQueryFieldComponent} from './filter-string-query-field.component';
import {
    MaterialModule,
    TranslateLibModule,
    FilterField,
    DataFieldPortalData,
    DATA_FIELD_PORTAL_DATA,
    FieldTypeResource,
    ConfigurationService,
    TestConfigurationService,
    WrappedBoolean
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterStringQueryFieldComponent', () => {
    let component: FilterStringQueryFieldComponent;
    let fixture: ComponentFixture<FilterStringQueryFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterStringQueryFieldComponent],
            imports: [
                TranslateLibModule,
                MaterialModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', ''),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<FilterField>
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterStringQueryFieldComponent);
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
