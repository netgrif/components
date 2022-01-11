import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AbstractI18nDividerFieldComponent} from './abstract-i18n-divider-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {I18nField} from '../models/i18n-field';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractI18nDividerFieldComponent', () => {
    let component: TestI18nDividerComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [TestI18nDividerComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-i18n-divider',
    template: ''
})
class TestI18nDividerComponent extends AbstractI18nDividerFieldComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: `
        <nae-test-i18n-divider [showLargeLayout]="label"
                               [dividerI18nField]="field"
                               [formControlRef]="formControl">
        </nae-test-i18n-divider>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new I18nField('', '', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    formControl = new FormControl();
}
