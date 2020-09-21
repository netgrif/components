import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractCustomCard, AbstractCustomCardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {ComponentPortal, Portal} from '@angular/cdk/portal';

@Component({
    selector: 'nc-portal-card',
    templateUrl: './portal-card.component.html',
    styleUrls: ['./portal-card.component.scss']
})
export class PortalCardComponent extends AbstractCustomCard implements OnInit {

    public injectedDashboard: Portal<any>;
    @Input() public componentPortal: ComponentPortal<any>;

    constructor(protected _injector: Injector,
                protected resourceService: AbstractCustomCardResourceService,
                protected translateService: TranslateService) {
        super(_injector, resourceService, translateService);
    }

    ngOnInit(): void {
        this.setCardType('default');
        this.injectedDashboard = this.componentPortal;
    }

    convertData(json: any): void {
    }
}
