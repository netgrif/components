import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListDefaultFieldComponent } from './user-list-default-field.component';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MaterialModule,
    SideMenuService,
    TranslateLibModule,
    UserListField,
    WrappedBoolean
} from "@netgrif/components-core";
import {AngularResizeEventModule} from "angular-resize-event";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";

describe('UserListDefaultFieldComponent', () => {
  let component: UserListDefaultFieldComponent;
  let fixture: ComponentFixture<UserListDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [MaterialModule, AngularResizeEventModule, BrowserAnimationsModule, HttpClientTestingModule, TranslateLibModule],
        declarations: [
            UserListDefaultFieldComponent,
        ],
        providers: [
            SideMenuService,
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new UserListField('', '', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, undefined,
                        undefined),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<UserListField>
            }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-user-list-default-field [dataField]="field"> </nc-user-list-default-field>'
})
class TestWrapperComponent {
    field = new UserListField('', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, undefined,
        undefined);
}
