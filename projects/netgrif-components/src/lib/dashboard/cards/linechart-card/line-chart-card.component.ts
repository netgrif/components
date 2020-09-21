import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, AbstractCustomCardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-line-chart-card',
    templateUrl: './line-chart-card.component.html',
    styleUrls: ['./line-chart-card.component.scss']
})
export class LineChartCardComponent extends AbstractCustomCard implements OnInit {

    timeline = true;

    constructor(protected _injector: Injector,
                protected resourceService: AbstractCustomCardResourceService,
                protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit(): void {
        this.setCardType('line');
        super.ngOnInit();
    }

    convertData(json: any): void {
        let index = 0;
        let result: any;
        for (result in json.aggregations) {
            if (json.aggregations.hasOwnProperty(result)) {
                this.multi.push({
                    name: result,
                    series: []
                });
                json.aggregations[result].buckets.forEach(element => {
                    this.multi[index]['series'].push({
                        name: element['key'],
                        value: element['doc_count']
                    });
                });
                index++;
            }
        }
        this.multi = [...this.multi];
    }
}
