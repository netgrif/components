import {DataFieldResource, DataGroupResource} from './resource-service';

export class Resources {
    static cols = 4;
    static data1: DataGroupResource[] = [{
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
        title: 'Enumerations',
        alignment: '',
        stretch: false
    }
    ];
    static data2: DataGroupResource[] = [{
        fields: [
            {
                stringId: 'number',
                type: 'number',
                name: 'Number',
                behavior: {
                    visible: true
                },
                value: 10000.0,
                order: 0,
                defaultValue: 10000.0
            }, {
                stringId: 'number_currency',
                type: 'number',
                name: 'Number currency',
                behavior: {
                    visible: true
                },
                value: 10000.0,
                order: 1,
                defaultValue: 10000.0
            }],
        title: 'Number fields',
        alignment: '',
        stretch: false
    }, {
        fields: [{
            stringId: 'text',
            type: 'text',
            name: 'Text',
            behavior: {
                visible: true
            },
            value: 'Lorem ipsum',
            order: 2,
            subType: 'simple',
            defaultValue: 'Lorem ipsum'
        }, {
            stringId: 'text_area',
            type: 'text',
            name: 'Text area',
            behavior: {
                visible: true
            },
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ' +
                'vitrwerwerwerwerwae magna in libero semper            vulputate ut eu sapien. Phasellus vel.',
            order: 3,
            subType: 'simple',
            defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Pellentesque vitae magna in libero semper\n            vulputate ut eu sapien. Phasellus vel.\n        '
        }],
        title: 'Text fields',
        alignment: '',
        stretch: false
    }, {
        fields: [{
            stringId: 'enumeration',
            type: 'enumeration',
            name: 'Enumeration',
            behavior: {
                visible: true
            },
            value: 'Bob',
            order: 4,
            choices: ['Alice', 'Bob', 'Carol'],
            defaultValue: 'Bob'
        }, {
            stringId: 'enumeration_autocomplete',
            type: 'enumeration',
            name: 'Enumeration autocomplete',
            behavior: {
                visible: true
            },
            value: 'Bob',
            order: 5,
            view: {
                value: 'autocomplete'
            },
            choices: ['Alice', 'Bob', 'Carol'],
            defaultValue: 'Bob'
        }, {
            stringId: 'enumeration_list',
            type: 'enumeration',
            name: 'Enumeration list',
            behavior: {
                visible: true
            },
            value: 'Bob',
            order: 6,
            view: {
                value: 'list'
            },
            choices: ['Alice', 'Bob', 'Carol'],
            defaultValue: 'Bob'
        }],
        title:
            'Enumeration fields',
        alignment:
            '',
        stretch:
            false
    }, {
        fields: [{
            stringId: 'multichoice',
            type: 'multichoice',
            name: 'Multichoice',
            behavior: {
                visible: true
            },
            value: ['Alice', 'Bob'],
            order: 7,
            choices: ['Alice', 'Bob', 'Carol'],
            defaultValue: ['Bob', 'Alice']
        }, {
            stringId: 'multichoice_list',
            type: 'multichoice',
            name: 'Multichoice list',
            behavior: {
                visible: true
            },
            value: ['Bob', 'Alice'],
            order: 8,
            view: {
                value: 'list'
            },
            choices: ['Alice', 'Bob', 'Carol'],
            defaultValue: ['Bob', 'Alice']
        }],
        title: 'Multichoice fields',
        alignment: '',
        stretch: false
    }, {
        fields: [{
            stringId: 'boolean',
            type: 'boolean',
            name: 'Boolean',
            behavior: {
                visible: true
            },
            value: false,
            order: 9,
            defaultValue: false
        }],
        title: 'Boolean fields',
        alignment: '',
        stretch: false
    }, {
        fields: [{
            stringId: 'datetime',
            type: 'dateTime',
            name: 'Datetime',
            behavior: {
                visible: true
            },
            order: 11
        }, {
            stringId: 'date',
            type: 'date',
            name: 'Date',
            behavior: {
                visible: true
            },
            order: 10
        }],
        title: 'Date fields',
        alignment: '',
        stretch: false
    }, {
        fields: [{
            stringId: 'file',
            type: 'file',
            name: 'File',
            behavior: {
                visible: true
            },
            order: 12
        }],
        title: 'File fields',
        alignment: '',
        stretch: false
    }, {
        fields: [{
            stringId: 'user',
            type: 'user',
            name: 'User',
            behavior: {
                visible: true
            },
            order: 13,
            roles: []
        }],
        title: 'User fields',
        alignment: '',
        stretch: false
    }, {
        fields:
            [{
                stringId: 'button',
                type: 'button',
                name: 'Button',
                placeholder: 'Push',
                behavior: {
                    visible: true
                },
                order: 14
            }]
        ,
        title: 'Button fields',
        alignment: '',
        stretch: false
    }
    ];

