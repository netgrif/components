import { Injectable } from '@angular/core';
import {DataFieldResource} from './resource-service';
import {DataField, MaterialAppearance} from '../../../data-fields/models/abstract-data-field';
import {BooleanField} from '../../../data-fields/boolean-field/models/boolean-field';
import {TextField, TextFieldView} from '../../../data-fields/text-field/models/text-field';
import {NumberField} from '../../../data-fields/number-field/models/number-field';
import {
    EnumerationField,
    EnumerationFieldValue,
    EnumerationFieldView
} from '../../../data-fields/enumeration-field/models/enumeration-field';
import {
    MultichoiceField,
    MultichoiceFieldValue,
    MultichoiceFieldView
} from '../../../data-fields/multichoice-field/models/multichoice-field';
import {DateField} from '../../../data-fields/date-field/models/date-field';
import {DateTimeField} from '../../../data-fields/date-time-field/models/date-time-field';
import {UserField} from '../../../data-fields/user-field/models/user-field';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {ButtonField} from '../../../data-fields/button-field/models/button-field';
import {FileField} from '../../../data-fields/file-field/models/file-field';

@Injectable({
  providedIn: 'root'
})
export class FieldConvertorService {

  constructor() { }

    toClass(item: DataFieldResource): DataField<any> {
        switch (item.type) {
            case 'boolean':
                return new BooleanField(item.stringId, item.name, item.value as boolean, item.behavior,
                    item.placeholder, item.description, item.layout);
            case 'text':
                let type = TextFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'area') {
                        type = TextFieldView.TEXTAREA;
                    }
                }
                return new TextField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                    item.description, item.layout, item.validations, MaterialAppearance.STANDARD, type);
            case 'number':
                return new NumberField(item.stringId, item.name, item.value as number, item.behavior,
                    item.validations, item.placeholder, item.description, item.layout, MaterialAppearance.STANDARD);
            case 'enumeration':
                let typeEnum = EnumerationFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'list') {
                        typeEnum = EnumerationFieldView.LIST;
                    } else if (item.view.value === 'autocomplete') {
                        typeEnum = EnumerationFieldView.AUTOCOMPLETE;
                    }
                }
                const choices: EnumerationFieldValue[] = [];
                item.choices.forEach(it => {
                    choices.push({key: it, value: it} as EnumerationFieldValue);
                });
                return new EnumerationField(item.stringId, item.name, item.value as string,
                    choices, item.behavior, item.placeholder, item.description, item.layout, MaterialAppearance.STANDARD, typeEnum);
            case 'multichoice':
                let typeMulti = MultichoiceFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'list') {
                        typeMulti = MultichoiceFieldView.LIST;
                    }
                }
                const values: string[] = item.value as string[];
                const choicesMulti: MultichoiceFieldValue[] = [];
                item.choices.forEach(it => {
                    choicesMulti.push({key: it, value: it} as MultichoiceFieldValue);
                });
                return new MultichoiceField(item.stringId, item.name, values, choicesMulti, item.behavior,
                    item.placeholder, item.description, item.layout, MaterialAppearance.STANDARD, typeMulti);
            case 'date':
                let date;
                if (item.value) {
                    date = new Date(item.value[0], item.value[1], item.value[2]);
                }
                return new DateField(item.stringId, item.name, date, item.behavior, item.placeholder, item.description, item.layout);
            case 'dateTime':
                let dateTime;
                if (item.value) {
                    dateTime = new Date(item.value[0], item.value[1], item.value[2], item.value[3], item.value[4]);
                }
                return new DateTimeField(item.stringId, item.name, dateTime, item.behavior,
                    item.placeholder, item.description, item.layout);
            case 'user':
                return new UserField(item.stringId, item.name, item.behavior, new UserValue('name',
                    'surname', 'email'), item.roles, item.placeholder, item.description, item.layout);
            case 'button':
                return new ButtonField(item.stringId, item.name, item.behavior, item.value as number,
                    item.placeholder, item.description, item.layout);
            case 'file':
                return new FileField(item.stringId, item.name, item.behavior, undefined, item.placeholder, item.description, item.layout);
        }
    }
}
