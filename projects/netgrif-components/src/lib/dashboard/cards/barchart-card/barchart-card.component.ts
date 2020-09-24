import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, AggregationResult, DashboardResourceService, DashboardSingleData, LoggerService} from '@netgrif/application-engine';
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

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
    }

    ngOnInit(): void {
        this.setCardType('bar');
        super.ngOnInit();
    }

    onSelect(event) {
        console.log(event);
    }

    convertData(json: AggregationResult): void {
        json['aggregations'].result.buckets.forEach(element => {
            /*this.single.push({
                name: element['key'],
                value: element['doc_count']
            });*/
            this.single.push(new DashboardSingleData(element['key'], element['doc_count']));
        });
        this.single = [...this.single];
        console.log(this.single);
    }
}
