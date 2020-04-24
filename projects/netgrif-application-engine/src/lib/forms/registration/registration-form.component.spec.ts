import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationFormComponent} from './registration-form.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('RegistrationPanelComponent', () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule, BrowserAnimationsModule],
            declarations: [RegistrationFormComponent],
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
        component.form.controls['email'].setValue('mail@mail.sk');
        component.form.controls['name'].setValue('name');
        component.form.controls['surname'].setValue('surname');
        component.form.controls['password'].setValue('passwd');
        component.form.controls['confirmPassword'].setValue('passwd');
        component.register.subscribe( event => {
            expect(event).toEqual({
                email: 'mail@mail.sk',
                name: 'name',
                surname: 'surname',
                password: 'passwd'
            });
        });
        component.onSubmit();
    });
});
