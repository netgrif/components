import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultichoiceListFieldComponent} from './multichoice-list-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaterialModule, MultichoiceField, TranslateLibModule, WrappedBoolean} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('MultichoiceListFieldComponent', () => {
    let component: MultichoiceListFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                MultichoiceListFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule,
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '<nc-multichoice-list-field [showLargeLayout]="label" [dataField]="field" [formControlRef]="form">' +
        '</nc-multichoice-list-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
