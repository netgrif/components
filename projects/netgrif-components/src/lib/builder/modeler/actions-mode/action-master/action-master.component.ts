import {ComponentType} from '@angular/cdk/overlay';
import {Component, Injector, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {PageMasterComponent} from '../../components/master-detail/page-master.component';
import {MasterItem} from '../action-editor/classes/master-item';
import {ActionsMasterDetailService} from '../actions-master-detail.service';
import {ActionsModeService} from '../actions-mode.service';
import {FunctionsTool} from '../tools/functions-tool';
import {ProcessActionsTool} from '../tools/process-actions-tool';
import {ActionMasterItemComponent} from './action-master-item/action-master-item.component';
import {FunctionMasterItemComponent} from './function-master-item/function-master-item.component';

@Component({
  selector: 'nc-builder-action-master',
  templateUrl: './action-master.component.html',
  styleUrl: './action-master.component.scss'
})
export class ActionMasterComponent extends PageMasterComponent implements OnInit {

    constructor(private _parentInjector: Injector,
                private _actionsModeService: ActionsModeService,
                public masterService: ActionsMasterDetailService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this._actionsModeService.activeToolSubject.subscribe(tool => {
            this.pageSize = 20;
            this.pageIndex = 0;
            this.initializeAndSort();
            if (this._allData.length > 0 && this.masterService.getSelected()?.constructor?.name !== this._allData[0].constructor.name || this.masterService.getSelected() instanceof MasterItem) {
                this.masterService.select(this._allData[0]);
            } else if (this._allData.length === 0) {
                this.masterService.select(undefined);
            }

        });
    }

    get actionMasterItemComponent(): ComponentType<any> {
        return ActionMasterItemComponent;
    }

    get functionMasterItemComponent(): ComponentType<any> {
        return FunctionMasterItemComponent;
    }

    isFunctionsModeSelected(): boolean {
        return this._actionsModeService.activeTool.id === FunctionsTool.ID;
    }

    isProcessAndCase(): boolean {
        return this._actionsModeService.activeTool.id === ProcessActionsTool.ID;
    }

    sortData(event: Sort): void {
        // TODO: check condition
        if (!event.active || event.direction === '') {
            if (this._actionsModeService.activeTool.id === 'data' ||
                this._actionsModeService.activeTool.id === 'transition' ||
                this._actionsModeService.activeTool.id === 'role') {
                event.active = 'id';
                event.direction = 'asc';
                this.pageIndex = 0;
            } else {
                return;
            }
        }
        this.masterService.setSortToLocalStorage(event);
        this._allData = this.masterService.getAllDataSorted(event);
        this.updatePage();
    }
}
