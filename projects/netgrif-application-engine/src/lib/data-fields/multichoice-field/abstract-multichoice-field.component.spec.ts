import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AbstractMultichoiceFieldComponent} from './abstract-multichoice-field.component';
import {MultichoiceField} from './models/multichoice-field';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';

describe('AbstractMultichoiceFieldComponent', () => {
    let component: TestEnumComponent;
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
                TestEnumComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-enum',
    template: ''
})
class TestEnumComponent extends AbstractMultichoiceFieldComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-enum [dataField]="field"></nae-test-enum>'
})
class TestWrapperComponent {
    field = new MultichoiceField('', '', [''], [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
