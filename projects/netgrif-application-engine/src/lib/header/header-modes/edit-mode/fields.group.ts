import {FieldsGroup} from "../../models/fields-group";

/**
 * Definition of default meta-data available in edit mode
 * Immediate data will be added dynamically from resource
 */
export let fieldsGroup: Array<FieldsGroup> = [
    {
        type: 'META DATA',
        fields: [
            {
                stringId: 'title',
                title: 'title',
                type: 'text'
            }, {
                stringId: 'createdDate',
                title: 'create date',
                type: 'text'
            }, {
                stringId: 'author',
                title: 'author',
                type: 'text'
            }, {
                stringId: 'visual ID',
                title: 'visual-id',
                type: 'text'
            }]
    },
    {
        type: 'ALL DATA VARIABLES', fields: []
    }
];
