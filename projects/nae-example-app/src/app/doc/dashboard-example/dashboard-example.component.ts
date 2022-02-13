import {Component} from '@angular/core';
import {ConfigurationService, DashboardParams} from '@netgrif/components-core';
import {ComponentPortal} from '@angular/cdk/portal';
import {ExamplePortalCardComponent} from './piechart-card/example-portal-card.component';

@Component({
    selector: 'nae-app-dashboard-example',
    templateUrl: './dashboard-example.component.html',
    styleUrls: ['./dashboard-example.component.scss']
})
export class DashboardExampleComponent {

    public params: DashboardParams;
    public portalArray = [];

    constructor(private _config: ConfigurationService) {
        this.params = this._config.getViewByPath('dashboard').layout.params as DashboardParams;
        this.params.cards[7].portalComponent = new ComponentPortal<any>(ExamplePortalCardComponent);
    }

}
