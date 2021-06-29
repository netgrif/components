import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {Injector, OnDestroy, OnInit} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {destroySubscription} from '../../utility/destroy-subscription';
import {LoggerService} from '../../logger/services/logger.service';

export abstract class AbstractGroupNavigationComponentResolverComponent implements OnInit, OnDestroy {

    public portal: ComponentPortal<any>;
    public initialized = false;
    public errored = false;

    private _portalSub: Subscription;
    private _routerSub: Subscription;

    protected constructor(protected _componentResolverService: GroupNavigationComponentResolverService,
                          protected _parentInjector: Injector,
                          protected _activatedRoute: ActivatedRoute,
                          protected _router: Router,
                          protected _log: LoggerService) {
    }

    ngOnInit(): void {
        this.resolveComponent();
        this._routerSub = this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.resolveComponent();
        });
    }

    ngOnDestroy(): void {
        destroySubscription(this._portalSub);
        destroySubscription(this._routerSub);
    }

    protected resolveComponent(): void {
        this.initialized = false;
        this._portalSub = this._componentResolverService.createResolvedViewComponentPortal(
            this._activatedRoute.snapshot.paramMap.get(GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM),
            this._parentInjector
        ).subscribe(portal => {
            this.portal = portal;
            this.initialized = true;
        }, error => {
            this._log.error(error);
            this.errored = true;
        });
    }
}
