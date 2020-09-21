import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, AbstractCustomCardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-pie-chart-card',
    templateUrl: './pie-chart-card.component.html',
    styleUrls: ['./pie-chart-card.component.scss']
})
export class PieChartCardComponent extends AbstractCustomCard implements OnInit {

    isDoughnut = false;
    legendPosition = 'right';

    constructor(protected _injector: Injector,
                protected resourceService: AbstractCustomCardResourceService,
                protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit() {
        this.setCardType('pie');
        super.ngOnInit();
    }

    public convertData(json: any) {
        json['aggregations'].result.buckets.forEach(element => {
            this.single.push({
                name: element['key'],
                value: element['doc_count']
            });
        });
        this.single = [...this.single];
        console.log(this.single);
    }
}
