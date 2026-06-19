import {Injectable} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {PetriNet} from '@netgrif/petriflow';
import {AbstractMasterDetailService} from '../components/master-detail/abstract-master-detail.service';
import {ModelerConfig} from '../modeler-config';
import {HistoryChange} from '../services/history/history-change';
import {HistoryService} from '../services/history/history.service';

@Injectable()
export class HistoryMasterDetailService extends AbstractMasterDetailService<HistoryChange<PetriNet>> {

    constructor(protected _historyService: HistoryService) {
        super();
    }

    public get allData(): Array<HistoryChange<PetriNet>> {
        return this._historyService.history.memory;
    }

    public create(): HistoryChange<PetriNet> {
        return;
    }

    public delete(item: HistoryChange<PetriNet>): void {
    }

    public duplicate(item: HistoryChange<PetriNet>): HistoryChange<PetriNet> {
        return;
    }

    public getAllDataSorted(event: Sort): Array<HistoryChange<PetriNet>> {
        if (event.direction === 'asc') {
            return this.allData.reverse();
        }
        return this.allData;
    }

    getSortFromLocalStorage(): Sort {
        return {
            active: localStorage.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.HISTORY_SORT),
            direction: localStorage.getItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.HISTORY_DIRECTION)
        } as Sort;
    }

    setSortToLocalStorage(sort: Sort) {
        localStorage.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.HISTORY_SORT, sort.active);
        localStorage.setItem(ModelerConfig.LOCALSTORAGE.MASTER_DETAIL.HISTORY_DIRECTION, sort.direction);
    }
}
