import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {DATE_TIME_FORMAT, EnumerationFieldValue} from '@netgrif/components-core';
import moment, {Moment} from 'moment/moment';
import {
  Component as PetriflowComponent,
  DataRef,
  DataRefBehavior,
  DataType,
  DataVariable,
  I18nString,
  I18nWithDynamic,
  Icon,
  IconType,
  Option,
  Property,
  Transition,
  TransitionEvent,
  TransitionEventType,
} from '@netgrif/petriflow';
import {Observable, Subscription} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {DialogRefactorComponent} from '../../dialogs/dialog-refactor/dialog-refactor.component';
import {ActionsMasterDetailService} from '../../modeler/actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../modeler/actions-mode/actions-mode.service';
import {ModelerConfig} from '../../modeler/modeler-config';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {DataFieldUtils} from '../data-field-utils';
import {ComponentDef, DataRefDef, FieldListService, PropertyDef} from '../field-list/field-list.service';
import {GridsterService} from '../gridster/gridster.service';
import {BuilderModeService, BuilderMode} from "../../services/builder-mode.service";
import {DataModeService} from "../../modeler/data-mode/data-mode.service";

@Component({
    selector: 'nc-builder-edit-panel',
    templateUrl: './edit-panel.component.html',
    styleUrls: ['./edit-panel.component.scss'],
    providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EditPanelComponent implements OnInit, AfterViewInit, OnDestroy {
    private static readonly DATE_INIT_FORMAT = 'YYYY-MM-DD';
    private static readonly DATE_TIME_INIT_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
    private _dateInit: { source: string; value: Moment | null };

    numOfCols: number;
    minOfCols: number;
    hover: boolean;
    counter: number;
    counterMap: number;
    transId: string;
    filteredOptions: Observable<Array<EnumerationFieldValue>>;
    formControlRef: FormControl;
    transitionOptions: Array<EnumerationFieldValue>;
    behaviorOptions;

    componentNameFormCtrl: FormControl;
    dataRefComponentNameFormCtrl: FormControl;
    readOnlySub: Subscription;

    constructor(public gridsterService: GridsterService,
                public modelService: ModelService,
                private dialog: MatDialog,
                private transitionService: SelectedTransitionService,
                private _actionMode: ActionsModeService,
                private _fieldListService: FieldListService,
                private _actionsMasterDetail: ActionsMasterDetailService,
                protected _builderModeService: BuilderModeService,
                protected _dataModeService: DataModeService) {
        // this.transitionOptions = [];
        this.formControlRef = new FormControl();
        this.behaviorOptions = [
            DataRefBehavior.EDITABLE, DataRefBehavior.VISIBLE, DataRefBehavior.HIDDEN, DataRefBehavior.FORBIDDEN
        ].map(b => {
            return {key: b.toLowerCase(), value: b};
        });
    }

    ngOnInit() {
        this.componentNameFormCtrl = new FormControl();
        this.dataRefComponentNameFormCtrl = new FormControl();
        this.readOnlySub = this._builderModeService.readOnly$.subscribe(readOnly => {
            if (readOnly) {
                this.componentNameFormCtrl.disable();
                this.dataRefComponentNameFormCtrl.disable();
            } else {
                this.componentNameFormCtrl.enable();
                this.dataRefComponentNameFormCtrl.enable();
            }
        })
        this.transId = this.transitionService.id;
        if (this.transId === null) {
            this.numOfCols = ModelerConfig.LAYOUT_DEFAULT_COLS;
            this.minOfCols = 1;
            this.gridsterService.options.minCols = this.numOfCols;
            this.gridsterService.options.maxCols = this.numOfCols;
            this.gridsterService.options.maxItemCols = this.numOfCols;
        } else {
            this.numOfCols = this.modelService.model.getTransition(this.transId)?.dataGroups[0]?.cols;
            if (this.numOfCols === undefined) {
                this.numOfCols = ModelerConfig.LAYOUT_DEFAULT_COLS;
            }
            this.minOfCols = 1;
            this.gridsterService.placedDataFields.forEach(item => {
                if (item.x + item.cols > this.minOfCols) {
                    this.minOfCols = item.x + item.cols;
                }
            });
            this.gridsterService.options.minCols = this.numOfCols;
            this.gridsterService.options.maxCols = this.numOfCols;
            this.gridsterService.options.maxItemCols = this.numOfCols;
        }

        this.gridsterService.selectedDataFieldStream$().subscribe(value => {
            if (this.gridsterService.selectedDataField?.dataVariable?.init?.value) {
                this.formControlRef.patchValue(this.gridsterService.selectedDataField.dataVariable.init.value);
            } else {
                this.formControlRef.reset();
            }
        });
        this.hover = false;
        this.counter = 0;
        this.counterMap = 0;
        this.transitionOptions = this.createTransOptions();
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            tap(value => {
                if (value === '' || value === undefined) {
                    if (this.gridsterService.selectedDataField?.dataVariable?.init) {
                        this.gridsterService.selectedDataField.dataVariable.init.value = '';
                    }
                }
            }),
            startWith(''),
            map(value => this._filter(value))
        );
    }

    ngOnDestroy(): void {
        this.readOnlySub?.unsubscribe();
    }

    get transition(): Transition {
        return this.modelService.model.getTransition(this.transitionService.id);
    }

    get assignEvent(): TransitionEvent {
        return this.getOrCreateEvent(TransitionEventType.ASSIGN);
    }

    get finishEvent(): TransitionEvent {
        return this.getOrCreateEvent(TransitionEventType.FINISH);
    }

    get cancelEvent(): TransitionEvent {
        return this.getOrCreateEvent(TransitionEventType.CANCEL);
    }

    get delegateEvent(): TransitionEvent {
        return this.getOrCreateEvent(TransitionEventType.DELEGATE);
    }

    registerChange() {
        this.gridsterService.historySave = true;
    }

    private getOrCreateEvent(type: TransitionEventType): TransitionEvent {
        let event = this.transition.eventSource.getEvent(type);
        if (!event) {
            event = new TransitionEvent(type, `${this.transition.id}_${type}`);
            this.transition.eventSource.addEvent(event);
        }
        return event;
    }

    get dataRef(): DataRef {
        return this.gridsterService.selectedDataField.dataRef;
    }

    get dataVariable(): DataVariable {
        return this.gridsterService.selectedDataField.dataVariable;
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.notifyGridster();
        });
    }

    @HostListener('mouseenter')
    onHover() {
        this.hover = true;
    }

    @HostListener('mouseleave')
    onNoHover() {
        this.hover = false;
    }

    changeCols($event) {
        const newCols = +$event.target.value;
        let minNum = 1;
        this.gridsterService.placedDataFields.forEach(item => {
            if (item.x + item.cols > minNum) {
                minNum = item.x + item.cols;
            }
        });
        this.minOfCols = minNum;
        if (newCols < this.minOfCols) {
            $event.target.value = this.minOfCols;
        }
        this.gridsterService.options.minCols = newCols;
        this.gridsterService.options.maxCols = newCols;
        this.gridsterService.options.maxItemCols = newCols;
        this.modelService.model.getTransition(this.transId).dataGroups[0].cols = newCols;
        this.gridsterService.refreshOptions();
        this.registerChange();
    }

    isSomeGridsterFieldSelected() {
        return !!this.gridsterService.selectedDataField;
    }

    hasOptions(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            DataFieldUtils.FIELDS_WITH_OPTIONS.includes(this.gridsterService.selectedDataField.dataVariable.type);
    }

    hasInits(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            DataFieldUtils.FIELDS_WITH_INITS.includes(this.gridsterService.selectedDataField.dataVariable.type);
    }

    hasSimpleOptions(): boolean {
        return this.isSomeGridsterFieldSelected() && (
            this.gridsterService.selectedDataField.dataVariable.type === DataType.ENUMERATION ||
            this.gridsterService.selectedDataField.dataVariable.type === DataType.MULTICHOICE
        );
    }

    hasTextValue(): boolean {
        return this.isSomeGridsterFieldSelected() && (
            this.gridsterService.selectedDataField.dataVariable.type === DataType.TEXT ||
            this.gridsterService.selectedDataField.dataVariable.type === DataType.PROCESS_FILTER ||
            this.gridsterService.selectedDataField.dataVariable.type === DataType.TASK_FILTER ||
            this.gridsterService.selectedDataField.dataVariable.type === DataType.CASE_FILTER ||
                (this.gridsterService.selectedDataField.dataVariable.type as string) === 'i18n'
        );
    }

    isTextArea(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.TEXT &&
            this.gridsterService.selectedDataField.dataVariable.component?.name === 'area';
    }

    isBoolean(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.BOOLEAN;
    }

    isButton(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.BUTTON;
    }

    isNumber(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.NUMBER;
    }

    isDate(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.DATE;
    }

    isDatetime(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.DATETIME;
    }

    isTaskRef(): boolean {
        return this.isSomeGridsterFieldSelected() &&
            this.gridsterService.selectedDataField.dataVariable.type === DataType.TASK_REF;
    }

    addOption() {
        if (this.hasOptions()) {
            const id = this.createKeyId();
            const component = this.dataRef.component ? this.dataRef.component : this.dataVariable.component;
            if (this.isIconEnumeration(this.dataVariable.type, component)) {
                component.icons.push(new Icon(id, 'home', IconType.MATERIAL));
            }
            this.dataVariable.options.push(Option.of(id, new I18nString('value')));
            this.notifyGridster();
        }
    }

    deleteOption(index: number) {
        this.dataVariable.options.splice(index, 1);
    }

    notifyGridster(): void {this.gridsterService.refreshOptions();
        this.gridsterService.notifySelectedDataFieldChange();
        this.registerChange();
    }

    drop(event: CdkDragDrop<Array<string>>) {
        moveItemInArray(this.gridsterService.selectedDataField.dataVariable.options, event.previousIndex, event.currentIndex);
        this.notifyGridster();
    }

    setOptionsValue($event, i: number) {
        this.gridsterService.selectedDataField.dataVariable.options[i].value.value = $event.target.value;
        if (this.hasSimpleOptions()) {
            this.setOptionsKey($event, i);
        }
    }

    setOptionsKey($event, i: number) {
        this.gridsterService.selectedDataField.dataVariable.options[i].key = $event.target.value;
    }

    private createKeyId() {
        this.counterMap++;
        if (this.gridsterService.selectedDataField.dataVariable.options.find(item => item.key === 'key' + this.counterMap)) {
            return this.createKeyId();
        } else {
            return 'key' + String(this.counterMap);
        }
    }

    openRefactorDialog(event, item: DataVariable): void {
        const dialogRef = this.dialog.open(DialogRefactorComponent, {
            panelClass: 'dialog-responsive',
            data: {
                originalId: item.id,
                modelService: this.modelService,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.gridsterService.selectedDataField = this.gridsterService.placedDataFields.find(f => f.dataVariable.id === result);
                this.gridsterService.notifySelectedDataField(this.gridsterService.selectedDataField);
                this.registerChange();
            }
        });
    }

    createTransOptions() {
        if (this.modelService && this.modelService.model) {
            return this.modelService.model.getTransitions().map(trans => ({key: trans.id, value: trans.label?.value}));
        } else {
            return [];
        }
    }

    private _filter(value: string): Array<EnumerationFieldValue> {
        if (!value) {
            return this.transitionOptions;
        }
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.transitionOptions.filter(option => option.value?.toLowerCase()?.normalize('NFD')
            ?.replace(/[\u0300-\u036f]/g, '')?.indexOf(filterValue) === 0);
    }

    selectAuto(key: string) {
        this.gridsterService.selectedDataField.dataVariable.init = new I18nWithDynamic(key, '', false);
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            const value = this.transitionOptions.find(choice => choice.key === key);
            if (value) {
                return this.taskRefTitle(value);
            }
        }
        return key;
    }

    isDisabled(transId: string): boolean {
        if (transId === this.transId) {
            return true;
        }
        const trans = this.modelService.model.getTransition(transId);
        if (trans) {
            return trans.dataGroups.some(group => !!group.getDataRef(this.gridsterService.selectedDataField.dataVariable.id));
        }
        return false;
    }

    public setPropertyKey($event, index: number, component: PetriflowComponent): void {
        if ($event instanceof MatAutocompleteSelectedEvent) {
            component.properties[index].key = $event.option.value;
            this.setPropertyDefaultValue($event, index, component);
        } else {
            component.properties[index].key = $event.target.value;
        }
    }

    setPropertyValue($event, index: number, component: PetriflowComponent) {
        component.properties[index].value = $event.target.value;
    }

    deleteProperty(index: number, component: PetriflowComponent) {
        component.properties.splice(index, 1);
    }

    addProperty(component: PetriflowComponent) {
        component.properties.push(new Property('', ''));
    }

    createOrDeleteComponent() {
        if (this.gridsterService.selectedDataField.dataVariable.component === undefined) {
            this.gridsterService.selectedDataField.dataVariable.component = new PetriflowComponent('');
        } else {
            this.gridsterService.selectedDataField.dataVariable.component = undefined;
        }
    }

    createOrDeleteDataRefComponent() {
        if (this.gridsterService.selectedDataField.dataRef.component === undefined) {
            this.gridsterService.selectedDataField.dataRef.component = new PetriflowComponent('');
        } else {
            this.gridsterService.selectedDataField.dataRef.component = undefined;
        }
    }

    public setComponent($event): void {
        if (!this.gridsterService.selectedDataField.dataVariable.component) {
            this.gridsterService.selectedDataField.dataVariable.component = new PetriflowComponent('');
        }
        if ($event instanceof MatAutocompleteSelectedEvent) {
            this.gridsterService.selectedDataField.dataVariable.component.name = $event.option.value;
        } else {
            this.gridsterService.selectedDataField.dataVariable.component.name = $event.target.value;
        }
    }

    public setDataRefComponent($event): void {
        if (!this.gridsterService.selectedDataField.dataRef.component) {
            this.gridsterService.selectedDataField.dataRef.component = new PetriflowComponent('');
        }
        if ($event instanceof MatAutocompleteSelectedEvent) {
            this.gridsterService.selectedDataField.dataRef.component.name = $event.option.value;
        } else {
            this.gridsterService.selectedDataField.dataRef.component.name = $event.target.value;
        }
    }

    taskRefTitle(option: EnumerationFieldValue) {
        if (option.value) {
            return `${option.value} [${option.key}]`;
        }
        return option.key;
    }

    addIcon(component: PetriflowComponent) {
        component.icons.push(new Icon('', 'home'));
    }

    setIconKey($event, index: number, component: PetriflowComponent) {
        component.icons[index].key = $event.target.value;
    }

    setIconValue($event, index: number, component: PetriflowComponent) {
        component.icons[index].icon = $event.target.value;
    }

    deleteIcon(index: number, component: PetriflowComponent) {
        component.icons.splice(index, 1);
    }

    isIconEnumeration(type: DataType, component: PetriflowComponent) {
        return type as string === 'enumeration_map' && component?.name === 'icon';
    }

    setBooleanValue(event) {
        this.dataVariable.init.value = event.checked.toString();
    }

    changeInitsValue(inits: Array<string>) {
        this.dataVariable.inits = inits.map(initKey => new I18nWithDynamic(initKey));
    }

    getInitsValue(): Array<string> {
        return this.dataVariable.inits.map(initKey => initKey.value);
    }

    /**
     * Init value of a date / date time field for the pickers. The model stores it as an ISO string,
     * the moment instance is cached, so `ngModel` does not get a new value on every change detection.
     */
    get dateInitValue(): Moment | null {
        const source = this.dataVariable?.init?.value ?? '';
        if (!this._dateInit || this._dateInit.source !== source) {
            const value = source ? moment(source) : null;
            this._dateInit = { source, value: value?.isValid() ? value : null };
        }
        return this._dateInit.value;
    }

    /**
     * Stores a value picked in the date / time picker as the init value of the selected field.
     * @param value picked value
     * @param withTime `YYYY-MM-DDTHH:mm:ss` for date time fields, `YYYY-MM-DD` for date fields
     */
    setDateInitValue(value: Moment | null, withTime: boolean): void {
        const source = value && moment.isMoment(value) && value.isValid()
            ? value.format(withTime ? EditPanelComponent.DATE_TIME_INIT_FORMAT : EditPanelComponent.DATE_INIT_FORMAT)
            : '';
        this.dataVariable.init.value = source;
        this._dateInit = { source, value };
        this.notifyGridster();
    }

    openActions() {
        this._actionMode.activate(this._actionMode.dataActionsTool);
        this._actionsMasterDetail.select(this.gridsterService.selectedDataField.dataVariable);
        this._builderModeService.mode = BuilderMode.ACTION_MODE;
    }

    openTransitionActions() {
        this._actionMode.activate(this._actionMode.transitionActionsTool);
        this._actionsMasterDetail.select(this.modelService.model.getTransition(this.transitionService.id));
        this._builderModeService.mode = BuilderMode.ACTION_MODE;
    }

    numberOfActions(): number {
        return this.modelService.numberOfTransitionActions(this.transition);
    }

    filteredComponents(component: PetriflowComponent): Array<ComponentDef> {
        const componentDefs: DataRefDef =  this._fieldListService.fieldListArray.find(type => type.type === this.dataVariable.type);
        if (!componentDefs) {
            return [];
        }
        return componentDefs.components.filter(def => def.name !== undefined && def.title.toLowerCase().includes(component.name?.toLowerCase() ?? ''));
    }

    public filteredProperties(component: PetriflowComponent, propertyName: string): Array<PropertyDef> {
        const componentDefs: DataRefDef =  this._fieldListService.fieldListArray.find(type => type.type === this.dataVariable.type);
        if (!componentDefs) {
            return [];
        }
        const propertyDefs: ComponentDef = componentDefs.components.find(compDef => {
            return (!component.name && !compDef.name) || (!!component.name && !!compDef.name && component.name === compDef.name);
        });
        if (!propertyDefs || !propertyDefs.properties) {
            return [];
        }
        const existingProperties = component.properties.map(compProperty => compProperty.key);
        return propertyDefs.properties.filter(propDef => propDef.name.includes(propertyName) && !existingProperties.includes(propDef.name));
    }

    public setPropertyDefaultValue($event: MatAutocompleteSelectedEvent, index: number, component: PetriflowComponent): void {
        component.properties[index].value = this._fieldListService.fieldListArray
                                            .find(type => type.type === this.dataVariable.type)?.components
                                            .find(compDef => (!component.name && !compDef.name) || (!!component.name && !!compDef.name && component.name === compDef.name))?.properties
                                            .find(propDef => propDef.name === $event.option.value).defaultValue;
    }

    public cloneProperty(source: DataRef | DataVariable, target: DataRef | DataVariable, property: string): void {
        if (!(property in source)) {
            return;
        }
        target[property] = source[property].clone();
    }
}
