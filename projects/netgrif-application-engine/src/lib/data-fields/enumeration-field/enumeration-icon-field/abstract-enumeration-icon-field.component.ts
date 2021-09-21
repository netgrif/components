import {Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

export abstract class AbstractEnumerationIconFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    resolveIconValue(key: string) {
        return this.enumerationField.component?.optionIcons?.find(icon => icon.key === key)?.value;
    }

    resolveIconType(key: string) {
        return this.enumerationField.component?.optionIcons?.find(icon => icon.key === key)?.type;
    }

    resolveArrow(key: string) {
        return this.enumerationField.component?.properties?.arrow === 'true';
    }

    resolveDivider(key: string) {
        return this.enumerationField.component?.properties?.divider === 'true';
    }

    setEnumValue(key: string) {
        if (!this.enumerationField.disabled) {
            this.formControlRef.setValue(key);
        }
    }

    isSelected(key: string): boolean {
        return key === this.enumerationField.value;
    }
}
