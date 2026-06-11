import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {GridsterConfig} from 'angular-gridster2';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {HistoryService} from '../../modeler/services/history/history.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {FieldListService} from '../field-list/field-list.service';
import {GridsterDataField} from './classes/gridster-data-field';
import {GridsterService} from './gridster.service';
import {BuilderModeService, BuilderMode} from "../../builder-mode.service";

@Component({
    selector: 'nc-builder-gridster-component',
    styleUrls: ['gridster.component.scss'],
    templateUrl: './gridster.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridsterComponent implements OnInit, OnDestroy {

    constructor(private gridsterService: GridsterService,
                private fieldListService: FieldListService,
                private modelService: ModelService,
                private router: Router,
                private transitionService: SelectedTransitionService,
                private historyService: HistoryService,
                private _builderModeService: BuilderModeService) {
    }

    ngOnInit() {
        const id = this.transitionService.id;
        const transition = this.modelService.model?.getTransition(id);
        if (!transition) {
            // TODO: check
            this.gridsterService.placedDataFields = [];
            this.gridsterService.options?.api?.optionsChanged();
            this._builderModeService.mode = BuilderMode.MODELER;
        }
        this.gridsterService.updatePlacedDataFields();
        this.gridsterService.updateGridsterRows();
    }

    ngOnDestroy() {
        if (this.gridsterService.historySave) {
            this.gridsterService.historySave = false;
            this.historyService.save('DataRefs has been changed');
        }
    }

    get options(): GridsterConfig {
        return this.gridsterService.options;
    }

    get placedDataFields(): Array<GridsterDataField> {
        return this.gridsterService.placedDataFields;
    }

    removeItem($event, field: GridsterDataField) {
        $event.preventDefault();
        $event.stopPropagation();
        this.gridsterService.removeDataRef(field);
    }

    deselect() {
        this.gridsterService.selectedDataField = undefined;
        this.gridsterService.selectedDataFieldStream.next(undefined);
    }

    select($event: MouseEvent, field: GridsterDataField) {
        $event.stopPropagation();
        this.gridsterService.selectedDataField = field;
        this.gridsterService.selectedDataFieldStream.next(field);
    }

    isActive(item: GridsterDataField): boolean {
        return item === this.gridsterService.selectedDataField;
    }

    openMenu($event: MouseEvent, item: GridsterDataField) {
        $event.preventDefault();
        $event.stopPropagation();
        this.gridsterService.selectedDataField = item;
        this.gridsterService.selectedDataFieldStream.next(this.gridsterService.selectedDataField);
    }
}
