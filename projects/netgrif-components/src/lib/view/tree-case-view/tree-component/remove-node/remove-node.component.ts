import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractRemoveNodeComponent, CaseTreeService} from '@netgrif/components-core';

@Component({
    selector: 'nc-remove-node',
    templateUrl: './remove-node.component.html',
    styleUrls: ['./remove-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RemoveNodeComponent extends AbstractRemoveNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}
