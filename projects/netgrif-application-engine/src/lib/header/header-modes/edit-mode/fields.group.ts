import {FieldsGroup} from '../../models/fields-group';

/**
 * Definition of default meta-data available in edit mode
 * Immediate data will be added dynamically from resource
 */
export const fieldsGroup: Array<FieldsGroup> = [
    {
        type: 'META DATA',
        fields: [
            {
                stringId: 'initials',
                title: 'initials',
                type: 'text'
            },
            {
                stringId: 'title',
                title: 'title',
                type: 'text'
            }, {
                stringId: 'createdDate',
                title: 'create date',
                type: 'date'
            }, {
                stringId: 'author',
                title: 'author',
                type: 'text'
            }, {
                stringId: 'version',
                title: 'version',
                type: 'text'
            }]
    },
    {
        type: 'ALL DATA VARIABLES', fields: []
    }
];
