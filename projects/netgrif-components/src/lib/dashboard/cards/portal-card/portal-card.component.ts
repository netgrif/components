import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {AbstractCustomCard, DashboardResourceService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {AggregationResult, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-portal-card',
    templateUrl: './portal-card.component.html',
    styleUrls: ['./portal-card.component.scss'],
    providers: [
        DashboardResourceService
    ]
})
export class PortalCardComponent extends AbstractCustomCard implements OnInit {

    public injectedDashboard: Portal<any>;
    @Input() public componentPortal: ComponentPortal<AbstractCustomCard>;
    @Output() eventEmitter: EventEmitter<any>;

    constructor(protected _injector: Injector,
                protected resourceService: DashboardResourceService,
                protected translateService: TranslateService,
                protected loggerService: LoggerService) {
        super(_injector, resourceService, translateService, loggerService);
        this.eventEmitter = new EventEmitter();
    }

    ngOnInit(): void {
        this.injectedDashboard = this.componentPortal;
    }

    onSelect(event) {
        this.loggerService.info(event);
        this.eventEmitter.emit(event);
    }

    convertData(json: AggregationResult): void {
    }
}
