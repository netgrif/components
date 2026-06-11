import {ComponentType} from '@angular/cdk/overlay';
import {Component} from '@angular/core';
import {FunctionScope} from '@netgrif/petriflow';
import {ActionDetailComponent} from './action-detail/action-detail.component';
import {ActionMasterComponent} from './action-master/action-master.component';
import {ActionsMasterDetailService} from './actions-master-detail.setvice';

export interface Scope {
    viewValue: string;
    value: FunctionScope;
}

@Component({
    selector: 'nc-builder-actions-mode',
    templateUrl: './actions-mode.component.html',
    styleUrls: ['./actions-mode.component.scss']
})
export class ActionsModeComponent {

    constructor(private _masterService: ActionsMasterDetailService) {
    }

    get detailComponent(): ComponentType<any> {
        return ActionDetailComponent;
    }

    get masterComponent(): ComponentType<any> {
        return ActionMasterComponent;
    }

    get masterService(): ActionsMasterDetailService {
        return this._masterService;
    }
}
