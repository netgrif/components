import {Component, Inject} from '@angular/core';
import {
    AbstractFilterFieldContentComponent,
    SearchService,
    AllowedNetsService,
    AllowedNetsServiceFactory, FilterField, NAE_FILTER_FIELD
} from '@netgrif/application-engine';

export function filterFieldAllowedNetsFactory(factory: AllowedNetsServiceFactory, filterField: FilterField): AllowedNetsService {
    return factory.createFromArray(filterField.allowedNets);
}

@Component({
    selector: 'nc-filter-field-content',
    templateUrl: './filter-field-content.component.html',
    styleUrls: ['./filter-field-content.component.scss'],
    providers: [
        // TODO provide search categories
        {provide: AllowedNetsService, useFactory: filterFieldAllowedNetsFactory, deps: [AllowedNetsServiceFactory, NAE_FILTER_FIELD]},
        SearchService
    ]
})
export class FilterFieldContentComponent extends AbstractFilterFieldContentComponent {

    constructor(@Inject(NAE_FILTER_FIELD) filterField: FilterField,
                fieldSearchService: SearchService) {
        super(filterField, fieldSearchService);
    }

}
