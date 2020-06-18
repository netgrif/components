import {Component, Input} from '@angular/core';
import {CaseTreeService} from '../case-tree.service';
import {CaseTreeNode} from '../interfaces/CaseTreeNode';

@Component({
    selector: 'nae-add-child-node',
    templateUrl: './add-child-node.component.html',
    styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent {

    @Input() node: CaseTreeNode;

    constructor(private _treeService: CaseTreeService) {
    }

    public addChild(): void {
        this._treeService.addChildNode(this.node);
    }
}
