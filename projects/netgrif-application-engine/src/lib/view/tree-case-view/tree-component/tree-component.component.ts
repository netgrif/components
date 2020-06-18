import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Filter} from '../../../filter/models/filter';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {HttpParams} from '@angular/common/http';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';

interface TreeNode {
    case: Case;
    children?: TreeNode[];
}

@Component({
    selector: 'nae-tree-component',
    templateUrl: './tree-component.component.html',
    styleUrls: ['./tree-component.component.scss']
})
export class TreeComponentComponent implements OnInit {

    private _filter: Filter;
    treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();

    constructor(private _caseResource: CaseResourceService, private _treeCaseService: TreeCaseViewService) {
    }

    ngOnInit(): void {
    }

    @Input() set filter(filter: Filter) {
        this._filter = filter;
        this.loadNodes();
    }

    loadNodes() {
        if (this._filter) {
            let params: HttpParams = new HttpParams();
            params = params.set('size', 100 + '');
            params = params.set('page', 0 + '');
            this._caseResource.searchCases(this._filter, params).subscribe(kazes => {
                if (kazes && kazes.content && Array.isArray(kazes.content)) {
                    const array = [];
                    kazes.content.forEach(kaze => {
                        array.push({case: kaze});
                    });
                    this.dataSource.data = array;
                }
            });
        }
    }

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    openCase(kaze: Case) {
        this._treeCaseService.case.next(kaze);
    }
}
