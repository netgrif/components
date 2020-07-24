import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelComponent} from './panel.component';
import {MaterialModule} from '../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
