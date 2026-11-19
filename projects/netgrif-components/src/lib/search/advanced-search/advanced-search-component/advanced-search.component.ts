import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractAdvancedSearchComponent, AdvancedSearchComponentInitializationService, SearchService} from '@netgrif/components-core';

@Component({
    selector: 'nc-advanced-search',
    templateUrl: './advanced-search.component.html',
    styleUrls: ['./advanced-search.component.scss'],
    providers: [AdvancedSearchComponentInitializationService],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdvancedSearchComponent extends AbstractAdvancedSearchComponent {

    constructor(searchService: SearchService, initializationService: AdvancedSearchComponentInitializationService) {
        super(searchService, initializationService);
    }

}
