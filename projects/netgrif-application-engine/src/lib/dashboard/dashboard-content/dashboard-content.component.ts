import {Component, Input} from '@angular/core';
import {DashboardParams} from './dashboard-params';
import {DashboardCardTypes} from '../cards/model/dashboard-card-types';


@Component({
    selector: 'nae-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent {

    @Input() public params: DashboardParams;
    public cardTypes = DashboardCardTypes;

    constructor() {
    }

}
