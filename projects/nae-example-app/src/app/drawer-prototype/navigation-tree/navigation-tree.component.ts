import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';

interface NavigationNode {
    name: string;
    icon?: string;
    url: string;
    children?: Array<NavigationNode>;
}

const TREE_DATA: Array<NavigationNode> = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        url: '/'
    },
    {
        name: 'Cases',
        icon: 'settings',
        url: '/cases',
        children: [
            {
                name: 'Some cases',
                url: '/cases/some'
            },
            {
                name: 'Some other cases',
                url: '/cases/other'
            }
        ]
    },
    {
        name: 'Tasks',
        icon: 'assignment',
        url: '/tasks',
        children: [
            {
                name: 'Some tasks',
                icon: 'assignment',
                url: '/tasks/some',
                children: [
                    {
                        name: 'Some specific tasks',
                        url: '/tasks/some/specific'
                    }
                ]
            }
        ]
    }
];

@Component({
    selector: 'nae-app-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent implements OnInit {

    treeControl: NestedTreeControl<NavigationNode>;
    dataSource: MatTreeNestedDataSource<NavigationNode>;

    constructor() {
        this.treeControl = new NestedTreeControl<NavigationNode>(node => node.children);
        this.dataSource = new MatTreeNestedDataSource<NavigationNode>();
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
    }

    public hasChild(_: number, node: NavigationNode): boolean {
        return !!node.children && node.children.length > 0;
    }

}
