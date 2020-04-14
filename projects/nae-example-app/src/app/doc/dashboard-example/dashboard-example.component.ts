import {Component} from '@angular/core';
import {ConfigurationService, DashboardParams} from 'netgrif-application-engine';

@Component({
    selector: 'nae-app-dashboard-example',
    templateUrl: './dashboard-example.component.html',
    styleUrls: ['./dashboard-example.component.scss']
})
export class DashboardExampleComponent {

    public params: DashboardParams;

    constructor(private _config: ConfigurationService) {
        this.params = this._config.getViewByPath('dashboard').layout.params as DashboardParams;
    }

}
