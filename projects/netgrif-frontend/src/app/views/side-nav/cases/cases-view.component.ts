import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {BreadcrumbsDetailService, NAE_VIEW_ID_SEGMENT, TabContent, TabView, ViewIdService} from '@netgrif/components-core';
import {TabViewComponent} from '@netgrif/components';
import {Subscription} from 'rxjs';
import {SideNavCasesCaseViewComponent} from './case-list/side-nav-cases-case-view.component';
import {SideNavCaseTasksTaskViewComponent} from './case-tasks/side-nav-case-tasks-task-view.component';

/**
 * Cases of all processes (menu item "Cases" of nae.json), the same layout as the case views of the engine menu items
 * (`nc-default-tab-view`): the list of the cases without the tab header, a click on a case shows its tasks as a detail
 * with a back button and the title of the case. The name of the view and of the opened case are in the breadcrumbs of
 * the layout, the name of the view closes the case.
 */
@Component({
    selector: 'app-cases-view',
    templateUrl: './cases-view.component.html',
    styleUrls: ['./cases-view.component.scss'],
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'cases'},
        ViewIdService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CasesViewComponent implements AfterViewInit, OnDestroy {

    @ViewChild('tabView') protected _tabViewComponent: TabViewComponent;
    protected _detailSub: Subscription;

    public readonly tabs: Array<TabContent> = [{
        label: {text: 'dynamicNavigation.defaultViews.cases', icon: 'folder_open'},
        canBeClosed: false,
        tabContentComponent: SideNavCasesCaseViewComponent,
        injectedObject: {
            tabViewComponent: SideNavCaseTasksTaskViewComponent,
            tabViewOrder: 0
        }
    }];

    constructor(protected _breadcrumbsDetail: BreadcrumbsDetailService) {
    }

    ngAfterViewInit(): void {
        if (this._tabViewComponent?.tabView) {
            this._detailSub = this._breadcrumbsDetail.followTabView(this._tabViewComponent.tabView);
        }
    }

    ngOnDestroy(): void {
        this._detailSub?.unsubscribe();
    }

    /** closes the opened case (its tasks) and shows the list of the cases again */
    public closeDetail(tabView: TabView): void {
        BreadcrumbsDetailService.closeDetailTab(tabView);
    }
}
