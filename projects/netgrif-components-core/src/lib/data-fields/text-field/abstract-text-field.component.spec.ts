import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NO_ERRORS_SCHEMA, Optional} from '@angular/core';
import {AbstractTextFieldComponent} from './abstract-text-field.component';
import {TextField} from './models/text-field';
import {MaterialModule} from '../../material/material.module';
import {CovalentModule} from '../../covalent/covalent.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

describe('AbstractTextFieldComponent', () => {
    let component: TestTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizeEventModule, NoopAnimationsModule,
                CovalentModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();

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
    selector: 'ncc-test-text',
    template: ''
})
class TestTextComponent extends AbstractTextFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-text [dataField]="field"></ncc-test-text>'
})
class TestWrapperComponent {
    field = new TextField('', '', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, [{name: 'email', message: 'custom message'}]);
}
