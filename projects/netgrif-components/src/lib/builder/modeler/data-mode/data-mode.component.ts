import {ComponentType} from '@angular/cdk/overlay';
import {Component} from '@angular/core';
import {DataMasterDetailService} from './data-master-detail.service';
import {DataMasterItemComponent} from './data-master-item/data-master-item.component';
import {BuilderModeService} from "../../services/builder-mode.service";
import {DataDetailComponent} from "./data-detail/data-detail.component";

export interface TypeArray {
    viewValue: string;
    value: string;
}

@Component({
    selector: 'nc-builder-data-mode',
    templateUrl: './data-mode.component.html',
    styleUrls: ['./data-mode.component.scss'],
})
export class DataModeComponent {

    constructor(protected _masterService: DataMasterDetailService, protected _builderModeService: BuilderModeService) {
    }

    get detailComponent(): ComponentType<any> {
        return DataDetailComponent;
    }

    get masterItemComponent(): ComponentType<any> {
        return DataMasterItemComponent;
    }

    get masterService(): DataMasterDetailService {
        return this._masterService;
    }
}
