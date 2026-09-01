import {Injectable} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {DataVariable, FunctionScope, PetriflowFunction, Role, Transition} from '@netgrif/petriflow';
import {AbstractMasterDetailService} from '../components/master-detail/abstract-master-detail.service';
import {ModelerConfig} from '../modeler-config';
import {ModelService} from '../services/model/model.service';
import {ActionType} from './action-editor/classes/editable-action';
import {MasterItem} from './action-editor/classes/master-item';
import {ActionsModeService} from './actions-mode.service';
import {DataActionsTool} from './tools/data-actions-tool';
import {FunctionsTool} from './tools/functions-tool';
import {ProcessActionsTool} from './tools/process-actions-tool';
import {RoleActionsTool} from './tools/role-actions-tool';
import {TransitionActionsTool} from './tools/transition-actions-tool';
import {LocalStorageService} from "../../services/local-storage.service";

@Injectable()
export class ActionsMasterDetailService extends AbstractMasterDetailService<Transition | DataVariable | MasterItem | Role | PetriflowFunction> {

    constructor(protected _modelService: ModelService,
                protected _actionsModeService: ActionsModeService,
                protected _localStorageService: LocalStorageService) {
        super();
    }

    public get allData(): Array<Transition | DataVariable | MasterItem | Role | PetriflowFunction> {
        // TODO: release/4.0.0 refactor
        if (this._actionsModeService.activeTool.id === DataActionsTool.ID) {
            return this._modelService.model.getDataSet();
        } else if (this._actionsModeService.activeTool.id === TransitionActionsTool.ID) {
            return this._modelService.model.getTransitions();
        } else if (this._actionsModeService.activeTool.id === ProcessActionsTool.ID) {
            return this.createProcessAndCaseMasterItems();
        } else if (this._actionsModeService.activeTool.id === RoleActionsTool.ID) {
            return this._modelService.model.getRoles();
        } else if (this._actionsModeService.activeTool.id === FunctionsTool.ID) {
            return this._modelService.model.functions;
        }
        return [];
    }

    public create(): PetriflowFunction {
        const fn = new PetriflowFunction('new_function', FunctionScope.PROCESS, '{ -> \n}');
        this._modelService.model.functions.push(fn);
        this._create.next(fn);
        return fn;
    }

    public delete(item: PetriflowFunction): void {
        this._modelService.model.functions.splice(this._modelService.model.functions.indexOf(item), 1);
        this._delete.next(item);
    }

    public duplicate(item: PetriflowFunction): PetriflowFunction {
        throw new Error("Unsupported operation")
    }

    public getAllDataSorted(event: Sort) {
        return this.allData.sort((a: any, b: any) => {
            const isAsc = event.direction === 'asc';
            switch (event.active) {
                case 'name':
                    if (a instanceof Transition) {
                        return this.compare(a.label?.value, b.label?.value, isAsc);
                    } else if (a instanceof DataVariable || a instanceof Role) {
                        return this.compare(a.title?.value, b.title?.value, isAsc);
                    }
                    break;
                default:
                    return this.compare(a.id, b.id, isAsc);
            }
        });
    }

    private createProcessAndCaseMasterItems(): Array<MasterItem> {
        return [
            new MasterItem('Process', ActionType.PROCESS, this._modelService.model),
            new MasterItem('Case', ActionType.CASE, this._modelService.model)
        ];
    }

    getSortFromLocalStorage(): Sort {
        if (this._actionsModeService.activeTool.id === DataActionsTool.ID &&
            this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_ACTION_SORT) !== null) {
            return {active: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_ACTION_SORT),
                direction: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_ACTION_DIRECTION)} as Sort;
        } else if (this._actionsModeService.activeTool.id === RoleActionsTool.ID &&
            this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.ROLE_ACTION_SORT) !== null) {
            return {active: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.ROLE_ACTION_SORT),
                direction: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.ROLE_ACTION_DIRECTION)} as Sort;
        } else if (this._actionsModeService.activeTool.id === TransitionActionsTool.ID &&
            this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.TRANS_ACTION_SORT) !== null) {
            return {active: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.TRANS_ACTION_SORT),
                direction: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.TRANS_ACTION_DIRECTION)} as Sort;
        } else {
            return {active: 'id', direction: 'asc'}
        }
    }

    setSortToLocalStorage(sort: Sort) {
        if (this._actionsModeService.activeTool.id === DataActionsTool.ID) {
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_ACTION_SORT, sort.active);
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_ACTION_DIRECTION, sort.direction);
        } else if (this._actionsModeService.activeTool.id === RoleActionsTool.ID) {
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.ROLE_ACTION_SORT, sort.active);
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.ROLE_ACTION_DIRECTION, sort.direction);
        } else if (this._actionsModeService.activeTool.id === TransitionActionsTool.ID) {
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.TRANS_ACTION_SORT, sort.active);
            this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.TRANS_ACTION_DIRECTION, sort.direction);
        }
    }
}
