import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CovalentModule} from '../../covalent/covalent.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NO_ERRORS_SCHEMA, Optional} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {AbstractTaskRefFieldComponent} from './abstract-task-ref-field.component';
import {TaskRefField} from './model/task-ref-field';

describe('AbstractTaskRefFieldComponent', () => {
    let component: TestTaskRefComponent;
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
    selector: 'ncc-test-task-ref',
    template: ''
})
class TestTaskRefComponent extends AbstractTaskRefFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-task-ref [dataField]="field"></ncc-test-task-ref>'
})
class TestWrapperComponent {
    field = new TaskRefField('', '', [''], {
        editable: true,
    });
}
