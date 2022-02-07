import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {
    AbstractCustomCard,
    DashboardEventContent,
    DashboardMultiData,
    DashboardResourceService,
    DashboardSingleData
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-line-chart-card',
    templateUrl: './line-chart-card.component.html',
    styleUrls: ['./line-chart-card.component.scss']
})
export class LineChartCardComponent extends AbstractCustomCard implements OnInit {

    timeline = true;
    @Output() selectEvent: EventEmitter<DashboardEventContent>;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
        this.selectEvent = new EventEmitter();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onSelect(data: DashboardEventContent) {
        this.loggerService.info('Line chart selected.');
        this.selectEvent.emit(data);
    }

    convertData(json: AggregationResult): void {
        let index = 0;
        let result: any;
        for (result in json.aggregations) {
            if (json.aggregations.hasOwnProperty(result)) {
                this.multi.push(new DashboardMultiData(result, new Array<DashboardSingleData>()));
                json.aggregations[result].buckets.forEach(bucket => {
                    this.multi[index].series.push(new DashboardSingleData(bucket.key, bucket.doc_count));
                });
                index++;
            }
        }
        this.multi = [...this.multi];
    }
}
