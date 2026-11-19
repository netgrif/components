import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AbstractEnumerationAutocompleteSelectFieldComponent} from './abstract-enumeration-autocomplete-select-field.component';
import {TranslateService} from '@ngx-translate/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationField} from '../models/enumeration-field';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DynamicEnumerationField} from "../models/dynamic-enumeration-field";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractEnumerationAutocompleteSelectFieldComponent', () => {
    let component: TestEnumAutoComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestEnumAutoComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new EnumerationField('', '', 'test', [{key: 'test', value: 'test'}], {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<EnumerationField>
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    selector: 'ncc-test-enum-auto',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestEnumAutoComponent extends AbstractEnumerationAutocompleteSelectFieldComponent {
    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DynamicEnumerationField>) {
        super(_translate, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-enum-auto></ncc-test-enum-auto>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {

}
