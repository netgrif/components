import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {AbstractCustomCardComponent, DashboardEventContent, DashboardResourceService, DashboardSingleData} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-pie-chart-card',
    templateUrl: './pie-chart-card.component.html',
    styleUrls: ['./pie-chart-card.component.scss']
})
export class PieChartCardComponent extends AbstractCustomCardComponent implements OnInit {

    isDoughnut = false;
    legendPosition = 'right';
    @Output() selectEvent: EventEmitter<DashboardEventContent>;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
        this.selectEvent = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onSelect(data: DashboardEventContent) {
        this.loggerService.info('Pie chart selected.');
        this.selectEvent.emit(data);
    }

    convertData(json: AggregationResult) {
        json.aggregations.result.buckets.forEach(bucket => {
            this.single.push(new DashboardSingleData(bucket.key, bucket.doc_count));
        });
        this.single = [...this.single];
    }
}
