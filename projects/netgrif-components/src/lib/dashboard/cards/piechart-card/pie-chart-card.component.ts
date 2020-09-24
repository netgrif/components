import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, DashboardResourceService, DashboardSingleData} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-pie-chart-card',
    templateUrl: './pie-chart-card.component.html',
    styleUrls: ['./pie-chart-card.component.scss'],
    providers: [
        DashboardResourceService
    ]
})
export class PieChartCardComponent extends AbstractCustomCard implements OnInit {

    isDoughnut = false;
    legendPosition = 'right';

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
    }

    ngOnInit() {
        this.setCardType('pie');
        super.ngOnInit();
    }

    public convertData(json: AggregationResult) {
        json['aggregations'].result.buckets.forEach(element => {
            /*this.single.push({
                name: element['key'],
                value: element['doc_count']
            });*/
            this.single.push(new DashboardSingleData(element['key'], element['doc_count']));
        });
        this.single = [...this.single];
        console.log(this.single);
    }
}
