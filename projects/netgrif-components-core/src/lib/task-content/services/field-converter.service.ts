import {Injectable} from '@angular/core';
import {DataFieldResource, DataRefResource} from '../model/resource-interfaces';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {TextField} from '../../data-fields/text-field/models/text-field';
import {NumberField} from '../../data-fields/number-field/models/number-field';
import {EnumerationField, EnumerationFieldValue} from '../../data-fields/enumeration-field/models/enumeration-field';
import {MultichoiceField, MultichoiceFieldValue} from '../../data-fields/multichoice-field/models/multichoice-field';
import {DateField} from '../../data-fields/date-field/models/date-field';
import {DateTimeField} from '../../data-fields/date-time-field/models/date-time-field';
import {UserField} from '../../data-fields/user-field/models/user-field';
import {ButtonField} from '../../data-fields/button-field/models/button-field';
import {FileField} from '../../data-fields/file-field/models/file-field';
import moment from 'moment';
import {UserValue} from '../../data-fields/user-field/models/user-value';
import {FieldTypeResource} from '../model/field-type-resource';
import {FileListField} from '../../data-fields/file-list-field/models/file-list-field';
import {TextAreaField} from '../../data-fields/text-field/models/text-area-field';
import {Component} from '../../data-fields/models/component';
import {TaskRefField} from '../../data-fields/task-ref-field/model/task-ref-field';
import {DynamicEnumerationField} from '../../data-fields/enumeration-field/models/dynamic-enumeration-field';
import {FilterField} from '../../data-fields/filter-field/models/filter-field';
import {I18nField} from '../../data-fields/i18n-field/models/i18n-field';
import {UserListField} from '../../data-fields/user-list-field/models/user-list-field';
import {UserListValue} from '../../data-fields/user-list-field/models/user-list-value';
import {decodeBase64, encodeBase64} from "../../utility/base64";
import {CaseRefField} from '../../data-fields/case-ref-field/model/case-ref-field';
import {StringCollectionField} from '../../data-fields/string-collection-field/models/string-collection-field';

@Injectable({
    providedIn: 'root'
})
export class FieldConverterService {
    private textFieldNames = [ 'richtextarea', 'htmltextarea', 'editor', 'htmlEditor' ]

    constructor() {
    }

