import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDefaultFieldComponent } from './filter-default-field.component';
import {
    ConfigurationService,
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData, FilterField, FieldTypeResource,
    MaterialModule,
    TestConfigurationService, WrappedBoolean
} from "@netgrif/components-core";
import {AdvancedSearchComponentModule} from "../../../search/advanced-search/advanced-search.module";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import {FilterFieldComponent} from "../filter-field.component";
import {FilterFieldContentComponent} from "../filter-field-content/filter-field-content.component";
import {FormControl} from "@angular/forms";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterDefaultFieldComponent', () => {
  let component: FilterDefaultFieldComponent;
  let fixture: ComponentFixture<FilterDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [
            DataFieldTemplateComponent,
            RequiredLabelComponent,
            FilterFieldComponent,
            FilterFieldContentComponent,
            FilterDefaultFieldComponent
        ],
        imports: [
            MaterialModule,
            AdvancedSearchComponentModule
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
    fixture = TestBed.createComponent(FilterDefaultFieldComponent);
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
