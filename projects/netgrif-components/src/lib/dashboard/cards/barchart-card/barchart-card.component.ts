import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {
    AbstractCustomCardComponent,
    AggregationResult, DashboardEventContent,
    DashboardResourceService,
    DashboardSingleData,
    LoggerService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'nc-barchart-card',
    templateUrl: './barchart-card.component.html',
    styleUrls: ['./barchart-card.component.scss'],
    standalone: false
})
export class BarchartCardComponent extends AbstractCustomCardComponent implements OnInit {

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
