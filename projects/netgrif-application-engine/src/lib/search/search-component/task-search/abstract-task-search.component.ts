import {CategoryFactory} from '../../category-factory/category-factory';
import {Category} from '../../models/category/category';
import {TaskAssignee} from '../../models/category/task/task-assignee';
import {TaskProcess} from '../../models/category/task/task-process';
import {TaskRole} from '../../models/category/task/task-role';
import {TaskTask} from '../../models/category/task/task-task';

export abstract class AbstractTaskSearchComponent {

    public searchCategories: Array<Category<any>>;

    constructor(protected _categoryFactory: CategoryFactory) {
        this.searchCategories = [
            this._categoryFactory.get(TaskAssignee),
            this._categoryFactory.get(TaskProcess),
            this._categoryFactory.get(TaskRole),
            this._categoryFactory.get(TaskTask),
        ];
    }

}
