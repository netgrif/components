import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {AbstractProfileComponent} from './abstract-profile.component';
import {UserService} from '../services/user.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';

describe('AbstractProfileComponent', () => {
    let component: TestProfileComponent;
    let fixture: ComponentFixture<TestProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [ TestProfileComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-user',
    template: ''
})
class TestProfileComponent extends AbstractProfileComponent {
    constructor(protected _userService: UserService) {
        super(_userService);
    }
}
