import {Component} from '@angular/core';
import {CaseTreeService, AbstractRemoveNodeComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-remove-node',
    templateUrl: './remove-node.component.html',
    styleUrls: ['./remove-node.component.scss']
})
export class RemoveNodeComponent extends AbstractRemoveNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}
