import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDefaultFieldComponent } from './filter-default-field.component';
import {
    ConfigurationService,
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData, FilterField, FilterType,
    MaterialModule,
    TestConfigurationService, WrappedBoolean
} from "@netgrif/components-core";
import {AdvancedSearchComponentModule} from "../../../search/advanced-search/advanced-search.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import {FilterFieldComponent} from "../filter-field.component";
import {FilterFieldContentComponent} from "../filter-field-content/filter-field-content.component";
import {FormControl} from "@angular/forms";

describe('FilterDefaultFieldComponent', () => {
  let component: FilterDefaultFieldComponent;
  let fixture: ComponentFixture<FilterDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            MaterialModule,
            AdvancedSearchComponentModule,
            HttpClientTestingModule
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
        ],
        declarations: [
            DataFieldTemplateComponent,
            RequiredLabelComponent,
            FilterFieldComponent,
            FilterFieldContentComponent,
            FilterDefaultFieldComponent
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
