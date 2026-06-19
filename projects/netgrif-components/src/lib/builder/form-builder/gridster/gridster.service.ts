import {Injectable} from '@angular/core';
import {
  Appearance,
  Component,
  DataGroup,
  DataRef,
  DataRefBehavior,
  DataType,
  DataVariable,
  Expression,
  I18nWithDynamic,
  Property,
  Template,
  Transition,
  TransitionLayout,
} from '@netgrif/petriflow';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
} from 'angular-gridster2';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ModelerConfig} from '../../modeler/modeler-config';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {DataFieldUtils} from '../data-field-utils';
import {FieldListService, PropertyDef} from '../field-list/field-list.service';
import {GridsterDataField} from './classes/gridster-data-field';

@Injectable()
export class GridsterService {
    public static readonly EXISTING_FIELD = 'existingField';

    private _options: GridsterConfig;
    private _mapCounter: Map<string, number>;
    private _placedDataFields: Array<GridsterDataField>;
    private _selectedDataField: GridsterDataField;
    private _selectedDataFieldStream: ReplaySubject<GridsterDataField>;
    private _selectedDataFieldChangeStream: BehaviorSubject<void>;
    private _onNewFieldPlaced: ReplaySubject<DataVariable>;
    private _optionChanged: Subject<void>;
    private _historySave: boolean;

    constructor(private modelService: ModelService, private transitionService: SelectedTransitionService) {
        this._options = {
            gridType: GridType.VerticalFixed,
            compactType: CompactType.None,
            margin: 0,
            useTransformPositioning: true,
            mobileBreakpoint: 640,
            minCols: ModelerConfig.LAYOUT_DEFAULT_COLS,
            maxCols: ModelerConfig.LAYOUT_DEFAULT_COLS,
            minRows: 1,
            maxRows: 1000,
            maxItemCols: ModelerConfig.LAYOUT_DEFAULT_COLS,
            minItemCols: 1,
            maxItemRows: 10,
            minItemRows: 1,
            maxItemArea: 2500,
            minItemArea: 1,
            defaultItemCols: 1,
            defaultItemRows: 1,
            fixedColWidth: 105,
            fixedRowHeight: 110,
            keepFixedHeightInMobile: false,
            keepFixedWidthInMobile: false,
            scrollSensitivity: 10,
            scrollSpeed: 20,
            enableEmptyCellClick: false,
            enableEmptyCellContextMenu: false,
            enableEmptyCellDrag: false,
            enableOccupiedCellDrop: false,
            emptyCellDragMaxCols: ModelerConfig.LAYOUT_DEFAULT_COLS,
            emptyCellDragMaxRows: 50,
            ignoreMarginInRow: false,
            draggable: {
                enabled: true,
            },
            resizable: {
                enabled: true,
            },
            swap: false,
            pushItems: true,
            disablePushOnDrag: false,
            disablePushOnResize: false,
            pushDirections: {north: true, east: true, south: true, west: true},
            pushResizeItems: false,
            displayGrid: DisplayGrid.Always,
            disableWindowResize: false,
            disableWarnings: false,
            scrollToNewItems: false,
            emptyCellDropCallback: this.emptyCellClick.bind(this),
            emptyCellDragCallback: this.emptyCellClick.bind(this),
            itemResizeCallback: this.updateDataRef.bind(this),
            itemChangeCallback: this.updateDataRef.bind(this),
            enableEmptyCellDrop: true,
            ignoreContent: true,
            ignoreContentClass: 'gridster-item-content',
            dragHandleClass: 'drag-handler'
        };
        this._placedDataFields = new Array<GridsterDataField>();
        this._mapCounter = new Map<string, number>();
        this._selectedDataFieldChangeStream = new BehaviorSubject<void>(undefined);
        this._onNewFieldPlaced = new ReplaySubject();
        this._selectedDataFieldStream = new ReplaySubject();
        this._optionChanged = new Subject<void>();
        this._optionChanged.pipe(debounceTime(300)).subscribe(() => {
            this._options?.api?.optionsChanged();
        });
    }

    get options(): GridsterConfig { return this._options; }

    get placedDataFields(): Array<GridsterDataField> { return this._placedDataFields; }
    set placedDataFields(value: Array<GridsterDataField>) { this._placedDataFields = value; }

    get selectedDataField(): GridsterDataField { return this._selectedDataField; }
    set selectedDataField(value: GridsterDataField) { this._selectedDataField = value; }

    get historySave(): boolean { return this._historySave; }
    set historySave(value: boolean) { this._historySave = value; }

    selectedDataFieldStream$(): Observable<GridsterDataField> { return this._selectedDataFieldStream.asObservable(); }
    notifySelectedDataField(field: GridsterDataField | undefined): void { this._selectedDataFieldStream.next(field); }

    selectedDataFieldChangeStream$(): Observable<void> { return this._selectedDataFieldChangeStream.asObservable(); }
    notifySelectedDataFieldChange(): void { this._selectedDataFieldChangeStream.next(); }

    onNewFieldPlaced$(): Observable<DataVariable> { return this._onNewFieldPlaced.asObservable(); }

    get transition(): Transition {
        const transition = this.modelService.model.getTransition(this.transitionId);
        if (!transition?.layout) {
            transition.layout = new TransitionLayout();
        }
        return transition;
    }

    get transitionId(): string {
        return this.transitionService.id;
    }

