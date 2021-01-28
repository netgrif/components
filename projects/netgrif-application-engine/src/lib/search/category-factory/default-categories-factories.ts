import {Category} from '../models/category/category';
import {CategoryFactory} from './category-factory';
import {CaseTitle} from '../models/category/case/case-title';
import {CaseVisualId} from '../models/category/case/case-visual-id';
import {CaseAuthor} from '../models/category/case/case-author';
import {CaseProcess} from '../models/category/case/case-process';
import {CaseTask} from '../models/category/case/case-task';
import {CaseCreationDate} from '../models/category/case/case-creation-date';
import {CaseDataset} from '../models/category/case/case-dataset';
import {TaskAssignee} from '../models/category/task/task-assignee';
import {TaskProcess} from '../models/category/task/task-process';
import {TaskRole} from '../models/category/task/task-role';
import {TaskTask} from '../models/category/task/task-task';

/**
 * Creates the default case search categories.
 *
 * Depends on {@link CategoryFactory}.
 *
 * @returns an Array containing the default case search categories: {@link CaseDataset}, {@link CaseTitle}, {@link CaseCreationDate},
 * {@link CaseProcess}, {@link CaseTask}, {@link CaseAuthor} and {@link CaseVisualId}
 */
export function defaultCaseSearchCategoriesFactory(factory: CategoryFactory): Array<Category<any>> {
    return [
        factory.get(CaseDataset),
        factory.get(CaseTitle),
        factory.get(CaseCreationDate),
        factory.get(CaseProcess),
        factory.get(CaseTask),
        factory.get(CaseAuthor),
        factory.get(CaseVisualId),
    ];
}

/**
 * Creates the default task search categories.
 *
 * Depends on {@link CategoryFactory}.
 *
 * @returns an Array containing the default task search categories: {@link TaskAssignee}, {@link TaskTask}, {@link TaskProcess}
 * and {@link TaskRole}
 */
export function defaultTaskSearchCategoriesFactory(factory: CategoryFactory): Array<Category<any>> {
    return [
        factory.get(TaskAssignee),
        factory.get(TaskTask),
        factory.get(TaskProcess),
        factory.get(TaskRole),
    ];
}
