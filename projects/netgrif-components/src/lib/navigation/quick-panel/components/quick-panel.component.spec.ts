import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {QuickPanelComponent} from './quick-panel.component';
import {CommonModule} from '@angular/common';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {InternalLinkComponent} from './internal-link/internal-link.component';
import {LogoutShortcutComponent} from './logout-shortcut/logout-shortcut.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('QuickPanelComponent', () => {
    let component: QuickPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                QuickPanelComponent,
                LanguageSelectorComponent,
                InternalLinkComponent,
                LogoutShortcutComponent,
                TestWrapperComponent
            ],
            imports: [
                CommonModule,
                RouterTestingModule,
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '<nc-quick-panel [items]="items"></nc-quick-panel>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    items = [];
}


