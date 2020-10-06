import {Injectable} from '@angular/core';
import {DataFieldResource} from '../model/resource-interface';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {TextField, TextFieldView} from '../../data-fields/text-field/models/text-field';
import {NumberField} from '../../data-fields/number-field/models/number-field';
import {EnumerationField, EnumerationFieldValue, EnumerationFieldView} from '../../data-fields/enumeration-field/models/enumeration-field';
import {MultichoiceField, MultichoiceFieldValue, MultichoiceFieldView} from '../../data-fields/multichoice-field/models/multichoice-field';
import {DateField} from '../../data-fields/date-field/models/date-field';
import {DateTimeField} from '../../data-fields/date-time-field/models/date-time-field';
import {UserField} from '../../data-fields/user-field/models/user-field';
import {ButtonField, ButtonFieldView} from '../../data-fields/button-field/models/button-field';
import {FileField} from '../../data-fields/file-field/models/file-field';
import moment from 'moment';
import {UserValue} from '../../data-fields/user-field/models/user-value';
import {FieldTypeResource} from '../model/field-type-resource';
import {FileListField} from '../../data-fields/file-list-field/models/file-list-field';
import {TextAreaField} from '../../data-fields/text-field/models/text-area-field';

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
                    return new TextAreaField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                        item.description, item.layout, item.validations, type);
                } else  if (item.view !== undefined && item.view.value !== undefined && item.view.value === 'area') {
                    type = TextFieldView.TEXTAREA;
                } else if (item.view !== undefined && item.view.value !== undefined && item.view.value === 'htmlEditor') {
                    type = TextFieldView.HTMLTEXTAREA;
                    return new TextAreaField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                        item.description, item.layout, item.validations, type);
                }
                return new TextField(item.stringId, item.name, item.value as string, item.behavior, item.placeholder,
                    item.description, item.layout, item.validations, type);
            case FieldTypeResource.NUMBER:
                return new NumberField(item.stringId, item.name, item.value as number, item.behavior,
                    item.validations, item.placeholder, item.description, item.layout, item.formatFilter);
            case FieldTypeResource.ENUMERATION:
                return new EnumerationField(item.stringId, item.name, item.value, this.resolveEnumChoices(item),
                    item.behavior, item.placeholder, item.description, item.layout, this.resolveEnumViewType(item), item.type);
            case FieldTypeResource.ENUMERATION_MAP:
                return new EnumerationField(item.stringId, item.name, item.value, this.resolveEnumOptions(item),
                    item.behavior, item.placeholder, item.description, item.layout, this.resolveEnumViewType(item), item.type);
            case FieldTypeResource.MULTICHOICE:
                return new MultichoiceField(item.stringId, item.name, item.value, this.resolveMultichoiceChoices(item),
                    item.behavior, item.placeholder, item.description, item.layout, this.resolveMultichoiceViewType(item), item.type);
            case FieldTypeResource.MULTICHOICE_MAP:
                return new MultichoiceField(item.stringId, item.name, item.value, this.resolveMultichoiceOptions(item),
                    item.behavior, item.placeholder, item.description, item.layout, this.resolveMultichoiceViewType(item), item.type);
            case FieldTypeResource.DATE:
                let date;
                if (item.value) {
                    date = moment(new Date(item.value[0], item.value[1] - 1, item.value[2]));
                }
                return new DateField(item.stringId, item.name, date, item.behavior, item.placeholder,
                    item.description, item.layout, item.validations);
            case FieldTypeResource.DATE_TIME:
                let dateTime;
                if (item.value) {
                    dateTime = moment(new Date(item.value[0], item.value[1] - 1, item.value[2], item.value[3], item.value[4]));
                }
                return new DateTimeField(item.stringId, item.name, dateTime, item.behavior,
                    item.placeholder, item.description, item.layout, item.validations);
            case FieldTypeResource.USER:
                let user;
                if (item.value) {
                    user = new UserValue(item.value.id, item.value.name, item.value.surname, item.value.email);
                }
                return new UserField(item.stringId, item.name, item.behavior, user,
                    item.roles, item.placeholder, item.description, item.layout);
            case FieldTypeResource.BUTTON:
                const typeBtn = this.resolveButtonView(item);
                return new ButtonField(item.stringId, item.name, item.behavior, item.value as number,
                    item.placeholder, item.description, item.layout, typeBtn);
            case FieldTypeResource.FILE:
                return new FileField(item.stringId, item.name, item.behavior, item.value ? item.value : {},
                    item.placeholder, item.description, item.layout);
            case FieldTypeResource.FILE_LIST:
                return new FileListField(item.stringId, item.name, item.behavior, item.value ? item.value : {},
                    item.placeholder, item.description, item.layout, item.validations);
        }
    }

    public resolveType(item: DataField<any>): FieldTypeResource {
        if (item instanceof BooleanField) {
            return FieldTypeResource.BOOLEAN;
        } else if (item instanceof ButtonField) {
            return FieldTypeResource.BUTTON;
        } else if (item instanceof TextField) {
            return FieldTypeResource.TEXT;
        } else if (item instanceof NumberField) {
            return FieldTypeResource.NUMBER;
        } else if (item instanceof DateField) {
            return FieldTypeResource.DATE;
        } else if (item instanceof DateTimeField) {
            return FieldTypeResource.DATE_TIME;
        } else if (item instanceof FileField) {
            return FieldTypeResource.FILE;
        } else if (item instanceof FileListField) {
            return FieldTypeResource.FILE_LIST;
        } else if (item instanceof UserField) {
            return FieldTypeResource.USER;
        } else if (item instanceof EnumerationField || item instanceof MultichoiceField) {
            return item.fieldType;
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

    /**
     * @param enumField enumeration field resource object who's view type we want to resolve
     * @returns the view type defined in the field object, or default if none, or invalid type is defined
     */
    protected resolveEnumViewType(enumField: DataFieldResource): EnumerationFieldView {
        let typeEnum = EnumerationFieldView.DEFAULT;
        if (enumField.view && enumField.view.value !== undefined) {
            if (enumField.view.value === 'list') {
                typeEnum = EnumerationFieldView.LIST;
            } else if (enumField.view.value === 'autocomplete') {
                typeEnum = EnumerationFieldView.AUTOCOMPLETE;
            }
        }
        return typeEnum;
    }

    /**
     * This function is used to parse enumeration options from the `choices` attribute
     * @param enumField enumeration field resource object who's choices we want to resolve
     * @returns the options for the enumeration field
     */
    protected resolveEnumChoices(enumField: DataFieldResource): Array<EnumerationFieldValue> {
        const enumChoices = [];
        if (enumField.choices instanceof Array) {
            enumField.choices.forEach(it => {
                enumChoices.push({key: it, value: it} as EnumerationFieldValue);
            });
        } else {
            Object.keys(enumField.choices).forEach(key => {
                enumChoices.push({key, value: enumField.choices[key]} as EnumerationFieldValue);
            });
        }
        return enumChoices;
    }

    /**
     * This function is used to parse enumeration options from the `options` attribute
     * @param enumField enumeration field resource object who's options we want to resolve
     * @returns the options for the enumeration field
     */
    protected resolveEnumOptions(enumField: DataFieldResource): Array<EnumerationFieldValue> {
        return Object.entries(enumField.options).map(entry => ({key: entry[0], value: entry[1]}));
    }

    /**
     * @param multiField multichoice field resource object who's view type we want to resolve
     * @returns the view type defined in the field object, or default if none, or invalid type is defined
     */
    protected resolveMultichoiceViewType(multiField: DataFieldResource): MultichoiceFieldView {
        let typeMulti = MultichoiceFieldView.DEFAULT;
        if (multiField.view && multiField.view.value !== undefined) {
            if (multiField.view.value === 'list') {
                typeMulti = MultichoiceFieldView.LIST;
            }
        }
        return typeMulti;
    }

    /**
     * This function is used to parse multichoice options from the `choices` attribute
     * @param multiField multichoice field resource object who's options we want to resolve
     * @returns the options for the multichoice field
     */
    protected resolveMultichoiceChoices(multiField: DataFieldResource): Array<MultichoiceFieldValue> {
        const choicesMulti: MultichoiceFieldValue[] = [];
        if (multiField.choices instanceof Array) {
            multiField.choices.forEach(it => {
                choicesMulti.push({key: it, value: it} as MultichoiceFieldValue);
            });
        } else {
            Object.keys(multiField.choices).forEach(key => {
                choicesMulti.push({key, value: multiField.choices[key]} as MultichoiceFieldValue);
            });
        }
        return choicesMulti;
    }

    /**
     * This function is used to parse enumeration options from the `options` attribute
     * @param multiField multichoice field resource object who's options we want to resolve
     * @returns the options for the multichoice field
     */
    protected resolveMultichoiceOptions(multiField: DataFieldResource): Array<MultichoiceFieldValue> {
        return Object.entries(multiField.options).map(entry => ({key: entry[0], value: entry[1]}));
    }

    public formatValueFromBackend(field: DataField<any>, value: any): any {
        if (this.resolveType(field) === FieldTypeResource.TEXT && value === null)
            return null;
        if (value === undefined || value === null)
            return;
        if (this.resolveType(field) === FieldTypeResource.DATE) {
            return moment(new Date(value[0], value[1] - 1, value[2]));
        }
        if (this.resolveType(field) === FieldTypeResource.USER) {
            return new UserValue(value.id, value.name, value.surname, value.email);
        }
        if (this.resolveType(field) === FieldTypeResource.DATE_TIME) {
            return moment(new Date(value[0], value[1] - 1, value[2], value[3], value[4]));
        }
        if (this.resolveType(field) === FieldTypeResource.MULTICHOICE) {
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
