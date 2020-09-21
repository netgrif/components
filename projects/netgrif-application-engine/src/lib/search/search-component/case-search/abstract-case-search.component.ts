import {Category} from '../../models/category/category';
import {CategoryFactory} from '../../category-factory/category-factory';
import {CaseTitle} from '../../models/category/case/case-title';
import {CaseVisualId} from '../../models/category/case/case-visual-id';
import {CaseAuthor} from '../../models/category/case/case-author';
import {CaseProcess} from '../../models/category/case/case-process';
import {CaseRole} from '../../models/category/case/case-role';
import {CaseTask} from '../../models/category/case/case-task';
import {CaseCreationDate} from '../../models/category/case/case-creation-date';
import {CaseDataset} from '../../models/category/case/case-dataset';

export abstract class AbstractCaseSearchComponent {

    public searchCategories: Array<Category<any>>;

    constructor(protected _categoryFactory: CategoryFactory) {
        this.searchCategories = [
            this._categoryFactory.get(CaseTitle),
            this._categoryFactory.get(CaseVisualId),
            this._categoryFactory.get(CaseAuthor),
            this._categoryFactory.get(CaseProcess),
            this._categoryFactory.get(CaseRole),
            this._categoryFactory.get(CaseTask),
            this._categoryFactory.get(CaseCreationDate),
            this._categoryFactory.get(CaseDataset),
        ];
    }

}
