import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18nDividerFieldComponent} from './i18n-divider-field.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {I18nField, WrappedBoolean} from '@netgrif/components-core';

describe('I18nDividerFieldComponent', () => {
    let component: I18nDividerFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [I18nDividerFieldComponent, TestWrapperComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    @Component({
        selector: 'nc-test-wrapper',
        template: '<nc-i18n-divider-field [formControlRef]="fc" [dividerI18nField]="field" [showLargeLayout]="boolean">' +
            '</nc-i18n-divider-field>'
    })
    class TestWrapperComponent {
        field = new I18nField('', '', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        });
        fc = new FormControl('', {updateOn: 'blur'});
        boolean = new WrappedBoolean();

        constructor() {
            this.field.registerFormControl(this.fc);
        }
    }
});
