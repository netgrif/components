import {Component} from '@angular/core';
import {AbstractMultichoiceListFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-multichoice-list-field',
    templateUrl: './multichoice-list-field.component.html',
    styleUrls: ['./multichoice-list-field.component.scss']
})
export class MultichoiceListFieldComponent extends AbstractMultichoiceListFieldComponent {

    constructor() {
        super();
    }
}
