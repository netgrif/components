import {Component} from '@angular/core';
import {CaseTreeService, AbstractAddChildNodeComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-add-child-node',
    templateUrl: './add-child-node.component.html',
    styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent extends AbstractAddChildNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}
