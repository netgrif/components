import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {
    Case,
    CaseResourceService,
    GroupNavigationConstants,
    LoadingEmitter,
    PermissionService,
    SnackBarService,
    UriService,
    DoubleDrawerNavigationService,
    NavigationItem,
    TaskResourceService,
    SETTINGS_TRANSITION_ID,
    extractFilterFieldFromData,
    DoubleDrawerUtils,
    DataGroup,
    NAE_TAB_DATA,
    InjectedTabbedCaseViewData,
    SimpleFilter,
    FilterType, CaseEventOutcome,
    NAE_AUTOSWITCH_TAB_TOKEN, NAE_OPEN_EXISTING_TAB, LoggerService, ProcessService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {forkJoin} from "rxjs";
import {map} from 'rxjs/operators';

export interface TicketItem {
    id: string;
    petriNetId: string;
    title: string;
    icon: string;
    resource?: Case;
}

export interface DataGroupCaseIdPair {
    caseId: string;
    dataGroups: DataGroup[];
}

@Component({
    selector: 'nc-default-ticket-view',
    templateUrl: './default-ticket-view.component.html',
    styleUrls: ['./default-ticket-view.component.scss']
})
export class DefaultTicketViewComponent implements OnInit {

    public loading$: LoadingEmitter = new LoadingEmitter();
    public createCaseLoading$: LoadingEmitter = new LoadingEmitter();

    public dashboardItems: Array<TicketItem>;
    public filteredDashboardItems: Array<TicketItem>;
    public search: FormControl;

    constructor(protected _caseResourceService: CaseResourceService,
                protected _permissionService: PermissionService,
                protected _snackbar: SnackBarService,
                protected _router: Router,
                protected _log: LoggerService,
                protected _uriService: UriService,
                protected _translateService: TranslateService,
                protected _navigationService: DoubleDrawerNavigationService,
                protected _taskResourceService: TaskResourceService,
                protected _processService: ProcessService,
                @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewData,
                @Optional() @Inject(NAE_AUTOSWITCH_TAB_TOKEN) protected _autoswitchToTaskTab = true,
                @Optional() @Inject(NAE_OPEN_EXISTING_TAB) protected _openExistingTab = true) {
        this.search = new FormControl('');
    }

    ngOnInit(): void {
        if (this._autoswitchToTaskTab === null) {
            this._autoswitchToTaskTab = true;
        }
        if (this._openExistingTab === null) {
            this._openExistingTab = true;
        }
        this.loadTicketCreateContent();
        this.search.valueChanges.subscribe(value => this.searchItems(value))
    }

    public loadTicketCreateContent() {
        this.loading$.on();
        this._navigationService.rightItems$.pipe(
            map(navItems => this.transformItemCases(navItems).filter(itm => !!itm && !!itm.resource))
        ).subscribe(items => {
            forkJoin(items.map(item => {
                const taskId = DoubleDrawerUtils.findTaskIdInCase(item.resource, SETTINGS_TRANSITION_ID);
                if (taskId === undefined) {
                    return;
                }
                return this._taskResourceService.getData(taskId).pipe(map(dataGroups => {return {caseId: item.resource.stringId, dataGroups} as DataGroupCaseIdPair}));
            })).subscribe(dataGroups => {
                dataGroups.forEach(dataGroupPair => {
                    if (dataGroupPair.dataGroups === undefined) {
                        return;
                    }
                    let net = undefined;
                    try {
                        net = extractFilterFieldFromData(dataGroupPair.dataGroups)?.allowedNets[0];
                    } catch (error) {
                        this._log.warn("View doesn't have a filter, skipping...");
                    }
                    items.find(itm => itm.resource.stringId === dataGroupPair.caseId).petriNetId = net;
                });
                this.dashboardItems = items.filter(item => item.petriNetId !== undefined);
                this.searchItems(this.search.value);
                this.loading$.off()
            }, error => {
                this._log.error(error.message);
                this.loading$.off()
            });
        }, error => {
            this._log.error(error.message);
            this.loading$.off()
        })

    }

    protected transformItemCases(navItems: NavigationItem[]) {
        return navItems.map(item => this.resolveItemCaseToNavigationItem(item));
    }
    // copied from abstract-navigation-double-drawer
    protected resolveItemCaseToNavigationItem(navItem: NavigationItem): TicketItem | undefined {
        if (navItem.resource === undefined) {
            return undefined;
        }
        return {
            id: navItem.resource.stringId,
            icon: navItem.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON)?.value || "add",
            title: (navItem.navigation as any).title,
            petriNetId: undefined,
            resource: navItem.resource,
        }
    }

    public createCase(item: TicketItem) {
        if (this.isCardLoading()) {
            return;
        }
        this.createCaseLoading$.on();
        this._processService.getNet(item.petriNetId).subscribe(petriNet => {
            this._caseResourceService.createCase({
                netId: petriNet.stringId,
                title: item.title
            }).subscribe((caseResult) => {
                this.createCaseLoading$.off();
                if ((caseResult?.outcome as CaseEventOutcome)?.aCase) {
                    this.openTab((caseResult.outcome as CaseEventOutcome).aCase);
                }
            }, (error) => {
                this._snackbar.openErrorSnackBar(error);
                this.createCaseLoading$.off();
            });
        })
    }

    public isCardLoading() {
        return this.createCaseLoading$.isActive;
    }

    protected searchItems(val: string) {
        if (val && val.length === 0) {
            this.filteredDashboardItems = this.dashboardItems;
        }
        this.filteredDashboardItems = this.dashboardItems.filter(value => value.title.toLowerCase().includes(val.toLowerCase()));
    }

    protected openTab(openCase: Case) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: openCase.title,
                icon: openCase.icon ? openCase.icon : 'check_box'
            },
            canBeClosed: true,
            tabContentComponent: this._injectedTabData.tabViewComponent,
            injectedObject: {
                baseFilter: new SimpleFilter('', FilterType.TASK, {case: {id: `${openCase.stringId}`}}),
                allowedNets: [openCase.processIdentifier]
            },
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }
}
