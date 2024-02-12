import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MultichoiceAutocompleteFieldComponent} from './multichoice-autocomplete-field.component';
import {EnumerationField, MaterialModule, TranslateLibModule, WrappedBoolean} from '@netgrif/components-core';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';

describe('MultichoiceAutocompleteFieldComponent', () => {
    let component: MultichoiceAutocompleteFieldComponent;
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
            declarations: [MultichoiceAutocompleteFieldComponent, TestWrapperComponent],
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
    template: '<nc-enumeration-autocomplete-select-field [showLargeLayout]="label" [dataField]="field" [formControlRef]="form">' +
        '</nc-enumeration-autocomplete-select-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new EnumerationField('', '', 'test', [{key: 'test', value: 'test'}], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    form = new FormControl();
}
