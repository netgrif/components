import {Injectable, Type} from '@angular/core';
import {Categories} from '../models/category/categories';
import {Category} from '../models/category/category';
import {CaseAuthor} from '../models/category/case/case-author';
import {CaseCreationDate} from '../models/category/case/case-creation-date';
import {CaseDataset} from '../models/category/case/case-dataset';
import {CaseProcess} from '../models/category/case/case-process';
import {CaseRole} from '../models/category/case/case-role';
import {CaseSimpleDataset} from '../models/category/case/case-simple-dataset';
import {CaseTask} from '../models/category/case/case-task';
import {CaseTitle} from '../models/category/case/case-title';
import {CaseVisualId} from '../models/category/case/case-visual-id';
import {TaskAssignee} from '../models/category/task/task-assignee';
import {TaskProcess} from '../models/category/task/task-process';
import {TaskRole} from '../models/category/task/task-role';
import {TaskTask} from '../models/category/task/task-task';

/**
 * A service that resolves {@link Categories} (or custom string) into a concrete {@link Category} implementation class.
 */
@Injectable({
    providedIn: 'root'
})
export class CategoryResolverService {

    /**
     * Resolves the categories in the {@link Categories} enum into their corresponding classes.
     * Passes all unresolved values into the [toCustomClass()]{@link CategoryResolverService#toCustomClass} method.
     * @param category a serialized representation of the {@link Category} class
     */
    public toClass(category: Categories | string): Type<Category<any>> | undefined {
        switch (category) {
            default:
                return this.toCustomClass(category);
            // Case
            case Categories.CASE_AUTHOR:
                return CaseAuthor;
            case Categories.CASE_CREATION_DATE:
                return CaseCreationDate;
            case Categories.CASE_DATASET:
                return CaseDataset;
            case Categories.CASE_PROCESS:
                return CaseProcess;
            case Categories.CASE_ROLE:
                return CaseRole;
            case Categories.CASE_SIMPLE_DATASET:
                return CaseSimpleDataset;
            case Categories.CASE_TASK:
                return CaseTask;
            case Categories.CASE_TITLE:
                return CaseTitle;
            case Categories.CASE_VISUAL_ID:
                return CaseVisualId;
            // Task
            case Categories.TASK_ASSIGNEE:
                return TaskAssignee;
            case Categories.TASK_PROCESS:
                return TaskProcess;
            case Categories.TASK_ROLE:
                return TaskRole;
            case Categories.TASK_TASK:
                return TaskTask;
        }
    }

    /**
     * Should resolve any custom categories into their corresponding class objects.
     *
     * If you implement any custom {@link Category} classes, you should override this method to resolve them after serialization.
     *
     * @param category the serialized string provided by your [Category.serialize()]{@link Category#serializeClass} implementation
     * @returns `undefined`
     */
    protected toCustomClass(category: string): Type<Category<any>> | undefined {
        return undefined;
    }

}
