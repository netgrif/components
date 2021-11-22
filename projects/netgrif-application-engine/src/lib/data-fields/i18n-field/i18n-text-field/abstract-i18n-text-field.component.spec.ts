import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {I18nField} from '../models/i18n-field';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AbstractI18nTextFieldComponent} from './abstract-i18n-text-field.component';

describe('AbstractI18nDividerFieldComponent', () => {
    let component: TestI18nTextComponent;
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
            declarations: [TestI18nTextComponent, TestWrapperComponent],
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
    selector: 'nae-test-i18n-text',
    template: ''
})
class TestI18nTextComponent extends AbstractI18nTextFieldComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: `
        <nae-test-i18n-text [showLargeLayout]="label"
                            [textI18nField]="field"
                            [formControlRef]="formControl">
        </nae-test-i18n-text>`
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
