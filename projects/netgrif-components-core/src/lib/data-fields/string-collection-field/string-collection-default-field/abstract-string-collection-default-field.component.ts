import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {AbstractBaseDataFieldComponent} from '../../base-component/abstract-base-data-field.component';
import {TranslateService} from '@ngx-translate/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {StringCollectionField} from '../models/string-collection-field';
import {COMMA, ENTER, SEMICOLON} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Subscription} from 'rxjs';
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-string-collection-default-field',
    template: '',
})
export abstract class AbstractStringCollectionDefaultFieldComponent extends AbstractBaseDataFieldComponent<StringCollectionField> implements OnInit {

    @ViewChild('input') input: ElementRef;
    public separatorKeysCodes: number[] = [ENTER];
    protected subComp: Subscription;

    protected constructor(protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<StringCollectionField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    ngOnInit() {
        this.checkProperties();
        this.subComp = this.dataField.componentChange$().subscribe(() => {
            this.checkProperties()
        })
    }

    checkProperties() {
        this.checkPropertyForSeparator(this.dataField?.component?.properties?.semicolon === 'true', SEMICOLON)
        this.checkPropertyForSeparator(this.dataField?.component?.properties?.comma === 'true', COMMA)
    }

    protected checkPropertyForSeparator(propertyBoolean: boolean, separator: number) {
        if (propertyBoolean && !this.separatorKeysCodes.includes(separator)) {
            this.separatorKeysCodes.push(separator);
        } else if (this.separatorKeysCodes.includes(separator)) {
            this.separatorKeysCodes = this.separatorKeysCodes.filter(value => value !== separator);
        }
    }

    remove(value: string): void {
        const index = this.dataField.value.indexOf(value);

        if (index >= 0) {
            const choiceArray = [...this.dataField.value];
            choiceArray.splice(index, 1);
            this.dataField.value = choiceArray;
        }
    }

    add(event: MatChipInputEvent | FocusEvent): void {
        const value = event['value'] ?? (event['target']?.['value'] ?? '');

        if (value?.trim()) {
            this.dataField.value = (this.dataField.value === null || this.dataField.value === undefined) ? [] : this.dataField.value
            const choiceArray = [...this.dataField.value];
            choiceArray.push(value);
            this.dataField.value = choiceArray;
            this.input.nativeElement.value = '';
        } else {
            this.input.nativeElement.value = '';
        }
    }
}
