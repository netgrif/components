import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
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

    @Output() eventEmitter: EventEmitter<any>;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
        this.eventEmitter = new EventEmitter();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onSelect(event) {
        this.loggerService.info(event);
        this.eventEmitter.emit(event);
    }

    convertData(json: AggregationResult): void {
        this.value = json.aggregations.types_count.value;
    }
}
