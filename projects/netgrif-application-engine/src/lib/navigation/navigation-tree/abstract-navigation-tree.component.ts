import {Input, OnDestroy, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ConfigurationService} from '../../configuration/configuration.service';
import {View, Views} from '../../../commons/schema';
import {NavigationEnd, Router} from '@angular/router';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Subscription} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {UserService} from '../../user/services/user.service';
import {RoleGuardService} from '../../authorization/role/role-guard.service';
import {AuthorityGuardService} from '../../authorization/authority/authority-guard.service';
import {GroupGuardService} from '../../authorization/group/group-guard.service';
import {AbstractNavigationResizableDrawerComponent} from '../navigation-drawer/abstract-navigation-resizable-drawer.component';

export interface NavigationNode {
    name: string;
    icon?: string;
    url: string;
    children?: Array<NavigationNode>;
    level?: number;
    translate?: boolean;
}

export abstract class AbstractNavigationTreeComponent extends AbstractNavigationResizableDrawerComponent implements OnInit, OnDestroy {

    @Input() public viewPath: string;
    @Input() public parentUrl: string;
    @Input() public routerChange: boolean;
    protected subRouter: Subscription;
    protected subUser: Subscription;

    treeControl: NestedTreeControl<NavigationNode>;
    dataSource: MatTreeNestedDataSource<NavigationNode>;

