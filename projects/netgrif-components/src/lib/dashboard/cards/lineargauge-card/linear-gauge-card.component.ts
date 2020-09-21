import {Component, Injector, OnInit} from '@angular/core';
import {AbstractCustomCard, AbstractCustomCardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-linear-gauge-card',
    templateUrl: './linear-gauge-card.component.html',
    styleUrls: ['./linear-gauge-card.component.scss']
})
export class LinearGaugeCardComponent extends AbstractCustomCard implements OnInit {

    onSelect(event) {
        console.log(event);
    }

    constructor(protected _injector: Injector,
                protected resourceService: AbstractCustomCardResourceService,
                protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit(): void {
        this.setCardType('lineargauge');
        super.ngOnInit();
    }

    convertData(json: any): void {
        this.value = json['aggregations'].result.value;
    }
}
