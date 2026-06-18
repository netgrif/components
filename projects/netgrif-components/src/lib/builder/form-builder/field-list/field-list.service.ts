import {Injectable} from '@angular/core';
import {DataType} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {GridsterDataField} from '../gridster/classes/gridster-data-field';

export interface PropertyDef {
    name: string;
    defaultValue: any;
}

export interface ComponentDef {
    title: string;
    name?: string;
    rows?: number;
    cols?: number;
    properties?: Array<PropertyDef>;
    showPlaceholder?: boolean;
}

export interface DataRefDef {
    type: DataType;
    components: Array<ComponentDef>;
    properties?: Array<PropertyDef>;
    showPlaceholder?: boolean;
}

@Injectable()
export class FieldListService {

    static DEFAULT_FIELD_COLS = 2;
    static DEFAULT_FIELD_ROWS = 1;

    fieldListArray: Array<DataRefDef> = [
        {
            type: DataType.TEXT,
            components: [
                {title: 'Simple'},
                {title: 'Area', name: 'textarea', rows: 2, cols: 4},
                {title: 'Markdown Editor', name: 'richtextarea', rows: 2, cols: 4},
                {title: 'HTML Editor', name: 'htmltextarea', rows: 2, cols: 4},
                {title: 'Password', name: 'password'},
                {title: 'Signature', name: 'signature'}
            ]
        },
        {
            type: DataType.NUMBER,
            components: [
                {title: 'Simple'},
                {
                    title: 'Decimal',
                    name: 'decimal',
                    properties: [
                        {
                            name: 'digitsInfo',
                            defaultValue: '1.0-3'
                        },
                        {
                            name: 'locale',
                            defaultValue: 'sk'
                        },
                    ]
                },
                {
                    title: 'Currency',
                    name: 'currency',
                    properties: [
                        {
                            name: 'code',
                            defaultValue: 'EUR'
                        },
                        {
                            name: 'fractionSize',
                            defaultValue: '2'
                        },
                        {
                            name: 'locale',
                            defaultValue: 'sk'
                        },
                    ]
                }
            ]
        },
        {
            type: DataType.ENUMERATION,
            components: [
                {title: 'Select'},
                {title: 'List', name: 'list'},
            ]
        },
        {
            type: DataType.ENUMERATION_MAP,
            components: [
                {title: 'Select'},
                {title: 'List', name: 'list'},
                {
                    title: 'Stepper',
                    name: 'stepper',
                    properties: [
                        {
                            name: 'arrowStepper',
                            defaultValue: 'true'
                        }
                    ]
                },
                {
                    title: 'Autocomplete',
                    name: 'autocomplete',
                    properties: [
                        {
                            name: 'filter',
                            defaultValue: 'prefix'
                        }
                    ]
                },
                {title: 'Dynamic Autocomplete', name: 'autocomplete_dynamic'},
                {
                    title: 'Icon',
                    name: 'icon',
                    properties: [
                        {
                            name: 'horizontal',
                            defaultValue: 'true'
                        },
                        {
                            name: 'arrow',
                            defaultValue: 'true'
                        },
                        {
                            name: 'divider',
                            defaultValue: 'true'
                        }
                    ]
                },
                {
                    title: 'Case ref',
                    name: 'caseref',
                    showPlaceholder: true,
                    properties: [
                        {
                            name: 'filter',
                            defaultValue: 'true'
                        },
                        {
                            name: 'filterQuery',
                            defaultValue: '{}'
                        },
                        {
                            name: 'headers',
                            defaultValue: 'meta-visualID,meta-mongoID,meta-title,meta-author,meta-creationDate'
                        },
                        {
                            name: 'createCase',
                            defaultValue: 'true'
                        },
                        {
                            name: 'search',
                            defaultValue: 'true'
                        }
                    ]
                }
            ]
        },
        {
            type: DataType.MULTICHOICE,
            components: [
                {title: 'Select'},
                {title: 'List', name: 'list'}
            ]
        },
        {
            type: DataType.MULTICHOICE_MAP,
            components: [
                {title: 'Select'},
                {title: 'List', name: 'list'},
                {
                    title: 'Autocomplete',
                    name: 'autocomplete',
                    properties: [
                        {
                            name: 'filter',
                            defaultValue: 'prefix'
                        }
                    ]
                },
                {
                    title: 'Case ref',
                    name: 'caseref',
                    showPlaceholder: true,
                    properties: [
                        {
                            name: 'filter',
                            defaultValue: 'true'
                        },
                        {
                            name: 'filterQuery',
                            defaultValue: '{}'
                        },
                        {
                            name: 'headers',
                            defaultValue: 'meta-visualID,meta-mongoID,meta-title,meta-author,meta-creationDate'
                        },
                        {
                            name: 'createCase',
                            defaultValue: 'true'
                        },
                        {
                            name: 'search',
                            defaultValue: 'true'
                        }
                    ]
                }
            ]
        },
        {
            type: DataType.BOOLEAN,
            components: [
                {title: 'Slide'}
            ]
        },
        {
            type: DataType.BUTTON,
            components: [
                {title: 'Simple'},
                {title: 'Raised', name: 'raised'},
                {title: 'Stroked', name: 'stroked'},
                {title: 'Flat', name: 'flat'},
                {title: 'Icon', name: 'icon'},
                {title: 'FAB', name: 'fab'},
                {title: 'MiniFAB', name: 'minifab'}
            ],
            properties: [
                {
                    name: 'dialogText',
                    defaultValue: ''
                },
                {
                    name: 'dialogTitle',
                    defaultValue: ''
                },
                {
                    name: 'align',
                    defaultValue: ''
                },
                {
                    name: 'stretch',
                    defaultValue: 'true'
                }
            ]
        },
        {
            type: DataType.DATE,
            components: [
                {title: 'Simple'}
            ]
        },
        {
            type: DataType.DATETIME,
            components: [
                {title: 'Simple'}
            ]
        },
        {
            type: DataType.FILE,
            components: [
                {title: 'Simple'},
                {
                    title: 'Preview',
                    name: 'preview',
                    properties: [
                        {
                            name: 'borderWidth',
                            defaultValue: '0'
                        },
                        {
                            name: 'borderStyle',
                            defaultValue: 'none'
                        },
                        {
                            name: 'borderColor',
                            defaultValue: 'black'
                        },
                        {
                            name: 'borderEnabled',
                            defaultValue: 'true'
                        }
                    ]
                }
            ]
        },
        {
            type: DataType.FILE_LIST,
            components: [
                {title: 'Simple'}
            ]
        },
        {
            type: DataType.USER,
            components: [
                {title: 'Simple'}
            ]
        },
        {
            type: DataType.USER_LIST,
            components: [
                {title: 'Simple'}
            ]
        },
        {
            type: DataType.CASE_FILTER,
            components: [
                {title: 'Simple'},
            ]
        },
        {
            type: DataType.TASK_FILTER,
            components: [
                {title: 'Simple'},
            ]
        },
        {
            type: DataType.PROCESS_FILTER,
            components: [
                {title: 'Simple'},
            ]
        },
        {
            type: DataType.I18N,
            components: [
                {
                    title: 'Text',
                    name: 'text',
                    properties: [
                        {
                            name: 'plainText',
                            defaultValue: 'true'
                        },
                        {
                            name: 'boldText',
                            defaultValue: 'true'
                        },
                        {
                            name: 'textColor',
                            defaultValue: 'black'
                        },
                        {
                            name: 'fontSize',
                            defaultValue: '12'
                        }
                    ]
                },
                {
                    title: 'Divider',
                    name: 'divider',
                    cols: 4,
                    properties: [
                        {
                            name: 'dividerColor',
                            defaultValue: 'black'
                        },
                        {
                            name: 'fontSize',
                            defaultValue: '12'
                        }
                    ]
                }
            ]
        },
        {
            type: DataType.TASK_REF,
            showPlaceholder: true,
            components: [
                {title: 'Simple', cols: 4},
                {title: 'Dashboard', name: 'dashboard', cols: 4}
            ]
        },
        {
            type: DataType.CASE_REF,
            showPlaceholder: true,
            components: [
                {title: 'Simple'}
            ],
            properties: [
                {
                    name: 'filter',
                    defaultValue: 'true'
                },
                {
                    name: 'filterQuery',
                    defaultValue: '{}'
                },
                {
                    name: 'headers',
                    defaultValue: 'meta-visualID,meta-mongoID,meta-title,meta-author,meta-creationDate'
                },
                {
                    name: 'createCase',
                    defaultValue: 'true'
                },
                {
                    name: 'search',
                    defaultValue: 'true'
                }
            ]
        },
        {
            type: 'stringCollection' as DataType,
            components: [
                {title: 'Simple'}
            ],
            properties: [
                {
                    name: 'semicolon',
                    defaultValue: 'true'
                },
                {
                    name: 'comma',
                    defaultValue: 'true'
                }
            ]
        }
    ];

