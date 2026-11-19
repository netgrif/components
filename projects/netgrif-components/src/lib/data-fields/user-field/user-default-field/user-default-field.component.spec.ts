import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefaultFieldComponent } from './user-default-field.component';
import {
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData,
    MaterialModule,
    SideMenuService,
    TranslateLibModule,
    UserField, WrappedBoolean
} from "@netgrif/components-core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('UserDefaultFieldComponent', () => {
  let component: UserDefaultFieldComponent;
  let fixture: ComponentFixture<UserDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [UserDefaultFieldComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
            MaterialModule,
            TranslateLibModule
        ],
        providers: [
            SideMenuService,
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new UserField('', '', {
                        required: true,
                        optional: true,
                        visible: true,
                        editable: true,
                        hidden: true
                    }, undefined, []),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<UserField>
            },
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefaultFieldComponent);
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
