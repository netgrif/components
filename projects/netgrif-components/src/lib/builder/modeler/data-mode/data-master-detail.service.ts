import {Injectable} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {DataType, DataVariable} from '@netgrif/petriflow';
import {AbstractMasterDetailService} from '../components/master-detail/abstract-master-detail.service';
import {ModelerConfig} from '../modeler-config';
import {HistoryService} from '../services/history/history.service';
import {ModelService} from '../services/model/model.service';
import {LocalStorageService} from "../../services/local-storage.service";

@Injectable()
export class DataMasterDetailService extends AbstractMasterDetailService<DataVariable> {

    constructor(protected _modelService: ModelService,
                protected _historyService: HistoryService,
                protected _localStorageService: LocalStorageService) {
        super();
    }

    public get allData(): Array<DataVariable> {
        return this._modelService.model.getDataSet();
    }

    public create(): DataVariable {
        const data = new DataVariable(this._modelService.nextDataId(), DataType.TEXT);
        this._modelService.model.addData(data);
        this._create.next(data);
        this._historyService.save(`DataVariable ${data.id} has been created.`)
        return data;
    }

    public delete(item: DataVariable): void {
        this._modelService.removeDataVariable(item);
        this._delete.next(item);
        this._historyService.save(`DataVariable ${item.id} has been deleted.`)
    }

    public duplicate(item: DataVariable): DataVariable {
        const data = item.clone();
        data.id = this._modelService.nextDataId();
        this._modelService.model.addData(data);
        this._create.next(data);
        this._historyService.save(`DataVariable ${data.id} has been created.`)
        return data;
    }

    public getAllDataSorted(event: Sort) {
        return this.allData.sort((a: any, b: any) => {
            const isAsc = event.direction === 'asc';
            switch (event.active) {
                case 'name':
                    return this.compare(a.title.value, b.title.value, isAsc);
                default:
                    return this.compare(a.id, b.id, isAsc);
            }
        });
    }

    getSortFromLocalStorage(): Sort {
        return {active: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_SORT),
            direction: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_DIRECTION)} as Sort;
    }

    setSortToLocalStorage(sort: Sort) {
        this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_SORT, sort.active);
        this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.DATA_DIRECTION, sort.direction);
    }
}
