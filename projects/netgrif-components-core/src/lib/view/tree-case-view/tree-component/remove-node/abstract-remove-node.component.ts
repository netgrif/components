import {Component, Input} from '@angular/core';
import {CaseTreeNode} from '../model/case-tree-node';
import {CaseTreeService} from '../case-tree.service';

@Component({
    selector: 'ncc-abstract-remove-node',
    template: ''
})
export abstract class AbstractRemoveNodeComponent {

    @Input() node: CaseTreeNode;

    constructor(protected _treeService: CaseTreeService) {
    }

    public removeNode(event: Event): void {
        event.stopPropagation();
        this._treeService.removeNode(this.node);
    }

}
