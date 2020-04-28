import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationFormComponent} from './registration-form.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SignUpModule} from '../../authentication/sign-up/sign-up.module';

describe('RegistrationPanelComponent', () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [RegistrationFormComponent],
            providers: [
                SignUpService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationFormComponent);
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
