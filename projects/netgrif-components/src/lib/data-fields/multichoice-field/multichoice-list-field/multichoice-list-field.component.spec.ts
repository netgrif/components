import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultichoiceListFieldComponent} from './multichoice-list-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl} from '@angular/forms';
import {MaterialModule, MultichoiceField, TranslateLibModule, WrappedBoolean} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MultichoiceListFieldComponent', () => {
    let component: MultichoiceListFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [MultichoiceListFieldComponent, TestWrapperComponent],
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
    selector: 'nc-test-wrapper',
    template: '<nc-multichoice-list-field [showLargeLayout]="label" [multichoiceField]="field" [formControlRef]="form">' +
        '</nc-multichoice-list-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new MultichoiceField('', '', [''], [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    form = new FormControl();
}
