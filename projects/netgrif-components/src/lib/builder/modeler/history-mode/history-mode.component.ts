import {ComponentType} from '@angular/cdk/overlay';
import {Component} from '@angular/core';
import {HistoryDetailComponent} from './history-detail/history-detail.component';
import {HistoryMasterDetailService} from './history-master-detail.service';
import {HistoryMasterItemComponent} from './history-master-item/history-master-item.component';

@Component({
    selector: 'nc-builder-history-mode',
    templateUrl: './history-mode.component.html',
    styleUrls: ['./history-mode.component.scss']
})
export class HistoryModeComponent {

    constructor(protected _masterService: HistoryMasterDetailService ) {
    }

    get detailComponent(): ComponentType<any> {
        return HistoryDetailComponent;
    }

    get masterItemComponent(): ComponentType<any> {
        return HistoryMasterItemComponent;
    }

    get masterService(): HistoryMasterDetailService {
        return this._masterService;
    }

}
