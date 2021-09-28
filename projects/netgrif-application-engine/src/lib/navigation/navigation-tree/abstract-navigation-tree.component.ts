import {Input, OnDestroy, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Services, View, Views} from '../../../commons/schema';
import {NavigationEnd, Router} from '@angular/router';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {forkJoin, Observable, of, ReplaySubject, Subscription} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {UserService} from '../../user/services/user.service';
import {RoleGuardService} from '../../authorization/role/role-guard.service';
import {AuthorityGuardService} from '../../authorization/authority/authority-guard.service';
import {GroupGuardService} from '../../authorization/group/group-guard.service';
import {AbstractNavigationResizableDrawerComponent} from '../navigation-drawer/abstract-navigation-resizable-drawer.component';
import {ActiveGroupService} from '../../groups/services/active-group.service';
import {concatMap, debounceTime, filter, map, take} from 'rxjs/operators';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {hasContent} from '../../utility/pagination/page-has-content';
import {DataGroup} from '../../resources/interface/data-groups';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {refreshTree} from '../../utility/refresh-tree';
import {getField} from '../../utility/get-field';
import {extractIconAndTitle} from '../utility/navigation-item-task-utility-methods';
import {LanguageService} from '../../translate/language.service';
import {
    DynamicNavigationRouteProviderService
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';

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

    protected _reloadNavigation: ReplaySubject<void>;
    protected _groupNavigationConfig: Services['groupNavigation'];

    private _subscriptions: Array<Subscription>;
    private _subGroupResolution: Subscription;
    private _subLangChange: Subscription;
    private _groupNavNodesCount = 0;

    treeControl: NestedTreeControl<NavigationNode>;
    dataSource: MatTreeNestedDataSource<NavigationNode>;

    protected constructor(protected _config: ConfigurationService,
                          protected _router: Router,
                          protected _log: LoggerService,
                          protected _userService: UserService,
                          protected _roleGuard: RoleGuardService,
                          protected _authorityGuard: AuthorityGuardService,
                          protected _groupGuard: GroupGuardService,
                          protected _activeGroupService: ActiveGroupService,
                          protected _taskResourceService: TaskResourceService,
                          protected _languageService: LanguageService,
                          protected _navigationRouteProvider: DynamicNavigationRouteProviderService) {
        super();
        this.treeControl = new NestedTreeControl<NavigationNode>(node => node.children);
        this.dataSource = new MatTreeNestedDataSource<NavigationNode>();
        this._groupNavigationConfig = this._config.getConfigurationSubtree(['services', 'groupNavigation']);
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

        let groupNavigationGenerated = false;
        const nodes: Array<NavigationNode> = [];
        Object.keys(views).forEach((viewKey: string) => {
            const view = views[viewKey];

            if (!groupNavigationGenerated && this.isGroupNavigationNode(view)) {
                groupNavigationGenerated = true;
                const insertPosition = (ancestorNodeContainer ?? nodes).length;

                this._subLangChange = this._languageService.getLangChange$().subscribe(() => {
                    this.loadGroupNavigationNodes(insertPosition, ancestorNodeContainer ?? nodes);
                });
                this.loadGroupNavigationNodes(insertPosition, ancestorNodeContainer ?? nodes);

                return; // continue
            }

            if (!this.hasNavigation(view) && !this.hasSubRoutes(view)) {
                return; // continue
            }
            const routeSegment = this.getNodeRouteSegment(view);

            if (routeSegment === undefined) {
                throw new Error('Route segment doesnt exist in view ' + parentUrl + '/' + viewKey + ' !');
            }

            if (!this.canAccessView(view, this.appendRouteSegment(parentUrl, routeSegment))) {
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

    protected resolveChange() {
        const view = this._config.getViewByPath(this.viewPath);
        if (view && view.children) {
            this.dataSource.data = this.resolveNavigationNodes(view.children, this.parentUrl);
        }
        this.resolveLevels(this.dataSource.data);
    }

    /**
     * @returns `true` if the layout of the provided {@link View} node's name indicates it is a
     * [group navigation outlet]{@link GroupNavigationConstants#GROUP_NAVIGATION_OUTLET}. Returns `false` otherwise.
     */
    protected isGroupNavigationNode(view: View): boolean {
        return view?.layout?.name === GroupNavigationConstants.GROUP_NAVIGATION_OUTLET;
    }

    /**
     * Forces a reload of the group navigation nodes.
     * @param insertPosition the position in the container where group navigation nodes reside
     * @param nodeContainer the node container that contains the group navigation nodes
     * (can be an inner node of the navigation tree or its root)
     */
    protected loadGroupNavigationNodes(insertPosition: number, nodeContainer: Array<NavigationNode>): void {
        if (this._subGroupResolution !== undefined && !this._subGroupResolution.closed) {
            this._subGroupResolution.unsubscribe();
        }

        this._subGroupResolution = this.generateGroupNavigationNodes().pipe(take(1)).subscribe(groupNavNodes => {
            nodeContainer.splice(insertPosition, this._groupNavNodesCount, ...groupNavNodes);
            this._groupNavNodesCount = groupNavNodes.length;
            refreshTree(this.dataSource);
        });
    }

    protected generateGroupNavigationNodes(): Observable<Array<NavigationNode>> {
        return forkJoin(this._activeGroupService.activeGroups.map(groupCase => {
            return this._taskResourceService.searchTask(SimpleFilter.fromTaskQuery(
                {case: {id: groupCase.stringId}, transitionId: GroupNavigationConstants.NAVIGATION_CONFIG_TRANSITION_ID as string}
            )).pipe(
                map(taskPage => {
                    if (hasContent(taskPage)) {
                        return this._taskResourceService.getData(taskPage.content[0].stringId);
                    } else {
                        this._log.error('Group navigation configuration task was not found.'
                            + ' Navigation for this group cannot be constructed.');
                        return of([]);
                    }
                }),
                concatMap(o => o)
            );
        })).pipe(
            map((navigationConfigurations: Array<Array<DataGroup>>) => {
                const result = [];
                for (const navConfig of navigationConfigurations) {
                    result.push(...this.convertDatagroupsToNavEntries(navConfig));
                }
                return result;
            })
        );
    }

    protected convertDatagroupsToNavEntries(navConfigDatagroups: Array<DataGroup>): Array<NavigationNode> {
        const result = [];
        const entryDataGroupIndices = [];
        navConfigDatagroups.forEach(
            (group, index) => {
                if (group.fields.some(
                    field => field.stringId === GroupNavigationConstants.NAVIGATION_ENTRY_MARKER_FIELD_ID_SUFFIX
                )) {
                    entryDataGroupIndices.push(index);
                }
            }
        );

        let navEntriesTaskRef;
        navConfigDatagroups.some(group => {
            const taskRef = getField(group.fields, GroupNavigationConstants.NAVIGATION_ENTRIES_TASK_REF_FIELD_ID);
            if (taskRef !== undefined) {
                navEntriesTaskRef = taskRef;
            }
            return !!taskRef;
        });

        if (!navEntriesTaskRef) {
            throw new Error('The navigation configuration task contains no task ref with entries. Navigation cannot be constructed');
        }

        for (let order = 0; order < navEntriesTaskRef.value.length; order ++) {
            const index = entryDataGroupIndices[order];
            const label = extractIconAndTitle(navConfigDatagroups.slice(index,
                index + GroupNavigationConstants.DATAGROUPS_PER_NAVIGATION_ENTRY), true);
            const newNode: NavigationNode = {url: '', ...label};

            const url = this._navigationRouteProvider.route;
            if (url === undefined) {
                this._log.error(`No URL is configured in nae.json for configurable group navigation. Dynamic navigation entry was ignored`);
                continue;
            }
            newNode.url = `/${url}/${navEntriesTaskRef.value[order]}`;

            result.push(newNode);
        }
        return result;
    }
}
