import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {QuickPanelComponent} from './quick-panel.component';
import {CommonModule} from '@angular/common';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {InternalLinkComponent} from './internal-link/internal-link.component';
import {LogoutShortcutComponent} from './logout-shortcut/logout-shortcut.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
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
} from '@netgrif/application-engine';

describe('QuickPanelComponent', () => {
    let component: QuickPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ],
            declarations: [
                QuickPanelComponent,
                LanguageSelectorComponent,
                InternalLinkComponent,
                LogoutShortcutComponent,
                TestWrapperComponent
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
    template: '<nc-quick-panel [items]="items"></nc-quick-panel>'
})
class TestWrapperComponent {
    items = [];
}


