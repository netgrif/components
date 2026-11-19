import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Case,
    CaseResourceService,
    decodeBase64,
    DoubleDrawerNavigationService,
    DynamicNavigationRouteProviderService,
    GroupNavigationConstants,
    LoggerService,
    NAE_VIEW_ID_SEGMENT,
    UriService,
    ViewIdService
} from '@netgrif/components-core';
import { filter, take, combineLatest } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    providers: [
        {
            provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'side-nav'
        },
        ViewIdService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidenavComponent implements OnInit {
    constructor(
        protected _router: Router,
        protected _dynamicRoutingService: DynamicNavigationRouteProviderService,
        protected _activatedRoute: ActivatedRoute,
        protected _log: LoggerService,
        protected _caseResourceService: CaseResourceService,
        protected _uriService: UriService,
        protected _navigationService: DoubleDrawerNavigationService
    ) {}

    ngOnInit(): void {
        if (
            this.isDynamicView() &&
            this._navigationService.currentNode === undefined
        ) {
            let encodedCaseId = this.getParamFromChildren(this._activatedRoute);
            if (!encodedCaseId) {
                const fullUrl = this._router.url;
                const segments = fullUrl.split('/');
                encodedCaseId = segments[segments.length - 1];
                if (!encodedCaseId) {
                    return;
                }
            }
            const decodedCaseId = decodeBase64(encodedCaseId);
            this._caseResourceService.getOneCase(decodedCaseId).subscribe(
                caseData => {
                    const nodePath = this.getFieldValue(caseData, 'nodePath');
                    this._uriService
                        .getNodeByPath(nodePath)
                        .subscribe(uriResource => {
                            if (
                                this._navigationService.rightLoading$
                                    .isActive ||
                                this._navigationService.leftLoading$.isActive
                            ) {
                                combineLatest([
                                    this._navigationService.rightLoading$,
                                    this._navigationService.leftLoading$
                                ])
                                    .pipe(
                                        filter(([a, b]) => !a && !b),
                                        take(1)
                                    )
                                    .subscribe(() => {
                                        this._navigationService.currentNode =
                                            uriResource.parent;
                                        this._uriService.activeNode =
                                            uriResource.parent;
                                    });
                            } else {
                                this._navigationService.currentNode =
                                    uriResource.parent;
                                this._uriService.activeNode =
                                    uriResource.parent;
                            }
                        });
                },
                error => {
                    this._log.error(
                        'Could not resolve menu item',
                        error.message
                    );
                }
            );
        }
    }

    protected isDynamicView() {
        const url = this._dynamicRoutingService.route;
        return this._router.url.includes(url);
    }

    protected getParamFromChildren(route: ActivatedRoute): string | null {
        if (
            route?.snapshot?.paramMap?.has(
                GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM
            )
        ) {
            return route.snapshot.paramMap.get(
                GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM
            );
        }
        for (const child of route.children) {
            const result = this.getParamFromChildren(child);
            if (result) {
                return result;
            }
        }
        return null;
    }

    protected getFieldValue(itemCase: Case, fieldId: string): any {
        return itemCase.immediateData.find(
            immediateField => immediateField.stringId === fieldId
        )?.value;
    }
}
