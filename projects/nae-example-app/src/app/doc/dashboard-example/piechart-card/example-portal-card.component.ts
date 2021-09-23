import {Component, Injector, NgModule, OnInit} from '@angular/core';
import {AbstractCustomCard, DashboardResourceService, DashboardSingleData} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-example-portal-card',
    templateUrl: './example-portal-card.component.html',
    styleUrls: ['./example-portal-card.component.scss']
})
export class ExamplePortalCardComponent extends AbstractCustomCard implements OnInit {

    isDoughnut = false;
    legendPosition = 'right';

    constructor(protected _injector: Injector,
                protected translateService: TranslateService,
                protected resourceService: DashboardResourceService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
    }

    ngOnInit() {
        this.resourceService.getDashboardData('case', {aggs: {result: {terms: {field: 'dataSet.text.value.keyword'}}}}).subscribe(json => {
            this.convertData(json);
        });
    }

    public convertData(json: AggregationResult) {
        if (json.aggregations.result?.buckets === undefined) {
            // TODO errorAndThrow
            // this.loggerService.
        }
        json.aggregations.result.buckets.forEach(element => {
            this.single.push(new DashboardSingleData(element['key'], element['doc_count']));
        });
        this.single = [...this.single];
    }
}
