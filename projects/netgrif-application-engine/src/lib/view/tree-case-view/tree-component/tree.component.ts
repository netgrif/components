import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Filter} from '../../../filter/models/filter';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {HttpParams} from '@angular/common/http';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';
import {CaseTreeService} from './case-tree.service';
import {CaseTreeNode} from './model/CaseTreeNode';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';

@Component({
    selector: 'nae-tree-component',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    providers: [CaseTreeService]
})
export class TreeComponent {

    constructor(private _treeService: CaseTreeService) {
    }

    @Input() set filter(filter: Filter) {
        this._treeService.rootFilter = filter;
    }

    @Input() set showTreeRoot(showTreeRoot: boolean) {
        this._treeService.treeRootLoaded$.subscribe(success => {
            if (success) {
                this._treeService.initializeTree(showTreeRoot);
            }
        });
    }

    public get dataSource(): MatTreeNestedDataSource<CaseTreeNode> {
        return this._treeService.dataSource;
    }

    public get treeControl(): NestedTreeControl<CaseTreeNode> {
        return this._treeService.treeControl;
    }

    hasChild = (_: number, node: CaseTreeNode) => {
        const childrenCaseRef = node.case.immediateData.find(data => data.stringId === TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        return !!childrenCaseRef && !!childrenCaseRef.value && childrenCaseRef.value.length > 0;
    }

    caseNodeClicked(node: CaseTreeNode) {
        this._treeService.caseNodeClicked(node);
    }

    toggleCaseNode(node: CaseTreeNode) {
        this._treeService.toggleNode(node);
    }

    canAddChildren(queriedCase: Case): boolean {
        const immediate = queriedCase.immediateData.find(data => data.stringId === TreePetriflowIdentifiers.CAN_ADD_CHILDREN);
        return !!immediate && immediate.value;
    }
}
