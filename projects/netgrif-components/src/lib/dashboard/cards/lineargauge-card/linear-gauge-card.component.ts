import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, DashboardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-linear-gauge-card',
    templateUrl: './linear-gauge-card.component.html',
    styleUrls: ['./linear-gauge-card.component.scss'],
    providers: [
        DashboardResourceService
    ]
})
export class LinearGaugeCardComponent extends AbstractCustomCard implements OnInit {

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
    }

    onSelect(event) {
    }

    ngOnInit(): void {
        this.setCardType('lineargauge');
        super.ngOnInit();
    }

    convertData(json: AggregationResult): void {
        this.value = json.aggregations.result.value;
    }
}
