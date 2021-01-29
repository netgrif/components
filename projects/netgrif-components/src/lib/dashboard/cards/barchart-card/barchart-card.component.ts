import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {
    AbstractCustomCard,
    AggregationResult, DashboardEventContent,
    DashboardResourceService,
    DashboardSingleData,
    LoggerService
} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'nc-barchart-card',
    templateUrl: './barchart-card.component.html',
    styleUrls: ['./barchart-card.component.scss']
})
export class BarchartCardComponent extends AbstractCustomCard implements OnInit {

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
        this.loggerService.info('BarChart was selected');
        this.selectEvent.emit(data);
    }

    convertData(json: AggregationResult): void {
        json.aggregations.result.buckets.forEach(bucket => {
            this.single.push(new DashboardSingleData(bucket.key, bucket.doc_count));
        });
        this.single = [...this.single];
    }
}
