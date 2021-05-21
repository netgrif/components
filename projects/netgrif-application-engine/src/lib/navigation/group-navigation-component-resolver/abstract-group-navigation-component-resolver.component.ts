import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {Injector, OnDestroy, OnInit} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {ActivatedRoute} from '@angular/router';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {Subscription} from 'rxjs';

export abstract class AbstractGroupNavigationComponentResolverComponent implements OnInit, OnDestroy {

    public portal: ComponentPortal<any>;
    public initialized = false;

    private _portalSub: Subscription;

    protected constructor(protected _componentResolverService: GroupNavigationComponentResolverService,
                          protected _parentInjector: Injector,
                          protected _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._portalSub = this._componentResolverService.createResolvedViewComponentPortal(
            this._activatedRoute.snapshot.paramMap.get(GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM)
        ).subscribe(portal => {
            this.portal = portal;
            this.initialized = true;
        });
    }

    ngOnDestroy(): void {
        if (this._portalSub && !this._portalSub.closed) {
            this._portalSub.unsubscribe();
        }
    }
}
