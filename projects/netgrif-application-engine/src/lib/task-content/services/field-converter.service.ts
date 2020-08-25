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
import {ButtonField, ButtonFieldView} from '../../data-fields/button-field/models/button-field';
import {FileField} from '../../data-fields/file-field/models/file-field';
import moment from 'moment';
import {UserValue} from '../../data-fields/user-field/models/user-value';
import {FileListField} from '../../data-fields/file-list-field/models/file-list-field';

@Injectable({
    providedIn: 'root'
})
export class FieldConverterService {

    constructor() {
    }

    public toClass(item: DataFieldResource): DataField<any> {
        switch (item.type) {
            case 'boolean':
                return new BooleanField(item.stringId, item.name, item.value as boolean, item.behavior,
                    item.placeholder, item.description, item.layout, item.validations);
            case 'text':
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
            case 'number':
                return new NumberField(item.stringId, item.name, item.value as number, item.behavior,
                    item.validations, item.placeholder, item.description, item.layout);
            case 'enumeration':
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
            case 'multichoice':
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
            case 'date':
                let date;
                if (item.value) {
                    date = moment(new Date(item.value[0], item.value[1] - 1, item.value[2]));
                }
                return new DateField(item.stringId, item.name, date, item.behavior, item.placeholder,
                    item.description, item.layout, item.validations);
            case 'dateTime':
                let dateTime;
                if (item.value) {
                    dateTime = moment(new Date(item.value[0], item.value[1] - 1, item.value[2], item.value[3], item.value[4]));
                }
                return new DateTimeField(item.stringId, item.name, dateTime, item.behavior,
                    item.placeholder, item.description, item.layout, item.validations);
            case 'user':
                let user;
                if (item.value) {
                    user = new UserValue(item.value.id, item.value.name, item.value.surname, item.value.email);
                }
                return new UserField(item.stringId, item.name, item.behavior, user,
                    item.roles, item.placeholder, item.description, item.layout);
            case 'button':
                const typeBtn = this.resolveButtonView(item);
                return new ButtonField(item.stringId, item.name, item.behavior, item.value as number,
                    item.placeholder, item.description, item.layout, typeBtn);
            case 'file':
                return new FileField(item.stringId, item.name, item.behavior, item.value ? item.value : {},
                    item.placeholder, item.description, item.layout);
            case 'fileList':
                return new FileListField(item.stringId, item.name, item.behavior, item.value ? item.value : {},
                    item.placeholder, item.description, item.layout, item.validations);
        }
    }

    public resolveType(item: DataField<any>): string {
        if (item instanceof BooleanField) {
            return 'boolean';
        } else if (item instanceof ButtonField) {
            return 'button';
        } else if (item instanceof TextField) {
            return 'text';
        } else if (item instanceof EnumerationField) {
            return 'enumeration';
        } else if (item instanceof NumberField) {
            return 'number';
        } else if (item instanceof MultichoiceField) {
            return 'multichoice';
        } else if (item instanceof DateField) {
            return 'date';
        } else if (item instanceof DateTimeField) {
            return 'dateTime';
        } else if (item instanceof FileField) {
            return 'file';
        } else if (item instanceof FileListField) {
            return 'fileList';
        } else if (item instanceof UserField) {
            return 'user';
        }
    }

    public resolveButtonView(item: DataFieldResource): ButtonFieldView {
        if (item.view !== undefined && item.view.value !== undefined) {
            switch (item.view.value) {
                case ButtonFieldView.STROKED:
                    return ButtonFieldView.STROKED;
                case ButtonFieldView.RAISED:
                    return ButtonFieldView.RAISED;
                case ButtonFieldView.FAB:
                    return ButtonFieldView.FAB;
                case ButtonFieldView.FLAT:
                    return ButtonFieldView.FLAT;
                case ButtonFieldView.ICON:
                    return ButtonFieldView.ICON;
                case ButtonFieldView.MINIFAB:
                    return ButtonFieldView.MINIFAB;
                default:
                    return ButtonFieldView.STANDARD;
            }
        } else if (item instanceof ButtonField) {
            return ButtonFieldView.STANDARD;
        }
    }

    public formatValueForBackend(field: DataField<any>, value: any): any {
        if (this.resolveType(field) === 'text' && value === null)
            return null;
        if (value === undefined || value === null)
            return;
        if (this.resolveType(field) === 'date') {
            if (moment.isMoment(value)) {
                return value.format('YYYY-MM-DD');
            }
        }
        if (this.resolveType(field) === 'user') {
            return value.id;
        }
        if (this.resolveType(field) === 'dateTime') {
            if (moment.isMoment(value)) {
                return value.format('DD.MM.YYYY HH:mm:ss');
            }
        }
        return value;
    }

    public formatValueFromBackend(field: DataField<any>, value: any): any {
        if (this.resolveType(field) === 'text' && value === null)
            return null;
        if (value === undefined || value === null)
            return;
        if (this.resolveType(field) === 'date') {
            return moment(new Date(value[0], value[1] - 1, value[2]));
        }
        if (this.resolveType(field) === 'user') {
            return new UserValue(value.id, value.name, value.surname, value.email);
        }
        if (this.resolveType(field) === 'dateTime') {
            return moment(new Date(value[0], value[1] - 1, value[2], value[3], value[4]));
        }
        if (this.resolveType(field) === 'multichoice') {
            const array = [];
            value.forEach(v => {
                if (v.defaultValue) {
                    array.push(v.defaultValue);
                } else {
                    array.push(v);
                }
            });
            return array;
        }
        return value;
    }
}
