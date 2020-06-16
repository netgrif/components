import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LanguageSelectorComponent} from './language-selector.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';

describe('LanguageSelectorComponent', () => {
    let component: LanguageSelectorComponent;
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
            declarations: [LanguageSelectorComponent, TestWrapperComponent],
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
    template: '<nae-language-selector language="sk"></nae-language-selector>'
})
class TestWrapperComponent {
    lang = 'sk';
}
