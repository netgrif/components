import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {AbstractBaseDataFieldComponent} from '../../base-component/abstract-base-data-field.component';
import {TranslateService} from '@ngx-translate/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {StringCollectionField} from '../models/string-collection-field';
import {ENTER, COMMA, SEMICOLON} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
    selector: 'ncc-abstract-string-collection-default-field',
    template: '',
})
export abstract class AbstractStringCollectionDefaultFieldComponent extends AbstractBaseDataFieldComponent<StringCollectionField> implements OnInit {

    @ViewChild('input') input: ElementRef;
    public separatorKeysCodes: number[] = [ENTER];

    protected constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<StringCollectionField>) {
        super(dataFieldPortalData);
    }

    ngOnInit() {
        if (this.dataField?.component?.properties?.semicolon === 'true') {
            this.separatorKeysCodes.push(SEMICOLON);
        }
        if (this.dataField?.component?.properties?.comma === 'true') {
            this.separatorKeysCodes.push(COMMA);
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

    add(event: MatChipInputEvent): void {
        const value = event['value'] ?? '';

        if (value) {
            this.dataField.value = this.dataField.value === null ? [] : this.dataField.value
            const choiceArray = [...this.dataField.value];
            choiceArray.push(value);
            this.dataField.value = choiceArray;
            this.input.nativeElement.value = '';
        } else {
            this.input.nativeElement.value = '';
        }
    }
}
