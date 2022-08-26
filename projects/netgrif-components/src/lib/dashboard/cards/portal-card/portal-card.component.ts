import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {AbstractCustomCardComponent, DashboardEventContent, DashboardResourceService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {AggregationResult, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-portal-card',
    templateUrl: './portal-card.component.html',
    styleUrls: ['./portal-card.component.scss']
})
export class PortalCardComponent extends AbstractCustomCardComponent implements OnInit {

    public injectedDashboard: Portal<any>;
    @Input() public componentPortal: ComponentPortal<AbstractCustomCardComponent>;
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
    }
}
