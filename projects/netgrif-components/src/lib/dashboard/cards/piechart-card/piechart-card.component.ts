import {Component, Injector, NgModule, OnInit} from '@angular/core';
import {multi, single} from '../data';
import {AbstractCustomCard} from '@netgrif/application-engine';
import {AbstractCustomCardResourceService} from "@netgrif/application-engine";
import {TranslateService} from "@ngx-translate/core";
@Component({
    selector: 'nc-piechart-card',
    templateUrl: './piechart-card.component.html',
    styleUrls: ['./piechart-card.component.scss']
})
export class PiechartCardComponent extends AbstractCustomCard implements OnInit{

    isDoughnut: boolean = false;
    legendPosition: string = 'right';

    constructor(protected _injector: Injector, protected resourceService: AbstractCustomCardResourceService, protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit() {
        this.setCardType("pie");
        super.ngOnInit();
    }

    public convertData(json: any) {
        json['aggregations'].result.buckets.forEach(element =>{
            this.single.push({
                "name": element['key'],
                "value": element['doc_count']
            })
        });
        this.single = [...this.single];
        console.log(this.single);
    }

    onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}
