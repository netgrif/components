import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Route, View} from '@netgrif/application-engine/lib/configuration/interfaces/schema';
import {ConfigurationService} from '@netgrif/application-engine';

interface NavigationNode {
    name: string;
    icon?: string;
    url: string;
    children?: Array<NavigationNode>;
    level?: number;
}

@Component({
    selector: 'nae-app-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent implements OnInit {

    treeControl: NestedTreeControl<NavigationNode>;
    dataSource: MatTreeNestedDataSource<NavigationNode>;

    constructor(private _config: ConfigurationService) {
        this.treeControl = new NestedTreeControl<NavigationNode>(node => node.children);
        this.dataSource = new MatTreeNestedDataSource<NavigationNode>();
        this.dataSource.data = this.resolveNavigationNodes(_config.get().views.routes, '');
        this.resolveLevels(this.dataSource.data);
    }

    ngOnInit(): void {
    }

    public hasChild(_: number, node: NavigationNode): boolean {
        return !!node.children && node.children.length > 0;
    }

    private resolveNavigationNodes(routes, parentUrl: string): Array<NavigationNode> {
        if (!routes || Object.keys(routes).length === 0) {
            return null;
        }
        const nodes: Array<NavigationNode> = [];
        Object.keys(routes).forEach((routeKey: string) => {
            const route: Route = routes[routeKey] as Route;
            if (!this.hasNavigation(route) && !this.hasSubRoutes(route)) {
                return;
            }
            if (this.hasNavigation(route)) {
                const node: NavigationNode = this.buildNode(route, routeKey, parentUrl);
                if (this.hasSubRoutes(route)) {
                    node.children = this.resolveNavigationNodes(route.routes, node.url);
                }
                nodes.push(node);
            } else {
                if (this.hasSubRoutes(route)) {
                    nodes.push(...this.resolveNavigationNodes(route.routes, parentUrl + '/' + routeKey));
                }
            }
        });
        return nodes;
    }

    private getEmptyNode(): NavigationNode {
        return {
            name: null,
            url: null
        };
    }

    private hasNavigation(route: Route): boolean {
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

    private hasSubRoutes(route: Route): boolean {
        if (!route.routes) {
            return false;
        }
        if (typeof route.routes === 'boolean') {
            return route.routes;
        }
        if (typeof route.routes === 'object') {
            return Object.keys(route.routes).length !== 0;
        }
    }

    private buildNode(route: Route, routeKey: string, parentUrl: string): NavigationNode {
        const node: NavigationNode = {
            name: null,
            url: null
        };
        node.name = this.getNodeName(route, routeKey);
        node.icon = this.getNodeIcon(route);
        node.url = parentUrl + '/' + routeKey;
        return node;
    }

    private getNodeName(route: Route, routeKeys: string): string {
        if (route.navigation['title']) {
            return route.navigation['title'];
        }
        const str = routeKeys.replace('_', ' ');
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    private getNodeIcon(route: Route): string {
        return !route.navigation['icon'] ? undefined : route.navigation['icon'];
    }

    private resolveLevels(nodes: NavigationNode[], parentLevel?: number): void {
        const currentLevel = parentLevel === null || parentLevel === undefined ? 0 : parentLevel + 1;
        nodes.forEach(node => {
            node.level = currentLevel;
            if (node.children) {
                this.resolveLevels(node.children, currentLevel);
            }
        });
    }

}
