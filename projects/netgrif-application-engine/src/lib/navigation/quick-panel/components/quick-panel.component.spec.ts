import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {QuickPanelComponent} from './quick-panel.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {InternalLinkComponent} from './internal-link/internal-link.component';
import {LogoutShortcutComponent} from './logout-shortcut/logout-shortcut.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('QuickPanelComponent', () => {
    let component: QuickPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthenticationMethodService,
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-quick-panel [items]="items"></nae-quick-panel>'
})
class TestWrapperComponent {
    items = [];
}