    static data3: DataGroupResource[] =
        [{
            fields: [{
                stringId: 'text',
                type: 'text',
                name: 'Text',
                behavior: {
                    visible: true
                },
                value: 'Lorem ipsum',
                order: 0,
                subType: 'simple',
                defaultValue: 'Lorem ipsum'
            }, {
                stringId: 'number',
                type: 'number',
                name: 'Number',
                behavior: {
                    visible: true,
                    editable: true
                },
                value: 10000.0,
                order: 1,
                defaultValue: 10000.0
            }, {
                stringId: 'enumeration',
                type: 'enumeration',
                name: 'Enumeration',
                behavior: {
                    visible: true,
                    editable: true
                },
                value: 'Bob',
                order: 2,
                choices: ['Alice', 'Bob', 'Carol'],
                defaultValue: 'Bob'
            }],
            title: 'Stretch',
            alignment: 'start',
            stretch: true
        }
            , {
            fields: [{
                stringId: 'text',
                type: 'text',
                name: 'Text',
                behavior: {
                    visible: true
                },
                value: 'Lorem ipsum',
                order: 0,
                subType: 'simple',
                defaultValue: 'Lorem ipsum'
            }, {
                stringId: 'number',
                type: 'number',
                name: 'Number',
                behavior: {
                    visible: true,
                    editable: true
                },
                value: 10000.0,
                order: 1,
                defaultValue: 10000.0
            }, {
                stringId: 'enumeration',
                type: 'enumeration',
                name: 'Enumeration',
                behavior: {
                    visible: true,
                    editable: true
                },
                value: 'Bob',
                order: 2,
                choices: ['Alice', 'Bob', 'Carol'],
                defaultValue: 'Bob'
            }]
            ,
            title: 'Alignment - Right'
            ,
            alignment: 'end'
            ,
            stretch: false
        }

            ,
            {
                fields:
                    [{
                        stringId: 'text',
                        type: 'text',
                        name: 'Text',
                        behavior: {
                            visible: true
                        },
                        value: 'Lorem ipsum',
                        order: 0,
                        subType: 'simple',
                        defaultValue: 'Lorem ipsum'
                    }, {
                        stringId: 'number',
                        type: 'number',
                        name: 'Number',
                        behavior: {
                            visible: true,
                            editable: true
                        },
                        value: 10000.0,
                        order: 1,
                        defaultValue: 10000.0
                    }, {
                        stringId: 'enumeration',
                        type: 'enumeration',
                        name: 'Enumeration',
                        behavior: {
                            visible: true,
                            editable: true
                        },
                        value: 'Bob',
                        order: 2,
                        choices: ['Alice', 'Bob', 'Carol'],
                        defaultValue: 'Bob'
                    }],
                title:
                    'Alignment - Left',
                alignment:
                    'start',
                stretch:
                    false
            }
            ,
            {
                fields:
                    [{
                        stringId: 'text',
                        type: 'text',
                        name: 'Text',
                        behavior: {
                            visible: true
                        },
                        value: 'Lorem ipsum',
                        order: 0,
                        subType: 'simple',
                        defaultValue: 'Lorem ipsum'
                    },{
                        stringId: 'number',
                        type: 'number',
                        name: 'Number',
                        behavior: {
                            visible: true,
                            editable: true
                        },
                        value: 10000.0,
                        order: 1,
                        defaultValue: 10000.0
                    }, {
                        stringId: 'enumeration',
                        type: 'enumeration',
                        name: 'Enumeration',
                        behavior: {
                            visible: true,
                            editable: true
                        },
                        value: 'Bob',
                        order: 2,
                        choices: ['Alice', 'Bob', 'Carol'],
                        defaultValue: 'Bob'
                    }],
                title:
                    'Alignment - Center',
                alignment:
                    'center',
                stretch:
                    false
            }
        ]
    ;
}
