import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    AbstractTabbedCaseViewComponent,
    CaseViewService,
    CategoryFactory,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_TAB_DATA,
    OverflowService,
    SavedFilterMetadata,
    SearchService,
    ViewIdService
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';

@Component({
    selector: 'nae-app-single-tabbed-case-view',
    templateUrl: './single-tabbed-case-view.component.html',
    styleUrls: ['./single-tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService
    ],
    standalone: false
})
export class SingleTabbedCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Optional() overflowService: OverflowService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, overflowService, undefined, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: true
        });
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

    loadFilter(filterData: SavedFilterMetadata) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: filterData.filter.title
            },
            canBeClosed: true,
            tabContentComponent: SingleTabbedCaseViewComponent,
            injectedObject: {...this._injectedTabData, loadFilter: filterData.filter},
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }

    saveFilter(filterData: SavedFilterMetadata) {
        console.log(filterData);
    }

}
