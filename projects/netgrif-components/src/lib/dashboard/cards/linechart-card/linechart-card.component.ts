import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard} from '@netgrif/application-engine';
import {AbstractCustomCardResourceService} from "@netgrif/application-engine";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-linechart-card',
    templateUrl: './linechart-card.component.html',
    styleUrls: ['./linechart-card.component.scss']
})
export class LinechartCardComponent extends AbstractCustomCard implements OnInit {

    timeline: boolean = true;

    constructor(protected _injector: Injector, protected resourceService: AbstractCustomCardResourceService, protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit(): void {
        this.setCardType("line");
        super.ngOnInit();
    }

    convertData(json: any): void {
        let index : number = 0;
        let result : any;
        for(result in json.aggregations){
            this.multi.push({
                "name": result,
                "series": []
            });
           json.aggregations[result].buckets.forEach(element =>{
                this.multi[index]["series"].push({
                    "name": element['key'],
                    "value": element['doc_count']
                });
            });
            index++;
        }
        this.multi = [...this.multi];
    }
}
