import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, DashboardMultiData, DashboardResourceService, DashboardSingleData} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-line-chart-card',
    templateUrl: './line-chart-card.component.html',
    styleUrls: ['./line-chart-card.component.scss'],
    providers: [
        DashboardResourceService
    ]
})
export class LineChartCardComponent extends AbstractCustomCard implements OnInit {

    timeline = true;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
    }

    ngOnInit(): void {
        this.setCardType('line');
        super.ngOnInit();
    }

    convertData(json: AggregationResult): void {
        let index = 0;
        let result: any;
        for (result in json.aggregations) {
            if (json.aggregations.hasOwnProperty(result)) {
                /*this.multi.push({
                    name: result,
                    series: []
                });
                json.aggregations[result].buckets.forEach(element => {
                    this.multi[index]['series'].push({
                        name: element['key'],
                        value: element['doc_count']
                    });
                });
                index++;*/
                this.multi.push(new DashboardMultiData(result, new Array<DashboardSingleData>()));
                json.aggregations[result].buckets.forEach(element => {
                    this.multi[index].series.push(new DashboardSingleData(element['key'], element['doc_count']));
                });
                index++;
            }
        }
        this.multi = [...this.multi];
    }
}
