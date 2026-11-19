import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {finalize, map, startWith, switchMap} from 'rxjs/operators';
import {TabView} from '../../tabs/classes/tab-view';

/**
 * A detail opened in a view (e.g. the tasks of a case opened from a list of cases): its name is the last part of the
 * breadcrumbs of the layout and the part before it (the view) closes it.
 */
export interface BreadcrumbsDetail {
    /** shown as the last part of the breadcrumbs */
    name: string;
    /** closes the detail (click on the view in the breadcrumbs) */
    close: () => void;
}

/**
 * The views tell the breadcrumbs of the layout (navigation drawer) about their opened detail. The breadcrumbs are
 * not in the template of the view, so they cannot be bound to it.
 */
@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsDetailService {

    protected _detail$ = new BehaviorSubject<BreadcrumbsDetail | undefined>(undefined);

    constructor(protected _translate: TranslateService) {
    }

    public get detail$(): Observable<BreadcrumbsDetail | undefined> {
        return this._detail$.asObservable();
    }

    public get detail(): BreadcrumbsDetail | undefined {
        return this._detail$.value;
    }

    public setDetail(detail: BreadcrumbsDetail | undefined): void {
        this._detail$.next(detail);
    }

    /**
     * Removes the detail, only when it is the given one (a view being destroyed does not remove the detail of another
     * view that is already shown).
     */
    public clearDetail(detail?: BreadcrumbsDetail): void {
        if (detail === undefined || this._detail$.value === detail) {
            this._detail$.next(undefined);
        }
    }

    /**
     * Follows the tab view of a view with a hidden tab header: the first tab is the view itself (e.g. the list of the
     * cases), a selected tab after it is its detail (its label is the name). Unsubscribing removes the detail.
     */
    public followTabView(tabView: TabView): Subscription {
        let current: BreadcrumbsDetail | undefined;
        return tabView.selectedIndex.valueChanges.pipe(
            startWith(tabView.selectedIndex.value),
            switchMap(index => index > 0 && tabView.openedTabs[index]
                ? tabView.openedTabs[index].getText$().pipe(
                    map(text => text ? this._translate.instant(text) : '')
                )
                : of(undefined)),
            finalize(() => this.clearDetail(current))
        ).subscribe(name => {
            this.clearDetail(current);
            current = name === undefined ? undefined : {name, close: () => BreadcrumbsDetailService.closeDetailTab(tabView)};
            if (current) {
                this.setDetail(current);
            }
        });
    }

    /**
     * Closes the selected detail tab and shows the tab it was opened from (the last one when that one is gone).
     */
    public static closeDetailTab(tabView: TabView): void {
        tabView.closeTabIndex(tabView.selectedIndex.value, true);
        const last = tabView.openedTabs.length - 1;
        if (tabView.selectedIndex.value > last) {
            tabView.selectedIndex.setValue(last);
            tabView.openedTabs[last].tabSelected$.next(true);
        }
    }
}
