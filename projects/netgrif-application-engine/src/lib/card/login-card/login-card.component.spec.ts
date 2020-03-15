import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginCardComponent} from './login-card.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginPanelComponent', () => {
    let component: LoginCardComponent;
    let fixture: ComponentFixture<LoginCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule, BrowserAnimationsModule],
            declarations: [LoginCardComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