    emptyCellClick(event: DragEvent, item: GridsterItem) {
        if (!event?.dataTransfer?.getData('type') && !event?.dataTransfer?.getData(GridsterService.EXISTING_FIELD)) {
            return;
        }
        const isExistingField = event.dataTransfer.getData(GridsterService.EXISTING_FIELD) === 'true';
        let dataVariable: DataVariable;
        if (!isExistingField) {
            dataVariable = this.addNewDataVariable(event.dataTransfer.getData('type') as DataType);
        } else {
            const id = event.dataTransfer.getData('id');
            dataVariable = this.modelService.model.getData(id);
        }
        this.addNewDataRef(dataVariable, event, item);
    }

    updateDataRef(item: GridsterDataField, resized: GridsterItemComponentInterface) {
        item.x = item.dataRef.layout.x = resized.$item.x;
        item.y = item.dataRef.layout.y = resized.$item.y;
        item.rows = item.dataRef.layout.rows = resized.$item.rows;
        item.cols = item.dataRef.layout.cols = resized.$item.cols;
        this._historySave = true;
        this.updateGridsterRows();
    }

    updatePlacedDataFields() {
        const refs = this.transition.dataGroups[0]?.getDataRefs();
        if (refs) {
            this._placedDataFields = refs.map(ref => new GridsterDataField(ref, this.modelService.model.getData(ref.id)));
        } else {
            this._placedDataFields = [];
        }
    }

    updateGridsterRows() {
        let min = 1;
        this._placedDataFields.forEach(ref => {
            const end = ref.y + ref.rows;
            if (end > min) {
                min = end;
            }
        });
        this._options.minRows = min + 1;
        this._optionChanged.next();
    }

    removeDataRef(item: GridsterDataField) {
        const id = item.dataRef.id;
        (this.transition.dataGroups[0] as DataGroup).removeDataRef(id);
        this._placedDataFields.splice(this._placedDataFields.findIndex(field => field.dataVariable.id === id), 1);
        this._selectedDataField = undefined;
        this._selectedDataFieldStream.next(this._selectedDataField);
        this._historySave = true;
    }

    public addNewDataVariable(type: DataType): DataVariable {
        const id = this.createId(type);
        const dataVariable = new DataVariable(id, type);
        if (DataFieldUtils.FIELDS_WITH_OPTIONS.includes(type)) {
            dataVariable.optionsInit = new Expression('', true);
            if (DataFieldUtils.FIELDS_WITH_INITS.includes(type)) {
                dataVariable.inits = [];
            }
        } else {
            dataVariable.init = new I18nWithDynamic('', '', false);
        }
        this.modelService.model.addData(dataVariable);
        this._historySave = true;
        return dataVariable;
    }

    public addDataRef(dataVariable: DataVariable, componentRows: number, componentCols: number, componentName: string, item: GridsterItem): DataRef {
        const dataRef = new DataRef(dataVariable.id);
        dataRef.layout.x = item.x;
        dataRef.layout.y = item.y;
        item.rows = FieldListService.DEFAULT_FIELD_ROWS;
        item.cols = FieldListService.DEFAULT_FIELD_COLS;
        if (componentRows) {
            item.rows = +componentRows;
        }
        if (componentCols) {
            item.cols = +componentCols;
        }
        if (item.cols > this._options.maxCols) {
            item.cols = this._options.maxCols;
        }
        dataRef.layout.rows = item.rows;
        dataRef.layout.cols = item.cols;
        dataRef.layout.template = Template.MATERIAL;
        dataRef.layout.appearance = Appearance.OUTLINE;
        dataRef.logic.behavior = DataRefBehavior.EDITABLE;

        if (componentName) {
            dataRef.component = new Component(componentName);
        }
        const transition = this.modelService.model.getTransition(this.transitionId);
        transition.dataGroups[0].addDataRef(dataRef);
        if (dataVariable.type === DataType.TASK_REF && dataVariable.init?.value === this.transitionId) {
            dataVariable.init.value = undefined;
        }
        this._selectedDataField = new GridsterDataField(dataRef, dataVariable);
        this._selectedDataFieldStream.next(this._selectedDataField);
        this._placedDataFields.push(this._selectedDataField);
        this._onNewFieldPlaced.next(dataVariable);
        this.updateGridsterRows();
        this._historySave = true;
        return dataRef;
    }

    private addNewDataRef(data: DataVariable, event: DragEvent, item: GridsterItem): DataRef {
        const newDataRef =  this.addDataRef(
            data,
            +event.dataTransfer.getData('rows'),
            +event.dataTransfer.getData('cols'),
            event.dataTransfer.getData('ref_component'),
            item);
        const properties: Array<PropertyDef> = JSON.parse(event.dataTransfer.getData('properties'));
        if (!!properties) {
            for (const property of properties) {
                newDataRef.component.properties.push(new Property(property.name, property.defaultValue));
            }
        }
        this._options.api?.optionsChanged();
        return newDataRef;
    }

    private createId(type: string) {
        // TODO: release/4.0.0 update with model service logic
        let counter: number;
        if (this._mapCounter.has(type)) {
            counter = this._mapCounter.get(type);
            this._mapCounter.set(type, counter + 1);
        } else {
            counter = 0;
            this._mapCounter.set(type, counter + 1);
        }
        try {
            if (this.modelService.model.getData(type + '_' + counter)) {
                return this.createId(type);
            } else {
                return type + '_' + counter;
            }
        } catch (e) {
            return type + '_' + counter;
        }
    }
}
