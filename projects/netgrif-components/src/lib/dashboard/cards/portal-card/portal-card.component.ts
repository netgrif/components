import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {AbstractCustomCard, DashboardEventContent, DashboardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {AggregationResult, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-portal-card',
    templateUrl: './portal-card.component.html',
    styleUrls: ['./portal-card.component.scss']
})
export class PortalCardComponent extends AbstractCustomCard implements OnInit {

    public injectedDashboard: Portal<any>;
    @Input() public componentPortal: ComponentPortal<AbstractCustomCard>;
    @Output() selectEvent: EventEmitter<DashboardEventContent>;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
        this.selectEvent = new EventEmitter();
    }

    ngOnInit(): void {
        this.injectedDashboard = this.componentPortal;
    }

    onSelect(data: DashboardEventContent) {
        this.loggerService.info('Custom dashboard selected.');
        this.selectEvent.emit(data);
    }

    convertData(json: AggregationResult): void {
        return;
    }
}
