import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgottenPasswordCardComponent} from './forgotten-password-panel.component';
import {FormBuilder} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ForgottenPasswordPanelComponent', () => {
    let component: ForgottenPasswordCardComponent;
    let fixture: ComponentFixture<ForgottenPasswordCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule, BrowserAnimationsModule],
            declarations: [ForgottenPasswordCardComponent],
            providers: [FormBuilder]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgottenPasswordCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', (done) => {
        component.form.controls['email'].setValue('login@login.sk');
        component.email.subscribe( event => {
            expect(event).toEqual('login@login.sk');
            done();
        });
        component.onSubmit();
    });
});
