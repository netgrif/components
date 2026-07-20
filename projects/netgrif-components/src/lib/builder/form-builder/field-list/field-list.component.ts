import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DataType, DataVariable, Property} from '@netgrif/petriflow';
import {GridsterItem} from 'angular-gridster2';
import {timer} from 'rxjs';
import {DialogDeleteComponent} from '../../dialogs/dialog-delete/dialog-delete.component';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {GridsterService} from '../gridster/gridster.service';
import {ComponentDef, FieldListService} from './field-list.service';
import {BuilderModeService, BuilderMode} from "../../services/builder-mode.service";

export interface Data {
    title: string;
    viewTitle: string;
    template: string;
    dialogTitle: string;
}

@Component({
    selector: 'nc-builder-field-list',
    templateUrl: './field-list.component.html',
    styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit, AfterViewInit {

    @ViewChild('existingFieldPanel') existingFieldsPanel: MatExpansionPanel;
    @ViewChild('newFieldsPanel') newFieldsPanel: MatExpansionPanel;

    existingDataFields: Array<DataVariable> = [];
    public existingFieldsSearchInput = '';

    constructor(public dialog: MatDialog,
                private router: Router,
                private modelService: ModelService,
                private gridsterService: GridsterService,
                private fieldListService: FieldListService,
                private _snackBar: MatSnackBar,
                private transitionService: SelectedTransitionService,
                private _builderModeService: BuilderModeService) {
        if (this.modelService.model === undefined) {
            throw new Error('Model is undefined');
        }
    }

    ngOnInit(): void {
        this.gridsterService.selectedDataField = undefined;
        this.gridsterService.onNewFieldPlaced$().subscribe(value => {
            this.updateExistingFields();
        });
        this.updateExistingFields();
    }

    private updateExistingFields() {
        this.existingDataFields = [...this.modelService.model.getDataSet()];
        this.existingDataFields.sort((a, b) => {
            if (a.title?.value > b.title?.value) {
                return 1;
            }
            if (a.title?.value < b.title?.value) {
                return -1;
            }
            return 0;
        });
    }

    ngAfterViewInit(): void {
        if (this.existingDataFields && this.existingDataFields.length !== 0) {
            this.openPanel(this.existingFieldsPanel);
        } else {
            this.openPanel(this.newFieldsPanel);
        }
    }

    get dataFieldTypesList(): Array<any> {
        return this.fieldListService.fieldListArray;
    }

    isPlaced(field: DataVariable): boolean {
        return this.gridsterService.transition?.dataGroups[0]?.getDataRef(field.id) !== undefined;
    }

    openPanel(expansion: MatExpansionPanel): void {
        timer(0).subscribe(_ => expansion.open());
    }

    dragStartHandler($event: DragEvent, existingField: boolean) {
        $event.dataTransfer.setData(GridsterService.EXISTING_FIELD, String(existingField));
        $event.dataTransfer.dropEffect = 'copy';
    }

    dragStartHandlerNew($event: DragEvent, type: DataType, meta: any) {
        $event.dataTransfer.setData('type', type);
        if (meta.name) {
            $event.dataTransfer.setData('ref_component', meta.name);
        }
        if (meta.rows) {
            $event.dataTransfer.setData('rows', meta.rows);
        }
        if (meta.cols) {
            $event.dataTransfer.setData('cols', meta.cols);
        }
        if (meta.properties) {
            $event.dataTransfer.setData('properties', JSON.stringify(meta.properties));
        }
        this.dragStartHandler($event, false);
    }

    dragStartHandlerExisting($event: DragEvent, datafield: DataVariable) {
        $event.dataTransfer.setData('type', 'existing field');
        $event.dataTransfer.setData('id', datafield.id);
        if (datafield.component?.name) {
            const meta = this.fieldListService.fieldListArray.find(type => type.type === datafield.type).components.find(c => c?.name === datafield.component.name);
            if (meta?.rows) {
                $event.dataTransfer.setData('rows', `${meta.rows}`);
            }
            if (meta?.cols) {
                $event.dataTransfer.setData('cols', `${meta.cols}`);
            }
            if (meta?.properties) {
                $event.dataTransfer.setData('properties', JSON.stringify(meta.properties));
            }
        }
        this.dragStartHandler($event, true);
    }

    containsSearchExpression(item: DataVariable): boolean {
        const search = this.existingFieldsSearchInput.toLocaleLowerCase();
        return item.title?.value?.toLocaleLowerCase()?.includes(search)
            || item.id.toLocaleLowerCase().includes(search);
    }

    backModeler() {
        this.transitionService.id = undefined;
        this._builderModeService.mode = BuilderMode.MODELER;
        this.gridsterService.placedDataFields = [];
        this.gridsterService.options.api.optionsChanged();
    }

    typeTitle(type: DataType): string {
        const name = (type as string).replace('_', ' ').replace(/([A-Z])/g, ' $1').toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    addNewField(type: DataType, meta: any) {
        const data = this.gridsterService.addNewDataVariable(type);
        this.addDataRef(data, meta);
    }

    addExistingField(field: DataVariable) {
        const meta = this.fieldListService.getComponentMeta(field.type, field.component?.name);
        this.addDataRef(field, meta);
    }

    private addDataRef(data: DataVariable, meta: ComponentDef) {
        const dataRef = this.gridsterService.addDataRef(data, meta.rows, meta.cols, meta.name, {
            x: 0,
            y: 0,
            rows: meta.rows,
            cols: meta.cols
        } as GridsterItem);
        if (meta.name && meta.properties && Array.isArray(meta.properties) && meta.properties.length > 0) {
            for (const property of meta.properties) {
                dataRef.component.properties.push(new Property(property.name, property.defaultValue));
            }
        }
        this.gridsterService.options.api.optionsChanged();
    }

    deleteField(item: DataVariable, event: MouseEvent): void {
        event.stopPropagation();
        const dialogRef = this.dialog.open(DialogDeleteComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.modelService.removeDataVariable(item);
                this.existingDataFields.splice(this.existingDataFields.indexOf(item),1);
            }
        });
    }
}
