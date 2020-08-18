/**
 * @ignore
 */
export interface ImmediateData {
    /**
     * @ignore
     */
    stringId: string;
    /**
     * @ignore
     */
    // TODO Doesn't actually exist
    title: any;
    /**
     * @ignore
     */
    type: string;
    /**
     * @ignore
     */
    value?: any;
    /**
     * Only for Fields of type CaseRef
     */
    allowedNets?: Array<string>;
}

/*
backend response example:

{
        immediateData: [
            {
                importId: 'dateTime',
                name: {
                    defaultValue: 'DateTime',
                    translations: {}
                },
                description: {
                    defaultValue: 'DateTime field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'DateTime field placeholder',
                    translations: {}
                },
                order: 0,
                type: 'dateTime',
                stringId: 'dateTime'
            },
            {
                importId: 'date',
                name: {
                    defaultValue: 'Date',
                    translations: {}
                },
                description: {
                    defaultValue: 'Date field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'Date field placeholder',
                    translations: {}
                },
                order: 1,
                type: 'date',
                stringId: 'date'
            },
            {
                importId: 'number',
                name: {
                    defaultValue: 'Number',
                    translations: {}
                },
                description: {
                    defaultValue: 'Number field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'Number field placeholder',
                    translations: {}
                },
                value: 10.0,
                order: 2,
                defaultValue: 10.0,
                type: 'number',
                stringId: 'number'
            },
            {
                importId: 'file',
                name: {
                    defaultValue: 'File',
                    translations: {}
                },
                description: {
                    defaultValue: 'File field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'File field placeholder',
                    translations: {}
                },
                order: 3,
                remote: false,
                type: 'file',
                stringId: 'file'
            },
            {
                importId: 'boolean',
                name: {
                    defaultValue: 'Boolean',
                    translations: {}
                },
                description: {
                    defaultValue: 'Boolean field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'Boolean field placeholder',
                    translations: {}
                },
                value: true,
                order: 4,
                defaultValue: true,
                type: 'boolean',
                stringId: 'boolean'
            },
            {
                importId: 'multichoice',
                name: {
                    defaultValue: 'Multichoice',
                    translations: {}
                },
                description: {
                    defaultValue: 'Multichoice field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'Multichoice field placeholder',
                    translations: {}
                },
                value: [{
                    defaultValue: 'multichoice2',
                    translations: {}
                }, {
                    defaultValue: 'multichoice',
                    translations: {}
                }],
                order: 5,
                defaultValue: [{
                    defaultValue: 'multichoice2',
                    translations: {}
                }, {
                    defaultValue: 'multichoice',
                    translations: {}
                }],
                choices: [{
                    defaultValue: 'multichoice',
                    translations: {}
                }, {
                    defaultValue: 'multichoice2',
                    translations: {}
                }, {
                    defaultValue: 'multichoice3',
                    translations: {}
                }],
                type: 'multichoice',
                stringId: 'multichoice'
            },
            {
                importId: 'text',
                name: {
                    defaultValue: 'Text',
                    translations: {}
                },
                description: {
                    defaultValue: 'Text field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'Text field placeholder',
                    translations: {}
                },
                value: 'text',
                order: 6,
                defaultValue: 'text',
                subType: 'simple',
                type: 'text',
                stringId: 'text'
            },
            {
                importId: 'enumeration',
                name: {
                    defaultValue: 'Enumeration',
                    translations: {}
                },
                description: {
                    defaultValue: 'Enumeration field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'Enumeration field placeholder',
                    translations: {}
                },
                value: {
                    defaultValue: 'enumeration',
                    translations: {}
                },
                order: 7,
                defaultValue: {
                    defaultValue: 'enumeration',
                    translations: {}
                },
                choices: [{
                    defaultValue: 'enumeration',
                    translations: {}
                }, {
                    defaultValue: 'enumeration2',
                    translations: {}
                }, {
                    defaultValue: 'enumeration3',
                    translations: {}
                }],
                type: 'enumeration',
                stringId: 'enumeration'
            },
            {
                importId: 'user',
                name: {
                    defaultValue: 'User',
                    translations: {}
                },
                description: {
                    defaultValue: 'User field description',
                    translations: {}
                },
                placeholder: {
                    defaultValue: 'User field placeholder',
                    translations: {}
                },
                order: 8,
                roles: [],
                type: 'user',
                stringId: 'user'
            }]
    }
*/
