import {Component, OnInit} from '@angular/core';
import {DashboardCardTypes, DashboardParams} from 'netgrif-application-engine';

@Component({
    selector: 'nae-app-dashboard-example',
    templateUrl: './dashboard-example.component.html',
    styleUrls: ['./dashboard-example.component.scss']
})
export class DashboardExampleComponent implements OnInit {

    public params: DashboardParams = {
        columns: 4,
        cards: [{
            type: DashboardCardTypes.COUNT,
            title: 'All tasks',
            resourceType: 'task',
            filter: '{}',
            layout: {
                x: 0,
                y: 0,
                rows: 1,
                cols: 1
            }
        }, {
            type: DashboardCardTypes.IFRAME,
            url: 'https://netgrif.com/',
            layout: {
                x: 2,
                y: 0,
                rows: 2,
                cols: 2
            }
        }, {
            type: DashboardCardTypes.COUNT,
            title: 'All cases',
            resourceType: 'case',
            filter: '{}',
            layout: {
                x: 1,
                y: 1,
                rows: 1,
                cols: 1
            }
        }]
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
