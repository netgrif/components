import {Component} from '@angular/core';
import {AbstractAddChildNodeComponent, CaseTreeService} from '@netgrif/components-core';

@Component({
    selector: 'nc-add-child-node',
    templateUrl: './add-child-node.component.html',
    styleUrls: ['./add-child-node.component.scss'],
    standalone: false
})
export class AddChildNodeComponent extends AbstractAddChildNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}
