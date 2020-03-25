import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelComponent} from './panel.component';
import {MaterialModule} from '../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule
            ],
            declarations: [PanelComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
