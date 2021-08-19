import {NgModule} from '@angular/core';
import {NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES} from './search-categories-injection-token';
import {CaseDataset} from '../models/category/case/case-dataset';
import {CaseTitle} from '../models/category/case/case-title';
import {CaseCreationDate} from '../models/category/case/case-creation-date';
import {CaseProcess} from '../models/category/case/case-process';
import {CaseTask} from '../models/category/case/case-task';
import {CaseAuthor} from '../models/category/case/case-author';
import {CaseVisualId} from '../models/category/case/case-visual-id';
import {TaskAssignee} from '../models/category/task/task-assignee';
import {TaskTask} from '../models/category/task/task-task';
import {TaskProcess} from '../models/category/task/task-process';
import {TaskRole} from '../models/category/task/task-role';
import {CaseCreationDateTime} from '../models/category/case/case-creation-date-time';
import {CaseStringId} from '../models/category/case/case-string-id';


@NgModule({
    declarations: [],
    imports: [],
    providers: [
        {
            provide: NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
            useValue: [
                CaseDataset,
                CaseTitle,
                CaseCreationDate,
                CaseCreationDateTime,
                CaseProcess,
                CaseTask,
                CaseAuthor,
                CaseVisualId,
                CaseStringId,
            ]
        }, {
            provide: NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
            useValue: [
                TaskAssignee,
                TaskTask,
                TaskProcess,
                TaskRole,
            ]
        }
    ]
})
export class DefaultSearchCategoriesModule {
}