    public draggedObjectsStream: Subject<GridsterDataField>;

    constructor() {
        this.draggedObjectsStream = new Subject();
    }

    public getComponentMeta(type: DataType, componentName: string): ComponentDef {
        const meta = {
            rows: FieldListService.DEFAULT_FIELD_ROWS,
            cols: FieldListService.DEFAULT_FIELD_COLS,
            name: componentName
        } as ComponentDef;
        if (type === undefined || componentName === undefined) {
            return meta;
        }
        const fieldTypeObject = this.fieldListArray.find(it => it.type === type);
        if (!fieldTypeObject) {
            return meta;
        }
        const componentObject = fieldTypeObject?.components?.find(it => it.name === componentName);
        if (!componentObject) {
            return meta;
        }
        if (componentObject.rows) {
            meta.rows = componentObject.rows;
        }
        if (componentObject.cols) {
            meta.cols = componentObject.cols;
        }
        return meta;
    }

    public isPlaceholderField(dataField: GridsterDataField): boolean {
        if (!dataField.dataVariable.type) {
            return true;
        }
        const component = !!dataField.dataRef.component ? dataField.dataRef.component : dataField.dataVariable.component;
        const dataDef = this.fieldListArray.find(it => it.type === dataField.dataVariable.type);
        if (!dataDef) {
            return true;
        }
        const simpleComponent = dataDef.components.find(it => !it.name);
        if (!component || !component.name) {
            if (!!simpleComponent && 'showPlaceholder' in simpleComponent) {
                return simpleComponent.showPlaceholder;
            }
            return !!dataDef.showPlaceholder;
        }
        const compDef = dataDef.components.find(it => it.name === component.name);
        if (!compDef || !('showPlaceholder' in compDef)) {
            return !!dataDef.showPlaceholder;
        }
        return !!compDef.showPlaceholder;
    }
}
