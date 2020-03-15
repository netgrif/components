import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationCardComponent} from './registration-card.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('RegistrationPanelComponent', () => {
    let component: RegistrationCardComponent;
    let fixture: ComponentFixture<RegistrationCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule, BrowserAnimationsModule],
            declarations: [RegistrationCardComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
