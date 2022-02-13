import {Component} from '@angular/core';
import {AbstractTreeComponent, CaseTreeService} from '@netgrif/components-core';

@Component({
    selector: 'nc-tree-component',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    providers: [CaseTreeService]
})
export class TreeComponent extends AbstractTreeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}
