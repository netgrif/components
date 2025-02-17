import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSingleTaskViewComponent } from './default-single-task-view.component';
import {HeaderComponentModule} from "../../../../../header/header.module";
import {PanelComponentModule} from "../../../../../panel/panel.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import {
    AuthenticationMethodService,
    ConfigurationService, FilterType,
    MaterialModule,
    NAE_TAB_DATA, SimpleFilter,
    TestConfigurationService,
    FilterField, NAE_NAVIGATION_ITEM_TASK_DATA, UserFilterConstants
} from "@netgrif/components-core";

describe('DefaultSingleTaskViewComponent', () => {
  let component: DefaultSingleTaskViewComponent;
  let fixture: ComponentFixture<DefaultSingleTaskViewComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
          imports: [
              MaterialModule,
              HeaderComponentModule,
              PanelComponentModule,
              BrowserAnimationsModule,
              RouterTestingModule.withRoutes([])
          ],
          providers: [
              {
                  provide: NAE_TAB_DATA,
                  useValue: {baseFilter: new SimpleFilter('id', FilterType.TASK, {}), tabSelected$: new Observable()}
              },
              AuthenticationMethodService,
              {provide: ConfigurationService, useClass: TestConfigurationService},
              {
                  provide: NAE_NAVIGATION_ITEM_TASK_DATA,
                  useValue: [
                      {fields: []},
                      {
                          fields: [
                              new FilterField(
                                  UserFilterConstants.FILTER_FIELD_ID,
                                  '',
                                  '',
                                  {
                                      filterType: FilterType.TASK,
                                      predicateMetadata: [],
                                      searchCategories: []
                                  },
                                  [],
                                  {visible: true},
                                  '',
                                  ''
                              )
                          ]
                      }
                  ]
              },
          ],
          declarations: [DefaultSingleTaskViewComponent]
      })
          .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSingleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
