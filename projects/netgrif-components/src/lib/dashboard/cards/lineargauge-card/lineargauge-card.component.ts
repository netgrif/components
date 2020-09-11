import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard} from '@netgrif/application-engine';
import {AbstractCustomCardResourceService} from "@netgrif/application-engine";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-lineargauge-card',
  templateUrl: './lineargauge-card.component.html',
  styleUrls: ['./lineargauge-card.component.scss']
})
export class LineargaugeCardComponent extends AbstractCustomCard implements OnInit {

    onSelect(event) {
        console.log(event);
    }

    constructor(protected _injector: Injector, protected resourceService: AbstractCustomCardResourceService, protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit(): void {
        this.setCardType("lineargauge");
        super.ngOnInit();
    }

    convertData(json: any): void {
        this.value = json['aggregations'].result.value;
        console.log(this.value);
    }
}
