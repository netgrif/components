import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefaultFieldComponent } from './user-default-field.component';
import {
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData,
    MaterialModule,
    SideMenuService,
    TranslateLibModule,
    UserField, WrappedBoolean
} from "@netgrif/components-core";
import {AngularResizeEventModule} from "angular-resize-event";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";

describe('UserDefaultFieldComponent', () => {
  let component: UserDefaultFieldComponent;
  let fixture: ComponentFixture<UserDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [MaterialModule, AngularResizeEventModule, BrowserAnimationsModule, HttpClientTestingModule, TranslateLibModule],
        declarations: [UserDefaultFieldComponent],
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
            }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
