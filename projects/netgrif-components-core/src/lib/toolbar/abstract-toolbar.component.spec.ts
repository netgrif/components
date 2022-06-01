import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractToolbarComponent} from './abstract-toolbar.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../translate/language.service';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {AuthenticationService} from '../authentication/services/authentication/authentication.service';
import {MockUserResourceService} from '../utility/tests/mocks/mock-user-resource.service';
import {MockAuthenticationService} from '../utility/tests/mocks/mock-authentication.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {UserResourceService} from '../resources/engine-endpoint/user-resource.service';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {MaterialModule} from '../material/material.module';

describe('AbstractToolbarComponent', () => {
    let component: TestToolbarComponent;
    let fixture: ComponentFixture<TestToolbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ],
            declarations: [TestToolbarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestToolbarComponent);
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

@Component({
    selector: 'ncc-test-toolbar',
    template: ''
})
class TestToolbarComponent extends AbstractToolbarComponent {
    constructor(protected translate: TranslateService, protected selectLangService: LanguageService) {
        super(translate, selectLangService);
    }
}
