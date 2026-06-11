import {Injectable} from '@angular/core';
import {
  BooleanField,
  ButtonField,
  Component,
  DataField,
  DateField,
  DateTimeField,
  DynamicEnumerationField,
  EnumerationField,
  EnumerationFieldValue,
  FieldAlignment,
  FieldTypeResource,
  FileField,
  FileListField,
  FilterField,
  I18nField,
  Layout,
  MaterialAppearance,
  MultichoiceField,
  NumberField,
  Properties,
  TaskRefField,
  TemplateAppearance,
  TextAreaField,
  TextField,
  UserField,
} from '@netgrif/components-core';
import {I18nFieldValue} from '@netgrif/components-core';
import {Behavior} from '@netgrif/components-core';
import {Icon} from '@netgrif/components-core';
import {
  Alignment,
  Appearance,
  Component as PetriflowComponent,
  DataRefBehavior,
  DataType,
  Property,
  Template,
} from '@netgrif/petriflow';
import moment from 'moment';
import {GridsterDataField} from '../form-builder/gridster/classes/gridster-data-field';

// noinspection JSMethodCanBeStatic
@Injectable()
export class GridsterFieldToEngineFieldService {

    constructor() {
    }

    transformDataField(dataField: GridsterDataField): DataField<unknown> {
        if (dataField.dataVariable.type as string === 'i18n') {
            return this.buildI18nField(dataField);
        }
        switch (dataField.dataVariable.type) {
            case DataType.BOOLEAN:
                return this.toBooleanField(dataField);
            case DataType.NUMBER:
                return this.toNumberField(dataField);
            case DataType.ENUMERATION_MAP:
            case DataType.ENUMERATION:
                return this.toEnumerationField(dataField);
            case DataType.MULTICHOICE_MAP:
            case DataType.MULTICHOICE:
                return this.toMultichoiceField(dataField);
            case DataType.DATE:
                return this.toDateField(dataField);
            case DataType.DATETIME:
                return this.toDateTimeField(dataField);
            case DataType.USER:
                return this.toUserField(dataField);
            case DataType.BUTTON:
                return this.toButtonField(dataField);
            case DataType.FILE:
                return this.toFileField(dataField);
            case DataType.FILE_LIST:
                return this.toFileListField(dataField);
            case DataType.TASK_REF:
                return this.toTaskRefField(dataField);
            case DataType.FILTER:
                return this.toFilterField(dataField);
            case DataType.TEXT:
            default:
                return this.toTextField(dataField);
        }
    }

    private toTextField(dataField: GridsterDataField): TextField {
        if (this.getComponent(dataField)?.name === 'htmltextarea') {
            return new TextAreaField(
                dataField.dataVariable.id,
                dataField.dataVariable.title?.value,
                dataField.dataVariable.init?.value,
                this.buildBehavior(dataField),
                dataField.dataVariable.placeholder?.value,
                dataField.dataVariable.desc?.value,
                this.buildLayout(dataField),
                [],
                this.buildComponent(dataField)
            );
        }
        return new TextField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init?.value,
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toBooleanField(dataField: GridsterDataField): BooleanField {
        return new BooleanField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init?.value === 'true',
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toNumberField(dataField: GridsterDataField): NumberField {
        return new NumberField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            +dataField.dataVariable.init?.value as number,
            this.buildBehavior(dataField),
            [],
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            undefined,
            this.buildComponent(dataField)
        );
    }

    private toEnumerationField(dataField: GridsterDataField): EnumerationField {
        if (this.getComponent(dataField)?.name === 'autocomplete_dynamic') {
            return this.toDynamicEnumerationField(dataField);
        }
        return new EnumerationField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init?.value,
            this.buildOptions(dataField),
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            dataField.dataVariable.type === DataType.ENUMERATION ? FieldTypeResource.ENUMERATION : FieldTypeResource.ENUMERATION_MAP,
            [],
            this.buildComponent(dataField)
        );
    }

