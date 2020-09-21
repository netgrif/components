import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, AbstractCustomCardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-barchart-card',
    templateUrl: './barchart-card.component.html',
    styleUrls: ['./barchart-card.component.scss']
})
export class BarchartCardComponent extends AbstractCustomCard implements OnInit {

    constructor(protected _injector: Injector,
                protected resourceService: AbstractCustomCardResourceService,
                protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit(): void {
        this.setCardType('bar');
        super.ngOnInit();
    }

    onSelect(event) {
        console.log(event);
    }

    convertData(json: any): void {
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
