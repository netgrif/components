import {Component, Input} from '@angular/core';
import {CaseTreeService} from '../case-tree.service';
import {CaseTreeNode} from '../model/case-tree-node';

@Component({
    selector: 'ncc-abstract-add-child-node',
    template: ''
})
export abstract class AbstractAddChildNodeComponent {

    @Input() node: CaseTreeNode;

    constructor(protected _treeService: CaseTreeService) {
    }

    public addChild(event: Event): void {
        event.stopPropagation();
        this._treeService.addChildNode(this.node);
    }
}