    protected constructor(protected _config: ConfigurationService,
                          protected _router: Router,
                          protected _log: LoggerService,
                          protected _userService: UserService,
                          protected _roleGuard: RoleGuardService,
                          protected _authorityGuard: AuthorityGuardService,
                          protected _groupGuard: GroupGuardService) {
        super();
        this.treeControl = new NestedTreeControl<NavigationNode>(node => node.children);
        this.dataSource = new MatTreeNestedDataSource<NavigationNode>();
        this.dataSource.data = this.resolveNavigationNodes(_config.getConfigurationSubtree(['views']), '');
        this.resolveLevels(this.dataSource.data);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.viewPath && this.parentUrl !== undefined && this.routerChange) {
            this.subRouter = this._router.events.subscribe((event) => {
                if (event instanceof NavigationEnd && this.routerChange) {
                    const viewRoute = this._config.getViewByPath(this.viewPath);
                    if (viewRoute && viewRoute.children) {
                        this.dataSource.data = this.resolveNavigationNodes(viewRoute.children, this.parentUrl);
                    }
                    this.resolveLevels(this.dataSource.data);
                }
            });
            const view = this._config.getViewByPath(this.viewPath);
            if (view && view.children) {
                this.dataSource.data = this.resolveNavigationNodes(view.children, this.parentUrl);
            }
            this.resolveLevels(this.dataSource.data);
            this.subUser = this._userService.user$.subscribe(() => {
                const uView = this._config.getViewByPath(this.viewPath);
                if (uView && uView.children) {
                    this.dataSource.data = this.resolveNavigationNodes(uView.children, this.parentUrl);
                }
                this.resolveLevels(this.dataSource.data);
            });
        } else {
            this.subUser = this._userService.user$.subscribe(() => {
                this.dataSource.data = this.resolveNavigationNodes(this._config.getConfigurationSubtree(['views']), '');
                this.resolveLevels(this.dataSource.data);
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
        if (this.subUser) {
            this.subUser.unsubscribe();
        }
    }

    public hasChild(_: number, node: NavigationNode): boolean {
        return !!node.children && node.children.length > 0;
    }

    protected resolveNavigationNodes(views: Views, parentUrl: string): Array<NavigationNode> {
        if (!views || Object.keys(views).length === 0) {
            return null;
        }
        const nodes: Array<NavigationNode> = [];
        Object.keys(views).forEach((viewKey: string) => {
            const view = views[viewKey];
            if (!this.hasNavigation(view) && !this.hasSubRoutes(view)) {
                return; // continue
            }
            const routeSegment = this.getNodeRouteSegment(view);

            if (routeSegment === undefined) {
                throw new Error('Route segment doesnt exist in view ' + parentUrl + '/' + viewKey + ' !');
            }

            if  (!this.canAccessView(view, this.appendRouteSegment(parentUrl, routeSegment))) {
                return; // continue
            }

            if (this.hasNavigation(view)) {
                const node: NavigationNode = this.buildNode(view, routeSegment, parentUrl);
                if (this.hasSubRoutes(view)) {
                    node.children = this.resolveNavigationNodes(view.children, node.url);
                }
                nodes.push(node);
            } else {
                if (this.hasSubRoutes(view)) {
                    nodes.push(...this.resolveNavigationNodes(view.children, this.appendRouteSegment(parentUrl, routeSegment)));
                }
            }
        });
        return nodes;
    }

    protected hasNavigation(route: View): boolean {
        if (!route.navigation) {
            return false;
        }
        if (typeof route.navigation === 'boolean') {
            return route.navigation;
        }
        if (typeof route.navigation === 'object') {
            return Object.keys(route.navigation).length !== 0;
        }
    }

    protected hasSubRoutes(route: View): boolean {
        if (!route.children) {
            return false;
        }
        if (typeof route.children === 'object') {
            return Object.keys(route.children).length !== 0;
        }
    }

    protected buildNode(view: View, routeSegment: string, parentUrl: string): NavigationNode {
        const node: NavigationNode = {
            name: null,
            url: null
        };
        node.name = this.getNodeName(view, routeSegment);
        node.icon = this.getNodeIcon(view);
        node.url = this.appendRouteSegment(parentUrl, routeSegment);
        node.translate = this.getNodeTranslateFlag(view);
        return node;
    }

    protected getNodeName(view: View, routeSegment: string): string {
        if (view.navigation['title']) {
            return view.navigation['title'];
        }
        const str = routeSegment.replace('_', ' ');
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    protected getNodeIcon(view: View): string {
        return !view.navigation['icon'] ? undefined : view.navigation['icon'];
    }

    /**
     * @param view configuration of some view, whose routeSegment we want to determine
     * @returns the routeSegment for the provided view, or undefined if none is specified
     */
    protected getNodeRouteSegment(view: View): string {
        return !!view.routing && (typeof view.routing.path === 'string') ? view.routing.path : undefined;
    }

    protected getNodeTranslateFlag(view: View): boolean {
        return view.navigation['translate'] ?? false;
    }

    /**
     * Appends the route segment to the parent URL.
     * @param parentUrl URL of the parent. Should not end with '/'
     * @param routeSegment URL segment of the child
     * @returns `parentUrl/routeSegment` if the `routeSegment` is truthy (not an empty string).
     * Returns `parentUrl` if `routeSegment` is falsy (empty string).
     */
    protected appendRouteSegment(parentUrl: string, routeSegment: string): string {
        return routeSegment ? parentUrl + '/' + routeSegment : parentUrl;
    }

    protected resolveLevels(nodes: NavigationNode[], parentLevel?: number): void {
        if (!nodes) {
            return;
        }
        const currentLevel = parentLevel === null || parentLevel === undefined ? 0 : parentLevel + 1;
        nodes.forEach(node => {
            node.level = currentLevel;
            if (node.children) {
                this.resolveLevels(node.children, currentLevel);
            }
        });
    }

    /**
     * @param view the view whose access permissions we want to check
     * @param url URL to which the view maps. Is used only for error message generation
     * @returns whether the user can access the provided view
     */
    protected canAccessView(view: View, url: string): boolean {
        if (!view.hasOwnProperty('access')) {
            return true;
        }

        if (typeof view.access === 'string') {
            if (view.access === 'public') {
                return true;
            }
            if (view.access !== 'private') {
                throw new Error(`Unknown access option '${view.access}'. Only 'public' or 'private' is allowed.`);
            }
            return !this._userService.user.isEmpty();
        }

        return !this._userService.user.isEmpty() // AuthGuard
                && this.passesRoleGuard(view, url)
                && this.passesAuthorityGuard(view)
                && this.passesGroupGuard(view, url);
    }

    /**
     * @param view the view whose access permissions we want to check
     * @param url URL to which the view maps. Is used only for error message generation
     * @returns whether the user passes the role guard condition for accessing the specified view
     */
    protected passesRoleGuard(view: View, url: string): boolean {
        return !view.access.hasOwnProperty('role') || this._roleGuard.canAccessView(view, url);
    }

    /**
     * @param view the view whose access permissions we want to check
     * @returns whether the user passes the authority guard condition for accessing the specified view
     */
    protected passesAuthorityGuard(view: View): boolean {
        return !view.access.hasOwnProperty('authority') || this._authorityGuard.canAccessView(view);
    }

    /**
     * @param view the view whose access permissions we want to check
     * @param url URL to which the view maps. Is used only for error message generation
     * @returns whether the user passes the role guard condition for accessing the specified view
     */
    protected passesGroupGuard(view: View, url: string): boolean {
        return !view.access.hasOwnProperty('group') || this._groupGuard.canAccessView(view, url);
    }

}
