import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterStringQueryFieldComponent} from './filter-string-query-field.component';
import {
    MaterialModule,
    TranslateLibModule,
    FilterField,
    DataFieldPortalData,
    DATA_FIELD_PORTAL_DATA,
    FilterType,
    ConfigurationService,
    TestConfigurationService,
    WrappedBoolean
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControl, ReactiveFormsModule} from '@angular/forms';

describe('FilterStringQueryFieldComponent', () => {
    let component: FilterStringQueryFieldComponent;
    let fixture: ComponentFixture<FilterStringQueryFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterStringQueryFieldComponent],
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
                NoopAnimationsModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new FilterField('', '', '', {
                            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
                        }, [], {}, '', ''),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<FilterField>
                }
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
