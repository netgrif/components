import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewCaseComponent} from './new-case.component';
import {CommonModule} from '@angular/common';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {HotkeyModule, HotkeysService} from 'angular2-hotkeys';
import {
    ConfigurationService,
    ErrorSnackBarComponent,
    MaterialModule,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    SnackBarModule,
    SuccessSnackBarComponent,
    TestConfigurationService,
    TranslateLibModule,
    NewCaseCreationConfigurationData
} from '@netgrif/components-core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('NewCaseComponent', () => {
    let component: NewCaseComponent;
    let fixture: ComponentFixture<NewCaseComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NewCaseComponent],
            imports: [
                CommonModule,
                MaterialModule,
                SnackBarModule,
                TranslateLibModule,
                HotkeyModule.forRoot()
            ],
            providers: [
                HotkeysService,
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(undefined, undefined, () => of('close'), {
                        allowedNets$: of([]),
                        newCaseCreationConfiguration: {
                            isCaseTitleRequired: true,
                            enableCaseTitle: true
                        } as NewCaseCreationConfigurationData
                    })
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
