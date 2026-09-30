import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {GridsterConfig} from 'angular-gridster2';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {HistoryService} from '../../modeler/services/history/history.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {FieldListService} from '../field-list/field-list.service';
import {GridsterDataField} from './classes/gridster-data-field';
import {GridsterService} from './gridster.service';
import {BuilderModeService, BuilderMode} from "../../services/builder-mode.service";

@Component({
    selector: 'nc-builder-gridster-component',
    styleUrls: ['gridster.component.scss'],
    templateUrl: './gridster.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridsterComponent implements OnInit, OnDestroy {

    /**
     * Gridster items that have already been laid out (have non-zero size).
     * The data field content is rendered only after that, because Angular Material
     * measures the width of the `matPrefix` container exactly once (on first zone stable)
     * to compute the floating label offset. Gridster items are `display: none` until
     * their layout is calculated, so an earlier render would measure the prefix as 0px
     * and the label would overlap the prefix icon (e.g. the datepicker toggle).
     */
    private readonly _initializedItems = new WeakSet<GridsterDataField>();

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

    onItemInit(field: GridsterDataField): void {
        this._initializedItems.add(field);
    }

    isInitialized(field: GridsterDataField): boolean {
        return this._initializedItems.has(field);
    }

    removeItem($event, field: GridsterDataField) {
        $event.preventDefault();
        $event.stopPropagation();
        this.gridsterService.removeDataRef(field);
    }

    deselect() {
        this.gridsterService.selectedDataField = undefined;
        this.gridsterService.notifySelectedDataField(undefined);
    }

    select($event: MouseEvent, field: GridsterDataField) {
        $event.stopPropagation();
        this.gridsterService.selectedDataField = field;
        this.gridsterService.notifySelectedDataField(field);
    }

    isActive(item: GridsterDataField): boolean {
        return item === this.gridsterService.selectedDataField;
    }

    openMenu($event: MouseEvent, item: GridsterDataField) {
        $event.preventDefault();
        $event.stopPropagation();
        this.gridsterService.selectedDataField = item;
        this.gridsterService.notifySelectedDataField(this.gridsterService.selectedDataField);
    }
}
