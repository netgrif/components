import {Component, Input} from '@angular/core';
import {DashboardParams} from './dashboard-params';


@Component({
    selector: 'nae-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent {

    @Input() public params: DashboardParams;

    constructor() {
    }

}