    public toClass(item: DataRefResource): DataField<any> {
        switch (item.field.type) {
            case FieldTypeResource.BOOLEAN:
                return new BooleanField(item.fieldId, item.field.name, item.field.value.value as boolean, item.behavior,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.TEXT:
                if (this.textFieldNames.includes(item.component?.name)) {
                    return new TextAreaField(item.fieldId, item.field.name, this.resolveTextValue(item, item.field.value.value), item.behavior,
                        item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
                }
                return new TextField(item.fieldId, item.field.name, this.resolveTextValue(item, item.field.value.value), item.behavior, item.field.placeholder,
                    item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.NUMBER:
                return new NumberField(item.fieldId, item.field.name, item.field.value.value as number, item.behavior, item.field.validations, item.field.placeholder,
                    item.field.description, item.layout, item.field.formatFilter, this.resolveNumberComponent(item.field), item.parentTaskId);
            case FieldTypeResource.ENUMERATION:
            case FieldTypeResource.ENUMERATION_MAP:
                return this.resolveEnumField(item);
            case FieldTypeResource.MULTICHOICE:
                return new MultichoiceField(item.fieldId, item.field.name, item.field.value.value, this.resolveMultichoiceChoices(item.field),
                    item.behavior, item.field.placeholder, item.field.description, item.layout, item.field.type, item.field.validations,
                    item.component, item.parentTaskId);
            case FieldTypeResource.MULTICHOICE_MAP:
                return new MultichoiceField(item.fieldId, item.field.name, item.field.value.value, this.resolveMultichoiceOptions(item.field),
                    item.behavior, item.field.placeholder, item.field.description, item.layout,
                    item.field.type, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.DATE:
                let date;
                if (item.field.value.value) {
                    date = moment(new Date(item.field.value.value[0], item.field.value.value[1] - 1, item.field.value.value[2]));
                }
                return new DateField(item.fieldId, item.field.name, date, item.behavior, item.field.placeholder,
                    item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.DATE_TIME:
                let dateTime;
                if (item.field.value.value) {
                    dateTime = moment(new Date(item.field.value.value[0], item.field.value.value[1] - 1, item.field.value.value[2], item.field.value.value[3], item.field.value.value[4]));
                }
                return new DateTimeField(item.fieldId, item.field.name, dateTime, item.behavior,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.USER:
                let user;
                if (item.field.value.value) {
                    user = new UserValue(item.field.value.value.id, item.field.value.value.name, item.field.value.value.surname, item.field.value.value.email);
                }
                return new UserField(item.fieldId, item.field.name, item.behavior, user,
                    item.field.roles, item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.USER_LIST:
                let userListValue = new UserListValue(new Map<string, UserValue>());
                if (item.field.value.value) {
                    item.field.value.value.userValues.forEach(u => userListValue.addUserValue(new UserValue(u.id, u.name, u.surname, u.email)));
                }
                return new UserListField(item.fieldId, item.field.name, item.behavior, userListValue, item.field.roles,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.BUTTON:
                return new ButtonField(item.fieldId, item.field.name, item.behavior, item.field.value.value as number,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.FILE:
                return new FileField(item.fieldId, item.field.name, item.behavior, item.field.value.value ? item.field.value.value : {},
                    item.field.placeholder, item.field.description, item.layout, null, null, item.field.validations, item.component,
                    item.parentTaskId);
            case FieldTypeResource.FILE_LIST:
                return new FileListField(item.fieldId, item.field.name, item.behavior, item.field.value.value ? item.field.value.value : {},
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, null, null, item.component,
                    item.parentTaskId);
            case FieldTypeResource.TASK_REF:
                return new TaskRefField(item.fieldId, item.field.name, item.field.value.value ? item.field.value.value : [], item.behavior,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.CASE_REF:
                return new CaseRefField(item.fieldId, item.field.name, item.field.value.value ? item.field.value.value : [], item.behavior,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.FILTER:
                return new FilterField(item.fieldId, item.field.name, item.field.value.value ?? '', item.field.filterMetadata, item.field.allowedNets,
                    item.behavior, item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
            case FieldTypeResource.I18N:
                return new I18nField(item.fieldId, item.field.name, item.field.value.value ?? {defaultValue: ''}, item.behavior, item.field.placeholder,
                    item.field.description, item.layout, item.field.validations, item.component);
            case FieldTypeResource.STRING_COLLECTION:
                return new StringCollectionField(item.fieldId, item.field.name, item.field.value.value ? item.field.value.value : [], item.behavior,
                    item.field.placeholder, item.field.description, item.layout, item.field.validations, item.component, item.parentTaskId);
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
        } else if (item instanceof UserListField) {
            return FieldTypeResource.USER_LIST;
        } else if (item instanceof TaskRefField) {
            return FieldTypeResource.TASK_REF;
        } else if (item instanceof EnumerationField || item instanceof MultichoiceField) {
            return item.fieldType;
        } else if (item instanceof FilterField) {
            return FieldTypeResource.FILTER;
        } else if (item instanceof I18nField) {
            return FieldTypeResource.I18N;
        } else if (item instanceof CaseRefField) {
            return FieldTypeResource.CASE_REF;
        } else if (item instanceof StringCollectionField) {
            return FieldTypeResource.STRING_COLLECTION;
        }
    }

    public formatValueForBackend(field: DataField<any>, value: any): any {
        if (this.resolveType(field) === FieldTypeResource.TEXT && value === null) {
            return null;
        }
        if (this.resolveType(field) === FieldTypeResource.TEXT && field.component && field.component.name === 'password') {
            return encodeBase64(value);
        }
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return;
        }
        if (this.resolveType(field) === FieldTypeResource.DATE) {
            if (moment.isMoment(value)) {
                return value.format('YYYY-MM-DD');
            }
        }
        if (this.resolveType(field) === FieldTypeResource.USER) {
            return value.id;
        }
        if (this.resolveType(field) === FieldTypeResource.USER_LIST) {
            return [...value.userValues.keys()];
        }
        if (this.resolveType(field) === FieldTypeResource.DATE_TIME) {
            if (moment.isMoment(value)) {
                return value.format('DD.MM.YYYY HH:mm:ss');
            }
        }
        return value;
    }

    protected resolveNumberComponent(numberField: DataFieldResource): Component {
        if (!!numberField.component) {
            return {
                name: numberField.component.name,
                properties: numberField.component.properties
            };
        } else {
            return { name: 'default', properties: undefined };
        }
    }

    /**
     * Resolves `enumeration` and `eunumeration_map` fields into their appropriate class instances
     * @param dataRef enumeration dataRef resource
     */
    protected resolveEnumField(dataRef: DataRefResource): EnumerationField {
        const enumField = dataRef.field;
        const options = enumField.type === FieldTypeResource.ENUMERATION
            ? this.resolveEnumChoices(enumField)
            : this.resolveEnumOptions(enumField);
        if (enumField.component && enumField.component.name === 'autocomplete_dynamic') {
            return new DynamicEnumerationField(enumField.stringId, enumField.name, enumField.value.value, options,
                dataRef.behavior, enumField.placeholder, enumField.description, dataRef.layout,
                enumField.type, enumField.validations, enumField.component, enumField.parentTaskId);
        } else {
            return new EnumerationField(enumField.stringId, enumField.name, enumField.value.value, options,
                dataRef.behavior, enumField.placeholder, enumField.description, dataRef.layout,
                enumField.type, enumField.validations, enumField.component, enumField.parentTaskId);
        }
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
     * This function is used to parse multichoice options from the `choices` attribute
     * @param multiField multichoice field resource object who's options we want to resolve
     * @returns the options for the multichoice field
     */
    protected resolveMultichoiceChoices(multiField: DataFieldResource): Array<MultichoiceFieldValue> {
        const choicesMulti: Array<MultichoiceFieldValue> = [];
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
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return;
        }
        if (this.resolveType(field) === FieldTypeResource.TEXT && field.component && field.component.name === 'password') {
            return decodeBase64(value);
        }
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
        if (this.resolveType(field) === FieldTypeResource.USER_LIST && !!value) {
            return new UserListValue(new Map(value.userValues.map(v => [v.id, v])));
        }
        return value;
    }

    protected resolveTextValue(dataRef: DataRefResource, value: string): string {
        if (((dataRef.component !== undefined && dataRef.component.name === 'password')
            || (dataRef.field.component !== undefined && dataRef.field.component.name === 'password')) && (value !== '' && value !== undefined)) {
            return decodeBase64(value);
        }
        return value;
    }
}
