import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractQuickPanelComponent} from './abstract-quick-panel.component';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {LanguageService} from '../../../translate/language.service';

describe('AbstractQuickPanelComponent', () => {
    let component: TestQuickPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
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
                TestQuickPanelComponent,
                TestWrapperComponent
            ]
        }).compileComponents();

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
    selector: 'ncc-test-quick-panel',
    template: ''
})
class TestQuickPanelComponent extends AbstractQuickPanelComponent {
    constructor(protected _select: LanguageService) {
        super(_select);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-quick-panel [items]="items"></ncc-test-quick-panel>'
})
class TestWrapperComponent {
    items = [];
}


