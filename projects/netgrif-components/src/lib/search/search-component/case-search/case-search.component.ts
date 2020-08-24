import {Component} from '@angular/core';
import {CategoryFactory, AbstractCaseSearchComponent } from '@netgrif/application-engine';

@Component({
    selector: 'nc-case-search',
    templateUrl: './case-search.component.html',
    styleUrls: ['./case-search.component.scss'],
    providers: [
        CategoryFactory
    ]
})
export class CaseSearchComponent extends AbstractCaseSearchComponent {

    constructor(protected _categoryFactory: CategoryFactory) {
        super(_categoryFactory);
    }

}
