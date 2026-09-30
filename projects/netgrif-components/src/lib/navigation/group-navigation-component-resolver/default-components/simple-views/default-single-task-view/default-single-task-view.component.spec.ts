import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSingleTaskViewComponent } from './default-single-task-view.component';
import {HeaderComponentModule} from "../../../../../header/header.module";
import {PanelComponentModule} from "../../../../../panel/panel.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import {
    AuthenticationMethodService,
    ConfigurationService,
    FieldTypeResource,
    MaterialModule,
    FilterType,
    NAE_TAB_DATA, SimpleFilter,
    TestConfigurationService,
    GroupNavigationConstants,
    FilterField, NAE_NAVIGATION_ITEM_TASK_DATA, BooleanField
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
                                  GroupNavigationConstants.ITEM_FIELD_TASK_FILTER,
                                  '',
                                  '',
                                  FieldTypeResource.CASE_FILTER,
                                  [],
                                  {visible: true},
                                  '',
                                  ''
                              ),
                              new BooleanField(
                                  GroupNavigationConstants.ITEM_FIELD_SHOW_PAGE_FOOTER,
                                  '',
                                  true,
                                  {visible: true}
                              ),
                              new BooleanField(
                                  GroupNavigationConstants.ITEM_FIELD_SHOW_PAGE_HEADER,
                                  '',
                                  true,
                                  {visible: true}
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

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
