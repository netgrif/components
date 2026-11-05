import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { NumberDecimalFieldComponent } from './number-decimal-field.component';
import {AngularResizeEventModule} from "angular-resize-event";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NumberField,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService, WrappedBoolean
} from '@netgrif/components-core';
import {DecimalPipe, registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';

describe('NumberDecimalFieldComponent', () => {
    let component: NumberDecimalFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                DecimalPipe
            ],
            declarations: [
                NumberDecimalFieldComponent,
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

    describe('transformation', () => {
        const transform = (name: string, properties: {[k: string]: string}, value: string) => {
            component.dataField.component = {name, properties};
            return (component as any).transformDecimal(value);
        };

        beforeAll(() => {
            registerLocaleData(localeDe);
        });

        it('should format decimal component with DecimalPipe', () => {
            expect(transform('decimal', {digitsInfo: '1.2-2'}, '1234567.891')).toEqual('1,234,567.89');
            expect(transform('decimal', {digitsInfo: '1.2-2', locale: 'de'}, '1234567.891')).toEqual('1.234.567,89');
            expect(transform('decimal', {}, '1234.56789')).toEqual('1,234.568');
        });

        it('should ignore separators in decimal component', () => {
            expect(transform('decimal', {decimalSeparator: ';', groupSeparator: '_'}, '1234.5')).toEqual('1,234.5');
        });

        it('should format formatted component with default format', () => {
            expect(transform('formatted', {}, '1234567.891')).toEqual('1 234 567.89');
        });

        it('should format formatted component with custom separators', () => {
            expect(transform('formatted', {groupSeparator: ',', decimalSeparator: '.', digitsInfo: '1.0-0'}, '123456')).toEqual('123,456');
            expect(transform('formatted', {groupSeparator: '.', decimalSeparator: ',', digitsInfo: '1.3-3'}, '-1234.5')).toEqual('-1.234,500');
        });

        it('should support decimal component properties in formatted component', () => {
            expect(transform('formatted', {digitsInfo: '1.2-2', locale: 'de'}, '1234567.891'))
                .toEqual(transform('decimal', {digitsInfo: '1.2-2', locale: 'de'}, '1234567.891'));
            expect(transform('formatted', {locale: 'de', groupSeparator: ' '}, '1234567.891')).toEqual('1 234 567,89');
        });

        it('should use default number format in formatted component if locale is not registered', () => {
            expect(transform('formatted', {locale: 'xx'}, '1234567.891')).toEqual('1 234 567.89');
            expect(transform('formatted', {locale: 'xx', decimalSeparator: ','}, '1234567.891')).toEqual('1 234 567,89');
        });

        it('should keep decimal component behaviour if locale is not registered', () => {
            expect(() => transform('decimal', {locale: 'xx'}, '1234567.891')).toThrowError();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-number-decimal-field [dataField]="field" [formControlRef]="formControl" ' +
        '[showLargeLayout]="label"></nc-number-decimal-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new NumberField('', '', 4, {
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, []);
    formControl = new FormControl();
    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
