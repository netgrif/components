import {DataFieldResource, DataGroupResource} from './resource-service';

export class Resources {
    static cols = 4;
    static data: DataGroupResource[] = [{
            fields: [
                {
                    stringId: 'text',
                    type: 'text',
                    name: 'Text',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: 'text',
                    order: 0,
                    defaultValue: 'text'
                },
                {
                    stringId: 'text_area',
                    type: 'text',
                    name: 'Text_area',
                    description: 'Text field description',
                    placeholder: 'Text field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: 'text',
                    order: 1,
                    view: {
                        value: 'area'
                    },
                    subType: 'simple',
                    formatting: 'example@example.com',
                    defaultValue: 'text'
                },
                {
                    stringId: 'number',
                    type: 'number',
                    name: 'Number',
                    description: 'Number field description',
                    placeholder: 'Number field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: 10.0,
                    order: 2,
                    minValue: 0.0,
                    defaultValue: 10.0
                },
                {
                    stringId: 'multichoice',
                    type: 'multichoice',
                    name: 'Multichoice',
                    description: 'Multichoice field description',
                    placeholder: 'Multichoice field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: [
                        'multichoice',
                        'multichoice2'
                    ],
                    order: 5,
                    choices: [
                        'multichoice',
                        'multichoice2',
                        'multichoice3'
                    ],
                    defaultValue: [
                        'multichoice',
                        'multichoice2'
                    ]
                },
                {
                    stringId: 'multichoice',
                    type: 'multichoice',
                    name: 'Multichoice',
                    description: 'Multichoice field description',
                    placeholder: 'Multichoice field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: [
                        'multichoice',
                        'multichoice2'
                    ],
                    order: 6,
                    view: {
                        value: 'list'
                    },
                    choices: [
                        'multichoice',
                        'multichoice2',
                        'multichoice3',
                        'multichoice4',
                        'multichoice21',
                        'multichoice31',
                        'multichoice22',
                        'multichoice23',
                        'multichoice33'
                    ],
                    defaultValue: [
                        'multichoice',
                        'multichoice2'
                    ]
                },
                {
                    stringId: 'boolean',
                    type: 'boolean',
                    name: 'Boolean',
                    description: 'Boolean field description',
                    placeholder: 'Boolean field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: true,
                    order: 7,
                    defaultValue: true
                },
                {
                    stringId: 'date',
                    type: 'date',
                    name: 'Date',
                    description: 'Date field description',
                    placeholder: 'Date field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    order: 8,
                    minDate: '2020-03-09',
                },
                {
                    stringId: 'file',
                    type: 'file',
                    name: 'File',
                    description: 'File field description',
                    placeholder: 'File field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    order: 9
                },
                {
                    stringId: 'user',
                    type: 'user',
                    name: 'User',
                    description: 'User field description',
                    placeholder: 'User field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    order: 10,
                    roles: []
                },
                {
                    stringId: 'dateTime',
                    type: 'dateTime',
                    name: 'DateTime',
                    description: 'DateTime field description',
                    placeholder: 'DateTime field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    order: 11
                },
                {
                    stringId: 'button',
                    type: 'button',
                    name: 'Button',
                    description: 'Button field description',
                    placeholder: 'Button field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    order: 0,
                    subType: 'simple',
                    defaultValue: 'button'
                }
            ],
            title: '',
            alignment: '',
            stretch: false
        }, {
            fields: [
                {
                    stringId: 'enumeration',
                    type: 'enumeration',
                    name: 'Enumeration',
                    description: 'Enumeration field description',
                    placeholder: 'Enumeration field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: 'enumeration2',
                    order: 3,
                    choices: [
                        'enumeration',
                        'enumeration2',
                        'enumeration3'
                    ],
                    defaultValue: 'enumeration'
                },
                {
                    stringId: 'enumeration',
                    type: 'enumeration',
                    name: 'Enumeration',
                    description: 'Enumeration field description',
                    placeholder: 'Enumeration field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: 'enumeration',
                    order: 3,
                    view: {
                        value: 'list'
                    },
                    choices: [
                        'enumeration',
                    ],
                    defaultValue: 'enumeration'
                },
                {
                    stringId: 'enumeration',
                    type: 'enumeration',
                    name: 'Enumeration',
                    description: 'Enumeration field description',
                    placeholder: 'Enumeration field placeholder',
                    behavior: {
                        editable: true,
                        required: true
                    },
                    value: 'enumeration2',
                    order: 4,
                    view: {
                        value: 'autocomplete'
                    },
                    choices: [
                        'enumeration',
                        'enumeration2',
                        'enumeration3'
                    ],
                    defaultValue: 'enumeration'
                },
            ],
            title: '',
            alignment: '',
            stretch: true
    }
    ];
    }
