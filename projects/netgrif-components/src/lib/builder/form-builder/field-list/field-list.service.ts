import {Injectable} from '@angular/core';
import {DataType} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {GridsterDataField} from '../gridster/classes/gridster-data-field';
import {TranslateService} from "@ngx-translate/core";

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

    fieldListArray: Array<DataRefDef>;

    public draggedObjectsStream: Subject<GridsterDataField>;

    constructor(protected _translateService: TranslateService) {
        this.draggedObjectsStream = new Subject();
        this.fieldListArray = [
            {
                type: DataType.TEXT,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                    {title: this._translateService.instant('builder.form-builder.field-list.area'), name: 'textarea', rows: 2, cols: 4},
                    {title: this._translateService.instant('builder.form-builder.field-list.markdownEditor'), name: 'richtextarea', rows: 2, cols: 4},
                    {title: this._translateService.instant('builder.form-builder.field-list.htmlEditor'), name: 'htmltextarea', rows: 2, cols: 4},
                    {title: this._translateService.instant('builder.form-builder.field-list.password'), name: 'password'},
                    {title: this._translateService.instant('builder.form-builder.field-list.signature'), name: 'signature'}
                ]
            },
            {
                type: DataType.NUMBER,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.decimal'),
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
                        title: this._translateService.instant('builder.form-builder.field-list.currency'),
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
                    {title: this._translateService.instant('builder.form-builder.field-list.select')},
                    {title: this._translateService.instant('builder.form-builder.field-list.list'), name: 'list'},
                ]
            },
            {
                type: DataType.ENUMERATION_MAP,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.select')},
                    {title: this._translateService.instant('builder.form-builder.field-list.list'), name: 'list'},
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.stepper'),
                        name: 'stepper',
                        properties: [
                            {
                                name: 'arrowStepper',
                                defaultValue: 'true'
                            }
                        ]
                    },
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.autocomplete'),
                        name: 'autocomplete',
                        properties: [
                            {
                                name: 'filter',
                                defaultValue: 'prefix'
                            }
                        ]
                    },
                    {title: this._translateService.instant('builder.form-builder.field-list.dynamicAutocomplete'), name: 'autocomplete_dynamic'},
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.icon'),
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
                        title: this._translateService.instant('builder.form-builder.field-list.caseRef'),
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
                    {title: this._translateService.instant('builder.form-builder.field-list.select')},
                    {title: this._translateService.instant('builder.form-builder.field-list.list'), name: 'list'}
                ]
            },
            {
                type: DataType.MULTICHOICE_MAP,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.select')},
                    {title: this._translateService.instant('builder.form-builder.field-list.list'), name: 'list'},
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.autocomplete'),
                        name: 'autocomplete',
                        properties: [
                            {
                                name: 'filter',
                                defaultValue: 'prefix'
                            }
                        ]
                    },
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.caseRef'),
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
                    {title: this._translateService.instant('builder.form-builder.field-list.slide')}
                ]
            },
            {
                type: DataType.BUTTON,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                    {title: this._translateService.instant('builder.form-builder.field-list.raised'), name: 'raised'},
                    {title: this._translateService.instant('builder.form-builder.field-list.stroked'), name: 'stroked'},
                    {title: this._translateService.instant('builder.form-builder.field-list.flat'), name: 'flat'},
                    {title: this._translateService.instant('builder.form-builder.field-list.icon'), name: 'icon'},
                    {title: this._translateService.instant('builder.form-builder.field-list.fab'), name: 'fab'},
                    {title: this._translateService.instant('builder.form-builder.field-list.MiniFAB'), name: 'minifab'}
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
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
                ]
            },
            {
                type: DataType.DATETIME,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
                ]
            },
            {
                type: DataType.FILE,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.preview'),
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
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
                ]
            },
            {
                type: DataType.USER,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
                ]
            },
            {
                type: DataType.USER_LIST,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
                ]
            },
            {
                type: DataType.CASE_FILTER,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                ]
            },
            {
                type: DataType.TASK_FILTER,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                ]
            },
            {
                type: DataType.PROCESS_FILTER,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')},
                ]
            },
            {
                type: DataType.I18N,
                components: [
                    {
                        title: this._translateService.instant('builder.form-builder.field-list.text'),
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
                        title: this._translateService.instant('builder.form-builder.field-list.divider'),
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
                    {title: this._translateService.instant('builder.form-builder.field-list.simple'), cols: 4},
                    {title: this._translateService.instant('builder.form-builder.field-list.dashboard'), name: 'dashboard', cols: 4}
                ]
            },
            {
                type: DataType.CASE_REF,
                showPlaceholder: true,
                components: [
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
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
                    {title: this._translateService.instant('builder.form-builder.field-list.simple')}
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