    private toDynamicEnumerationField(dataField: GridsterDataField): EnumerationField {
        return new DynamicEnumerationField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init?.value,
            this.buildOptions(dataField),
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            dataField.dataVariable.type === DataType.ENUMERATION ? FieldTypeResource.ENUMERATION : FieldTypeResource.ENUMERATION_MAP,
            [],
            this.buildComponent(dataField)
        );
    }

    private toMultichoiceField(dataField: GridsterDataField): MultichoiceField {
        return new MultichoiceField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.inits?.map(i => i.value),
            this.buildOptions(dataField),
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            dataField.dataVariable.type === DataType.MULTICHOICE ? FieldTypeResource.MULTICHOICE : FieldTypeResource.MULTICHOICE_MAP,
            [],
            this.buildComponent(dataField)
        );
    }

    private toDateField(dataField: GridsterDataField): DateField {
        return new DateField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init.value === '' ? undefined : moment(dataField.dataVariable.init.value),
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toDateTimeField(dataField: GridsterDataField): DateTimeField {
        return new DateTimeField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init.value === '' ? undefined : moment(dataField.dataVariable.init.value),
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toUserField(dataField: GridsterDataField): UserField {
        return new UserField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            this.buildBehavior(dataField),
            undefined,
            [],
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toButtonField(dataField: GridsterDataField): ButtonField {
        return new ButtonField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            this.buildBehavior(dataField),
            0,
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toFileField(dataField: GridsterDataField): FileField {
        return new FileField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            this.buildBehavior(dataField),
            undefined, // TODO: overit
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            0,
            undefined,
            [],
            this.buildComponent(dataField)
        );
    }

    private toFileListField(dataField: GridsterDataField): FileListField {
        return new FileListField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            this.buildBehavior(dataField),
            {},
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            0,
            undefined,
            this.buildComponent(dataField)
        );
    }

    private toTaskRefField(dataField: GridsterDataField): TaskRefField {
        return new TaskRefField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            undefined,
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private toFilterField(dataField: GridsterDataField): FilterField {
        return new FilterField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            dataField.dataVariable.init?.value,
            undefined,
            undefined,
            this.buildBehavior(dataField),
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private buildI18nField(dataField: GridsterDataField) {
        return new I18nField(
            dataField.dataVariable.id,
            dataField.dataVariable.title?.value,
            {
                defaultValue: dataField.dataVariable.init.value,
                translations: {}
            } as I18nFieldValue,
            {
                required: dataField.dataRef.logic.required ? true : undefined,
                optional: !dataField.dataRef.logic.required ? true : undefined,
                editable: undefined,
                visible: dataField.dataRef.logic.behavior === DataRefBehavior.VISIBLE || dataField.dataRef.logic.behavior === DataRefBehavior.EDITABLE ? true : undefined,
                hidden: dataField.dataRef.logic.behavior === DataRefBehavior.HIDDEN ? true : undefined,
            } as Behavior,
            dataField.dataVariable.placeholder?.value,
            dataField.dataVariable.desc?.value,
            this.buildLayout(dataField),
            [],
            this.buildComponent(dataField)
        );
    }

    private buildComponent(dataField: GridsterDataField): Component {
        const component = this.getComponent(dataField);
        return {
            name: component?.name,
            properties: this.createPropertiesObjectFromEntries(component),
            optionIcons: this.createOptionsObject(component)
        } as Component;
    }

    private createOptionsObject(component: PetriflowComponent): Array<Icon> {
        if (!component || !component.icons) {
            return undefined;
        }
        return component.icons.reduce((acc, obj) => {
            return [...acc, {key: obj.key, type: 'material', value: obj.icon}];
        }, []);
    }

    private createPropertiesObjectFromEntries(component: PetriflowComponent): Properties {
        component = this.getComponentWithMissingProperties(component);
        if (!component || component.properties?.length === 0) {
            return undefined;
        }
        return component.properties.reduce((acc, obj) =>
            Object.assign(acc, {[obj.key]: obj.value}), {});
    }

    private buildOptions(dataField: GridsterDataField): Array<EnumerationFieldValue> {
        if (!dataField.dataVariable.options) {
            return [];
        }
        return dataField.dataVariable.options?.map(option => {
            return {key: option.key, value: option.value.value} as EnumerationFieldValue;
        });
    }

    private buildBehavior(dataField: GridsterDataField): Behavior {
        return {
            required: dataField.dataRef.logic.required ? true : undefined,
            optional: !dataField.dataRef.logic.required ? true : undefined,
            editable: dataField.dataRef.logic.behavior === DataRefBehavior.EDITABLE ? true : undefined,
            visible: dataField.dataRef.logic.behavior === DataRefBehavior.VISIBLE ? true : undefined,
            hidden: dataField.dataRef.logic.behavior === DataRefBehavior.HIDDEN ? true : undefined,
        } as Behavior;
    }

    private buildLayout(dataField: GridsterDataField): Layout {
        return {
            template: this.buildLayoutTemplate(dataField),
            appearance: this.buildLayoutAppearance(dataField),
            alignment: this.buildLayoutAlignment(dataField),
            offset: 0,
            x: 0,
            y: 0,
            rows: 0,
            cols: 0
        } as Layout;
    }

    private buildLayoutTemplate(dataField: GridsterDataField): TemplateAppearance {
        switch (dataField.dataRef.layout?.template) {
            case Template.NETGRIF:
                return TemplateAppearance.NETGRIF;
            case Template.MATERIAL:
            default:
                return TemplateAppearance.MATERIAL;
        }
    }

    private buildLayoutAppearance(dataField: GridsterDataField): MaterialAppearance {
        switch (dataField.dataRef.layout?.appearance) {
            case Appearance.LEGACY:
                return MaterialAppearance.LEGACY;
            case Appearance.FILL:
                return MaterialAppearance.FILL;
            case Appearance.STANDARD:
                return MaterialAppearance.STANDARD;
            case Appearance.OUTLINE:
            default:
                return MaterialAppearance.OUTLINE;
        }
    }

    private buildLayoutAlignment(dataField: GridsterDataField): FieldAlignment {
        switch (dataField.dataRef.layout?.alignment) {
            case Alignment.BOTTOM:
                return FieldAlignment.BOTTOM;
            case Alignment.TOP:
                return FieldAlignment.TOP;
            case Alignment.CENTER:
            default:
                return FieldAlignment.CENTER;
        }
    }

    private getComponentWithMissingProperties(component: PetriflowComponent): PetriflowComponent {
        if (component && component.properties.length === 0) {
            switch (component.name) {
                case 'currency':
                    component.properties.push(new Property('fractionSize', '2'));
                    break;
            }
        }
        return component;
    }

    private getComponent(dataField: GridsterDataField): PetriflowComponent {
        return dataField.dataRef.component ? dataField.dataRef.component : dataField.dataVariable.component;
    }
}
