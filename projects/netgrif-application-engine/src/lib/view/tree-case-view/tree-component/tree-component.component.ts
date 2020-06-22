import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Filter} from '../../../filter/models/filter';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {HttpParams} from '@angular/common/http';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';
import {CaseTreeService} from './case-tree.service';
import {CaseTreeNode} from './interfaces/CaseTreeNode';

@Component({
    selector: 'nae-tree-component',
    templateUrl: './tree-component.component.html',
    styleUrls: ['./tree-component.component.scss'],
    providers: [CaseTreeService]
})
export class TreeComponentComponent {

    constructor(private _treeService: CaseTreeService) {
    }

    @Input() set filter(filter: Filter) {
        this._treeService.rootFilter = filter;
    }

    public get dataSource(): MatTreeNestedDataSource<CaseTreeNode> {
        return this._treeService.dataSource;
    }

    public get treeControl(): NestedTreeControl<CaseTreeNode> {
        return this._treeService.treeControl;
    }

    hasChild = (_: number, node: CaseTreeNode) => !!node.children && node.children.length > 0;

    caseNodeClicked(node: CaseTreeNode) {
        this._treeService.caseNodeClicked(node);
    }

    canAddChildren(queriedCase: Case): boolean {
        const immediate = queriedCase.immediateData.find(data => data.stringId === 'canAddTreeChildren');
        return immediate.value;
    }
}
