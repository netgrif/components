import {Component, Inject} from '@angular/core';
import {PetriNet} from '@netgrif/petriflow';
import {AbstractMasterDetailService} from '../../components/master-detail/abstract-master-detail.service';
import {MASTER_ITEM, MASTER_SERVICE} from '../../components/master-detail/main-master-item/master-injection-tokens';
import {HistoryChange} from '../../services/history/history-change';
import {ModelService} from '../../services/model/model.service';

@Component({
    selector: 'nc-builder-history-master-item',
    templateUrl: './history-master-item.component.html',
    styleUrl: './history-master-item.component.scss'
})
export class HistoryMasterItemComponent {

    constructor(
        @Inject(MASTER_ITEM) public item: HistoryChange<PetriNet>,
        @Inject(MASTER_SERVICE) protected _service: AbstractMasterDetailService<any>,
        private _modelService: ModelService
    ) {
    }

    select(): void {
        this._service.select(this.item);
    }

    get selected(): HistoryChange<PetriNet> {
        return this._service.getSelected();
    }

    isActual(): boolean {
        return this.item.record.id === this._modelService.model.id && this.item.record.lastChanged === this._modelService.model.lastChanged;
    }
}
