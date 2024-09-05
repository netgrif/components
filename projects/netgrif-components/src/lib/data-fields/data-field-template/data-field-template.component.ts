import {Component, Injector} from '@angular/core';
import {AbstractDataFieldTemplateComponent, ConfigurationService, ComponentRegistryService} from '@netgrif/components-core';

@Component({
    selector: 'nc-data-field-template',
    templateUrl: './data-field-template.component.html',
    styleUrls: ['./data-field-template.component.scss']
})
export class DataFieldTemplateComponent extends AbstractDataFieldTemplateComponent {

    constructor(protected _config: ConfigurationService,
                componentRegistry: ComponentRegistryService,
                injector: Injector) {
        super(_config, componentRegistry, injector);
    }
}
