import {Component} from '@angular/core';
import {Category} from '../../models/category/category';
import {CategoryFactoryService} from '../../category-factory/category-factory.service';
import {CaseTitle} from '../../models/category/case/case-title';
import {CaseVisualId} from '../../models/category/case/case-visual-id';
import {CaseAuthor} from '../../models/category/case/case-author';

@Component({
    selector: 'nae-case-search',
    templateUrl: './case-search.component.html',
    styleUrls: ['./case-search.component.scss']
})
export class CaseSearchComponent {

    public searchCategories: Array<Category>;

    constructor(private _categoryFactory: CategoryFactoryService) {
        this.searchCategories = [
            this._categoryFactory.get(CaseTitle),
            this._categoryFactory.get(CaseVisualId),
            this._categoryFactory.get(CaseAuthor),
        ];
    }

}
