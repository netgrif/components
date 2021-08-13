import {GridLayout} from '../../grid-layout/model/grid-element';
import {BooleanField} from '../../../data-fields/boolean-field/models/boolean-field';
import {ButtonField} from '../../../data-fields/button-field/models/button-field';
import {TemplateAppearance} from '../../../data-fields/models/template-appearance';
import {MaterialAppearance} from '../../../data-fields/models/material-appearance';
import {IncrementingCounter} from '../../incrementing-counter';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {DataField} from '../../../data-fields/models/abstract-data-field';
import {TextField} from '../../../data-fields/text-field/models/text-field';

/**
 * Creates a mock boolean or button field, with the specified properties
 * @param visible if `true` the fields behavior is set to `editable`, if `false` the fields behavior is set to `hidden`
 * @param layout position of the field in the grid layout
 * @param counterOrStringId if a `string` is provided its value will be used as the fields ID.
 * If a number is provided the fields ID will be set to 'f<number>'.
 * If an {@link IncrementingCounter} is provided the ID will follow the same pattern as for the `number` argument,
 * but the counter will be used to generate the number.
 * @param fieldType determines the field type of the mocked field. Not all types are supported.
 * Throws an error if an unsupported type is used. By default creates a boolean field.
 */
export function createMockField(visible = true,
                                layout: GridLayout = {x: 0, y: 0, rows: 0, cols: 0},
                                counterOrStringId: number | IncrementingCounter | string = 0,
                                fieldType = FieldTypeResource.BOOLEAN): DataField<unknown> {
    const b = visible ? {editable: true} : {hidden: true};
    const l = {
        ...layout,
        template: TemplateAppearance.MATERIAL,
        appearance: MaterialAppearance.OUTLINE,
        offset: 0
    };

    let id;
    if (counterOrStringId instanceof IncrementingCounter || typeof counterOrStringId === 'number') {
        id = 'f' + (counterOrStringId instanceof IncrementingCounter ? counterOrStringId.next() : counterOrStringId);
    } else {
        id = counterOrStringId;
    }

    switch (fieldType) {
        case FieldTypeResource.BOOLEAN:
            return new BooleanField(id, 'title', false, b, '', '', l);
        case FieldTypeResource.BUTTON:
            return new ButtonField(id, 'title', b, 0, '', '', l);
        case FieldTypeResource.TEXT:
            return new TextField(id, 'title', '', b, '', '', l);
        default:
            throw new Error(`Field type '${fieldType}' is currently not supported by the mock!`);
    }
}
