import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MultiUserAssignListComponent} from './multi-user-assign-list.component';
import {
    ConfigurationService,
    ErrorSnackBarComponent,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    UserListInjectedData,
    UserListService, UserListValue,
    UserValue
} from "@netgrif/components-core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MultiUserAssignItemComponent} from "./multi-user-assign-item/multi-user-assign-item.component";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('MultiUserAssignListComponent', () => {
    let component: MultiUserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                MultiUserAssignListComponent,
                MultiUserAssignItemComponent,
                ErrorSnackBarComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [
                        ErrorSnackBarComponent
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-multi-user-assign-list [searchUserControl]="formControl" [roles]="injectedData.roles"></nc-multi-user-assign-list>'
})
class TestWrapperComponent {
    injectedData = {
        roles: [],
        value: new UserListValue(new Map<string, UserValue>([['5', new UserValue('5', 'admin', 'netgrif', 'super@netgrif.com')]]))
    } as UserListInjectedData;
    formControl = new FormControl();
}
