import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {DashboardNavigationItem} from '../model/dashboard-navigation-item';
import {AccessService} from '../../authorization/permission/access.service';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {
    DynamicNavigationRouteProviderService
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import {MENU_IDENTIFIERS, NavigationItem, SETTINGS_TRANSITION_ID} from '../model/navigation-configs';
import {Case} from '../../resources/interface/case';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {I18nFieldValue} from '../../data-fields/i18n-field/models/i18n-field-value';
import {RoleAccess} from '../../../commons/schema';
import {Page} from '../../resources/interface/page';
import {CaseSearchRequestBody, PetriNetSearchRequest} from '../../filter/models/case-search-request-body';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {SimpleFilter} from '../../filter/models/simple-filter';


@Injectable({providedIn: 'root'})
export class NavigationUtilsService {

    static OPEN_FIRST_ITEM = 'open_first';

    filterIcon: string = 'filter_alt';

    constructor(
        public _accessService: AccessService,
        public _router: Router,
        public _log: LoggerService,
        public _caseResourceService: CaseResourceService,
        public _dynamicRoutingService: DynamicNavigationRouteProviderService,
        public _translateService: TranslateService,
    ) {
    }

    public shouldOpenFirstItem(item: NavigationItem): boolean {
        const customSelector = item.resource.immediateData.find(it => it.stringId === 'custom_view_selector')?.value;
        return customSelector === NavigationUtilsService.OPEN_FIRST_ITEM;
    }

    public redirectToFirstChildItem(item: NavigationItem) {
        const orderedChildCaseIds = this.extractChildCaseIds(item.resource);
        const childCases$ = this.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
            map(p => p.content),
        );
        childCases$.subscribe(result => {
            result = (result as Case[]).sort((a, b) => orderedChildCaseIds.indexOf(a.stringId) - orderedChildCaseIds.indexOf(b.stringId));
            const childItems = result.map(folder => this.resolveItemCaseToNavigationItem(folder, false)).filter(i => !!i);
            if (childItems.length > 0) {
                const firstItem = childItems[0];
                this._router.navigate([firstItem.routing.path]);

            } else {
                this._router.navigate([item.routing.path]);
            }

        }, error => {
            this._log.error(error);
            this._router.navigate([item.routing.path]);
        });
    }

    public resolveItemCaseToNavigationItem(itemCase: Case, showCounter: boolean): DashboardNavigationItem | undefined {
        if (this.representsRootNode(itemCase)) {
            return
        }
        const item: DashboardNavigationItem = {
            access: {},
            navigation: {
                icon: itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON)?.value || this.filterIcon,
                title: this.getTranslation(itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME)?.value) || itemCase.title,
            },
            routing: {
                path: this.getItemRoutingPath(itemCase),
            },
            id: itemCase.stringId,
            resource: itemCase,
            showCounter: showCounter,
        };
        const resolvedRoles = this.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_ALLOWED_ROLES);
        const resolvedBannedRoles = this.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_BANNED_ROLES);
        if (!!resolvedRoles) item.access['role'] = resolvedRoles;
        if (!!resolvedBannedRoles) item.access['bannedRole'] = resolvedBannedRoles;
        if (!this._accessService.canAccessView(item, item.routingPath)) return;
        return item;
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public getItemRoutingPath(itemCase: Case) {
        const transId = SETTINGS_TRANSITION_ID;
        const taskId = itemCase.tasks.find(taskPair => taskPair.transition === transId).task;
        const url = this._dynamicRoutingService.route;
        return `/${url}/${taskId}`;
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public getTranslation(value: I18nFieldValue): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in value.translations ? value.translations[locale] : value.defaultValue;
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public representsRootNode(item: Case): boolean {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH).value === "/"
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public resolveAccessRoles(filter: Case, roleType: string): Array<RoleAccess> | undefined {
        const allowedRoles = filter.immediateData.find(f => f.stringId === roleType)?.options;
        if (!allowedRoles || Object.keys(allowedRoles).length === 0) return undefined;
        const roles = [];
        Object.keys(allowedRoles).forEach(combined => {
            const parts = combined.split(':');
            roles.push({
                processId: parts[1],
                roleId: parts[0]
            });
        });
        return roles;
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public extractChildCaseIds(item: Case): string[] {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS)?.value
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public getItemCasesByIdsInOnePage(caseIds: string[]): Observable<Page<Case>> {
        return this.getItemCasesByIds(caseIds, 0, caseIds.length)
    }

    /* from AbstractNavigationDoubleDrawerComponent */
    public getItemCasesByIds(caseIds: string[], pageNumber: number, pageSize: string | number): Observable<Page<Case>> {
        const searchBody: CaseSearchRequestBody = {
            stringId: caseIds,
            process: MENU_IDENTIFIERS.map(id => ({identifier: id} as PetriNetSearchRequest))
        };

        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, pageSize)
            .set(PaginationParams.PAGE_NUMBER, pageNumber);
        return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams);
    }

}
