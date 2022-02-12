import {Component} from '@angular/core';
import {AbstractDataFieldTemplateComponent, PaperViewService, ConfigurationService} from '@netgrif/components-core';

@Component({
    selector: 'nc-data-field-template',
    templateUrl: './data-field-template.component.html',
    styleUrls: ['./data-field-template.component.scss']
})
export class DataFieldTemplateComponent extends AbstractDataFieldTemplateComponent {

    constructor(protected _paperView: PaperViewService, protected _config: ConfigurationService) {
        super(_paperView, _config);
    }
}
