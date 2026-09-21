import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ConfigurationService} from '../../configuration/configuration.service';
import {View, Views} from '../../../commons/schema';
import {NavigationEnd, Router} from '@angular/router';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ReplaySubject, Subscription} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {UserService} from '../../user/services/user.service';
import {
    AbstractNavigationResizableDrawerComponent
} from '../navigation-drawer/abstract-navigation-resizable-drawer.component';
import {ActiveGroupService} from '../../groups/services/active-group.service';
import {debounceTime, filter} from 'rxjs/operators';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LanguageService} from '../../translate/language.service';
import {
    DynamicNavigationRouteProviderService
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import {AccessService} from "../../authorization/permission/access.service";

export interface NavigationNode {
    name: string;
    icon?: string;
    url: string;
    children?: Array<NavigationNode>;
    level?: number;
    translate?: boolean;
}

@Component({
    selector: 'ncc-abstract-navigation-tree',
    template: ''
})
export abstract class AbstractNavigationTreeComponent extends AbstractNavigationResizableDrawerComponent implements OnInit, OnDestroy {

    @Input() public viewPath: string;
    @Input() public parentUrl: string;
    @Input() public routerChange: boolean;

    protected _reloadNavigation: ReplaySubject<void>;

    private _subscriptions: Array<Subscription>;
    private _subGroupResolution: Subscription;
    private _subLangChange: Subscription;

    treeControl: NestedTreeControl<NavigationNode>;
    dataSource: MatTreeNestedDataSource<NavigationNode>;

    protected constructor(protected _config: ConfigurationService,
                          protected _router: Router,
                          protected _log: LoggerService,
                          protected _userService: UserService,
                          protected _accessService: AccessService,
                          protected _activeGroupService: ActiveGroupService,
                          protected _taskResourceService: TaskResourceService,
                          protected _languageService: LanguageService,
                          protected _navigationRouteProvider: DynamicNavigationRouteProviderService) {
        super();
        this.treeControl = new NestedTreeControl<NavigationNode>(node => node.children);
        this.dataSource = new MatTreeNestedDataSource<NavigationNode>();
        this.dataSource.data = this.resolveNavigationNodes(_config.getConfigurationSubtree(['views']), '');
        this.resolveLevels(this.dataSource.data);
        this._reloadNavigation = new ReplaySubject<void>(1);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.viewPath && this.parentUrl !== undefined && this.routerChange) {
            this.resolveNavigationNodesWithOffsetRoot();
        }

        this._subscriptions = [
            this._router.events.pipe(filter(event => event instanceof NavigationEnd && this.routerChange))
                .subscribe(() => this._reloadNavigation.next()),
            this._userService.user$.subscribe(() => this._reloadNavigation.next()),
            this._activeGroupService.activeGroups$.subscribe(() => this._reloadNavigation.next())
        ];

        this._subscriptions.push(
            this._reloadNavigation.pipe(debounceTime(100)).subscribe(() => {
                this.resolveNavigation();
            })
        );
    }

    ngOnDestroy(): void {
        for (const sub of this._subscriptions) {
            if (!sub.closed) {
                sub.unsubscribe();
            }
        }
        this._reloadNavigation.complete();
        if (this._subGroupResolution !== undefined) {
            this._subGroupResolution.unsubscribe();
        }
        if (this._subLangChange !== undefined) {
            this._subLangChange.unsubscribe();
        }
    }

    public hasChild(_: number, node: NavigationNode): boolean {
        return !!node.children && node.children.length > 0;
    }

    protected resolveNavigation(): void {
        let nodes;
        if (this.viewPath && this.parentUrl !== undefined && this.routerChange) {
            nodes = this.resolveNavigationNodesWithOffsetRoot();
        } else {
            nodes = this.resolveNavigationNodes(this._config.getConfigurationSubtree(['views']), '');
        }
        this.dataSource.data = nodes;
        this.resolveLevels(this.dataSource.data);
    }

    protected resolveNavigationNodesWithOffsetRoot(): Array<NavigationNode> {
        const view = this._config.getViewByPath(this.viewPath);
        if (view && view.children) {
            return this.resolveNavigationNodes(view.children, this.parentUrl);
        }
        return this.dataSource.data;
    }

    /**
     * Converts the provided {@link Views} object into the corresponding navigation tree
     * @param views navigation configuration
     * @param parentUrl URL of the parent navigation tree node
     * @param ancestorNodeContainer if the parent node has no navigation this attribute contains the
     * closest ancestor that has navigation
     * @protected
     */
    protected resolveNavigationNodes(
        views: Views,
        parentUrl: string,
        ancestorNodeContainer?: Array<NavigationNode>
    ): Array<NavigationNode> {
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

            if (!this._accessService.canAccessView(view, this.appendRouteSegment(parentUrl, routeSegment))) {
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
                    nodes.push(...this.resolveNavigationNodes(
                        view.children,
                        this.appendRouteSegment(parentUrl, routeSegment), ancestorNodeContainer ?? nodes)
                    );
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

    protected resolveLevels(nodes: Array<NavigationNode>, parentLevel?: number): void {
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

    protected resolveChange() {
        const view = this._config.getViewByPath(this.viewPath);
        if (view && view.children) {
            this.dataSource.data = this.resolveNavigationNodes(view.children, this.parentUrl);
        }
        this.resolveLevels(this.dataSource.data);
    }
}
