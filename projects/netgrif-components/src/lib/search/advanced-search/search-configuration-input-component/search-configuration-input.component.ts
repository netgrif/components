import {Component} from '@angular/core';
import {AbstractSearchConfigurationInputComponent, OperatorTemplatePartType, SearchInputType} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-configuration-input',
    templateUrl: './search-configuration-input.component.html',
    styleUrls: ['./search-configuration-input.component.scss']
})
export class SearchConfigurationInputComponent extends AbstractSearchConfigurationInputComponent {

    // make the enum referencable in HTML
    public searchInputType = SearchInputType;
    // make the enum referencable in HTML
    public operatorTemplatePartType = OperatorTemplatePartType;

    constructor() {
        super();
    }

}
