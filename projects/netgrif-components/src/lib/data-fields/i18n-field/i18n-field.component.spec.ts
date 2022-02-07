import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {I18nFieldComponent} from './i18n-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {I18nField, MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {I18nDividerFieldComponent} from './i18n-divider-field/i18n-divider-field.component';
import {I18nTextFieldComponent} from './i18n-text-field/i18n-text-field.component';

describe('I18nFieldComponent', () => {
    let component: I18nFieldComponent;
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
            declarations: [
                I18nFieldComponent,
                I18nDividerFieldComponent,
                I18nTextFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
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
    template: '<nc-i18n-field [dataField]="field"></nc-i18n-field>'
})
class TestWrapperComponent {
    field = new I18nField('', '', '',  {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
