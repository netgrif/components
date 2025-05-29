import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {AbstractCustomCardComponent, DashboardEventContent, DashboardResourceService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {AggregationResult, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-linear-gauge-card',
    templateUrl: './linear-gauge-card.component.html',
    styleUrls: ['./linear-gauge-card.component.scss'],
    standalone: false
})
export class LinearGaugeCardComponent extends AbstractCustomCardComponent implements OnInit {

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
        this.loggerService.info('Linear gauge selected.');
        this.selectEvent.emit(data);
    }

    convertData(json: AggregationResult): void {
        this.value = json.aggregations.types_count.value;
    }
}
