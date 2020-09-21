import {Component, Injector, NgModule, OnInit} from '@angular/core';
import {AbstractCustomCardResourceService} from "@netgrif/application-engine";
import {TranslateService} from "@ngx-translate/core";
@Component({
    selector: 'nc-example-portal-card',
    templateUrl: './example-portal-card.component.html',
    styleUrls: ['./example-portal-card.component.scss']
})
export class ExamplePortalCardComponent implements OnInit{

    single: any[];
    view: any[] = [700, 400];

    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'right';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor(protected _injector: Injector, protected resourceService: AbstractCustomCardResourceService, protected translateService: TranslateService) {
    }

    ngOnInit() {
        this.resourceService.getResource("case", "{\"aggs\": {\"result\": {\"terms\": {\"field\": \"dataSet.number.value.keyword\"}}}}").subscribe(json => {
            this.convertData(json);
        });
    }

    public convertData(json: any) {
        this.single = [];
        json['aggregations'].result.buckets.forEach(element =>{
            this.single.push({
                "name": element['key'],
                "value": element['doc_count']
            })
        });
        this.single = [...this.single];
        console.log(this.single);
    }
}
