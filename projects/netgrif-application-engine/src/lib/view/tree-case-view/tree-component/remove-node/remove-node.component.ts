import {Component, Input} from '@angular/core';
import {CaseTreeNode} from '../model/CaseTreeNode';
import {CaseTreeService} from '../case-tree.service';

@Component({
    selector: 'nae-remove-node',
    templateUrl: './remove-node.component.html',
    styleUrls: ['./remove-node.component.scss']
})
export class RemoveNodeComponent {

    @Input() node: CaseTreeNode;

    constructor(private _treeService: CaseTreeService) {
    }

    public removeNode(event: Event): void {
        event.stopPropagation();
        this._treeService.removeNode(this.node);
    }

}
