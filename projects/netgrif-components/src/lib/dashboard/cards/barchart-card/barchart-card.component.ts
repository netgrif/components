import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {AbstractCustomCard,
    AggregationResult,
    DashboardResourceService,
    DashboardSingleData,
    LoggerService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'nc-barchart-card',
    templateUrl: './barchart-card.component.html',
    styleUrls: ['./barchart-card.component.scss'],
    providers: [
        DashboardResourceService
    ]
})
export class BarchartCardComponent extends AbstractCustomCard implements OnInit {

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
        json.aggregations.result.buckets.forEach(element => {
            this.single.push(new DashboardSingleData(element['key'], element['doc_count']));
        });
        this.single = [...this.single];
        console.log(this.single);
    }
}
