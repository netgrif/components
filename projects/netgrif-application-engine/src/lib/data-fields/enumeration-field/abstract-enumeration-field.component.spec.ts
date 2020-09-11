import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AbstractEnumerationFieldComponent} from './abstract-enumeration-field.component';
import {EnumerationField} from './models/enumeration-field';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';

describe('AbstractEnumerationFieldComponent', () => {
    let component: TestEnumerationComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestEnumerationComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
    selector: 'nae-test-enumeration',
    template: ''
})
class TestEnumerationComponent extends AbstractEnumerationFieldComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-enumeration [dataField]="field"></nae-test-enumeration>'
})
class TestWrapperComponent {
    field = new EnumerationField('', '', '', [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
