import {Input} from '@angular/core';
import {CaseTreeService} from '../case-tree.service';
import {CaseTreeNode} from '../model/case-tree-node';

export abstract class AbstractAddChildNodeComponent {

    @Input() node: CaseTreeNode;

    constructor(protected _treeService: CaseTreeService) {
    }

    public addChild(event: Event): void {
        event.stopPropagation();
        this._treeService.addChildNode(this.node);
    }
}
