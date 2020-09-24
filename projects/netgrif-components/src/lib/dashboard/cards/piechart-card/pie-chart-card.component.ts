import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
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
    @Output() eventEmitter: EventEmitter<any>;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
        this.eventEmitter = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onSelect(event) {
        this.loggerService.info(event);
        this.eventEmitter.emit(event);
    }

    convertData(json: AggregationResult) {
        json.aggregations.result.buckets.forEach(element => {
            this.single.push(new DashboardSingleData(element['key'], element['doc_count']));
        });
        this.single = [...this.single];
        console.log(this.single);
    }
}
