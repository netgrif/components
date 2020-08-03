import {Injectable} from '@angular/core';
import {DataFieldResource} from '../model/resource-interface';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {TextField, TextFieldView} from '../../data-fields/text-field/models/text-field';
import {NumberField} from '../../data-fields/number-field/models/number-field';
import {
    EnumerationField,
    EnumerationFieldValue,
    EnumerationFieldView
} from '../../data-fields/enumeration-field/models/enumeration-field';
import {
    MultichoiceField,
    MultichoiceFieldValue,
    MultichoiceFieldView
} from '../../data-fields/multichoice-field/models/multichoice-field';
import {DateField} from '../../data-fields/date-field/models/date-field';
import {DateTimeField} from '../../data-fields/date-time-field/models/date-time-field';
import {UserField} from '../../data-fields/user-field/models/user-field';
import {ButtonField} from '../../data-fields/button-field/models/button-field';
import {FileField} from '../../data-fields/file-field/models/file-field';
import moment from 'moment';
import {UserValue} from '../../data-fields/user-field/models/user-value';
import {FieldTypeResource} from '../model/field-type-resource';

@Injectable({
    providedIn: 'root'
})
export class FieldConverterService {

    constructor() {
    }

    public toClass(item: DataFieldResource): DataField<any> {
        switch (item.type) {
            case FieldTypeResource.BOOLEAN:
                return new BooleanField(item.stringId, item.name, item.value as boolean, item.behavior,
                    item.placeholder, item.description, item.layout, item.validations);
            case FieldTypeResource.TEXT:
                let type = TextFieldView.DEFAULT;
                if (item.subType !== undefined && item.subType === 'area') {
                    type = TextFieldView.TEXTAREA;
                }
                if (item.view !== undefined && item.view.value !== undefined && item.view.value === 'editor') {
                    type = TextFieldView.RICHTEXTAREA;
                } else  if (item.view !== undefined && item.view.value !== undefined && item.view.value === 'area') {
                    type = TextFieldView.TEXTAREA;
                }
                return new TextField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                    item.description, item.layout, item.validations, type);
            case FieldTypeResource.NUMBER:
                return new NumberField(item.stringId, item.name, item.value as number, item.behavior,
                    item.validations, item.placeholder, item.description, item.layout);
            case FieldTypeResource.ENUMERATION:
                let typeEnum = EnumerationFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'list') {
                        typeEnum = EnumerationFieldView.LIST;
                    } else if (item.view.value === 'autocomplete') {
                        typeEnum = EnumerationFieldView.AUTOCOMPLETE;
                    }
                }
                const enumChoices: EnumerationFieldValue[] = [];
                if (item.choices instanceof Array) {
                    item.choices.forEach(it => {
                        enumChoices.push({key: it, value: it} as EnumerationFieldValue);
                    });
                } else {
                    Object.keys(item.choices).forEach( key => {
                        enumChoices.push({key, value: item.choices[key]} as EnumerationFieldValue);
                    });
                }
                return new EnumerationField(item.stringId, item.name, item.value as string,
                    enumChoices, item.behavior, item.placeholder, item.description, item.layout, typeEnum);
            case FieldTypeResource.MULTICHOICE:
                let typeMulti = MultichoiceFieldView.DEFAULT;
                if (item.view && item.view.value !== undefined) {
                    if (item.view.value === 'list') {
                        typeMulti = MultichoiceFieldView.LIST;
                    }
                }
                const values: string[] = item.value as string[];
                const choicesMulti: MultichoiceFieldValue[] = [];
                if (item.choices instanceof Array) {
                    item.choices.forEach(it => {
                        choicesMulti.push({key: it, value: it} as MultichoiceFieldValue);
                    });
                } else {
                    Object.keys(item.choices).forEach( key => {
                        choicesMulti.push({key, value: item.choices[key]} as MultichoiceFieldValue);
                    });
                }
                return new MultichoiceField(item.stringId, item.name, values, choicesMulti, item.behavior,
                    item.placeholder, item.description, item.layout, typeMulti);
            case FieldTypeResource.DATE:
                let date;
                if (item.value) {
                    date = moment(new Date(item.value[0], item.value[1] - 1, item.value[2]));
                }
                return new DateField(item.stringId, item.name, date, item.behavior, item.placeholder, item.description, item.layout);
            case FieldTypeResource.DATE_TIME:
                let dateTime;
                if (item.value) {
                    dateTime = moment(new Date(item.value[0], item.value[1] - 1, item.value[2], item.value[3], item.value[4]));
                }
                return new DateTimeField(item.stringId, item.name, dateTime, item.behavior,
                    item.placeholder, item.description, item.layout);
            case FieldTypeResource.USER:
                let user;
                if (item.value) {
                    user = new UserValue(item.value.id, item.value.name, item.value.surname, item.value.email);
                }
                return new UserField(item.stringId, item.name, item.behavior, user,
                    item.roles, item.placeholder, item.description, item.layout);
            case FieldTypeResource.BUTTON:
                return new ButtonField(item.stringId, item.name, item.behavior, item.value as number,
                    item.placeholder, item.description, item.layout);
            case FieldTypeResource.FILE:
                return new FileField(item.stringId, item.name, item.behavior, item.value ? item.value : {},
                    item.placeholder, item.description, item.layout);
        }
    }

    public resolveType(item: DataField<any>): string {
        if (item instanceof BooleanField) {
            return FieldTypeResource.BOOLEAN;
        } else if (item instanceof ButtonField) {
            return FieldTypeResource.BUTTON;
        } else if (item instanceof TextField) {
            return FieldTypeResource.TEXT;
        } else if (item instanceof EnumerationField) {
            return FieldTypeResource.ENUMERATION;
        } else if (item instanceof NumberField) {
            return FieldTypeResource.NUMBER;
        } else if (item instanceof MultichoiceField) {
            return FieldTypeResource.MULTICHOICE;
        } else if (item instanceof DateField) {
            return FieldTypeResource.DATE;
        } else if (item instanceof DateTimeField) {
            return FieldTypeResource.DATE_TIME;
        } else if (item instanceof FileField) {
            return FieldTypeResource.FILE;
        } else if (item instanceof UserField) {
            return FieldTypeResource.USER;
        }
    }

    public formatValue(field: DataField<any>, value: any): any {
        if (this.resolveType(field) === FieldTypeResource.TEXT && value === null)
            return null;
        if (value === undefined || value === null)
            return;
        if (this.resolveType(field) === FieldTypeResource.DATE) {
            if (moment.isMoment(value)) {
                return value.format('YYYY-MM-DD');
            }
        }
        if (this.resolveType(field) === FieldTypeResource.USER) {
            return value.id;
        }
        if (this.resolveType(field) === FieldTypeResource.DATE_TIME) {
            if (moment.isMoment(value)) {
                return value.format('DD.MM.YYYY HH:mm:ss');
            }
        }
        return value;
    }
}
