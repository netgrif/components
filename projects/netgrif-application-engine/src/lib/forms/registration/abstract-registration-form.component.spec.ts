import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {FormBuilder} from '@angular/forms';
import {AbstractRegistrationFormComponent} from './abstract-registration-form.component';
import {LoggerService} from '../../logger/services/logger.service';

describe('AbstractRegistrationPanelComponent', () => {
    let component: TestRegFormComponent;
    let fixture: ComponentFixture<TestRegFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [TestRegFormComponent],
            providers: [
                SignUpService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRegFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', () => {
        component.rootFormGroup.controls['email'].setValue('mail@mail.sk');
        component.rootFormGroup.controls['name'].setValue('name');
        component.rootFormGroup.controls['surname'].setValue('surname');
        component.rootFormGroup.controls['password'].setValue('passwd');
        component.rootFormGroup.controls['confirmPassword'].setValue('passwd');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({
                token: undefined,
                email: 'mail@mail.sk',
                name: 'name',
                surname: 'surname',
                password: 'passwd'
            });
        });
        component.register.subscribe(event => {
            expect(event).toEqual({error: 'Provided token undefined is not valid'});
        });
        component.onSubmit();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-reg',
    template: ''
})
class TestRegFormComponent extends AbstractRegistrationFormComponent {
    constructor(formBuilder: FormBuilder, protected _signupService: SignUpService, protected _log: LoggerService) {
        super(formBuilder, _signupService, _log);
    }
}
