import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';

interface TreeNode {
    caseId: string;
    caseTitle: string;
    children?: TreeNode[];
}

@Component({
    selector: 'nae-tree-component',
    templateUrl: './tree-component.component.html',
    styleUrls: ['./tree-component.component.scss']
})
export class TreeComponentComponent implements OnInit {
    treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();

    constructor() {
        this.dataSource.data = [{caseId: 'asdsadsadsadasd', caseTitle: 'hej hej opica', children:
                [{caseId: 'dasdasdadadadasd', caseTitle: 'nie nie opica'}]}];
    }

    ngOnInit(): void {
    }

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    openCase(caseId: string) {
        console.log(caseId);
    }
}
