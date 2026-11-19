import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListDefaultFieldComponent } from './user-list-default-field.component';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MaterialModule,
    SideMenuService,
    TranslateLibModule,
    UserListField,
    WrappedBoolean,
    UserListValue
} from "@netgrif/components-core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from "@angular/core";
import {FormControl} from "@angular/forms";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('UserListDefaultFieldComponent', () => {
  let component: UserListDefaultFieldComponent;
  let fixture: ComponentFixture<UserListDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [UserListDefaultFieldComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
            MaterialModule,
            TranslateLibModule
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
                        }, new UserListValue(new Map()),
                        undefined),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<UserListField>
            },
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListDefaultFieldComponent);
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

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-user-list-default-field [dataField]="field"> </nc-user-list-default-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
