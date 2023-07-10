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
import {CaseStringId} from '../models/category/case/case-string-id';
import {TaskAssignee} from '../models/category/task/task-assignee';
import {TaskProcess} from '../models/category/task/task-process';
import {TaskRole} from '../models/category/task/task-role';
import {TaskTask} from '../models/category/task/task-task';
import {CaseCreationDateTime} from '../models/category/case/case-creation-date-time';
import {CategorySerialisationPair} from './category-serialisation-pair';

/**
 * A service that resolves {@link Categories} (or custom string) into a concrete {@link Category} implementation class and vice versa.
 */
@Injectable({
    providedIn: 'root'
})
export class CategoryResolverService {

    private readonly _classToStringTable;
    private readonly _stringToClassTable;

    constructor() {
        this._classToStringTable = {};
        this._stringToClassTable = {};
        this.registerDefaultPairings();
    }

    /**
     * Registers the default class - serialisation pairings for all the {@link Category} classes provided by this library.
     */
    private registerDefaultPairings(): void {
        [
            // Case
            {
                classReference: CaseAuthor,
                serialized: Categories.CASE_AUTHOR
            }, {
                classReference: CaseCreationDate,
                serialized: Categories.CASE_CREATION_DATE
            }, {
                classReference: CaseCreationDateTime,
                serialized: Categories.CASE_CREATION_DATE_TIME
            }, {
                classReference: CaseDataset,
                serialized: Categories.CASE_DATASET
            }, {
                classReference: CaseProcess,
                serialized: Categories.CASE_PROCESS
            }, {
                classReference: CaseRole,
                serialized: Categories.CASE_ROLE
            }, {
                classReference: CaseSimpleDataset,
                serialized: Categories.CASE_SIMPLE_DATASET
            }, {
                classReference: CaseTask,
                serialized: Categories.CASE_TASK
            }, {
                classReference: CaseTitle,
                serialized: Categories.CASE_TITLE
            }, {
                classReference: CaseVisualId,
                serialized: Categories.CASE_VISUAL_ID
            }, {
                classReference: CaseStringId,
                serialized: Categories.CASE_STRING_ID
            },
            // Task
            {
                classReference: TaskAssignee,
                serialized: Categories.TASK_ASSIGNEE
            }, {
                classReference: TaskProcess,
                serialized: Categories.TASK_PROCESS
            }, {
                classReference: TaskRole,
                serialized: Categories.TASK_ROLE
            }, {
                classReference: TaskTask,
                serialized: Categories.TASK_TASK
            }
        ].forEach(pair => this.registerPair(pair));
    }

    /**
     * Resolves the categories from the {@link Categories} enum into their corresponding classes.
     * Passes all unresolved values into the [toCustomClass()]{@link CategoryResolverService#toCustomClass} method - this
     * behavior is deprecated in 5.6.0.
     * @param category a serialized representation of the {@link Category} class
     */
    public toClass(category: Categories | string): Type<Category<any>> | undefined {
        return this._stringToClassTable[category] ?? this.toCustomClass(category);
    }

    /**
     * Resolves a {@link Category} class or a class instance into its corresponding serialisation.
     * @param category a class reference or a class instance
     * @returns the associated serialisation or `undefined` if no serialisation was associated
     */
    public serialize(category: Type<Category<any>> | Category<any>): Categories | string | undefined {
        if (category instanceof Category) {
            // @ts-ignore
            return this._classToStringTable[category.constructor];
        }
        // @ts-ignore
        return this._classToStringTable[category];
    }

    /**
     * Should resolve any custom categories into their corresponding class objects.
     *
     * If you implement any custom {@link Category} classes, you should override this method to resolve them after serialization.
     *
     * @param category the serialized string provided by your [Category.serialize()]{@link Category#serializeClass} implementation
     * @returns `undefined`
     *
     * @deprecated in 5.6.0 - use the [registerPair]{@link CategoryResolverService#registerPair} method to registry
     * both transformations instead.
     */
    protected toCustomClass(category: string): Type<Category<any>> | undefined {
        return undefined;
    }

    /**
     * Adds the given mapping to the look-up tables
     *
     * @returns a new pair where: The class is the previous string association. The string is the previous class association.
     * One or both of the values in the returned pair may be `undefined`.
     */
    protected registerPair(pair: CategorySerialisationPair): CategorySerialisationPair {
        const associatedClass = this._stringToClassTable[pair.serialized];
        this._stringToClassTable[pair.serialized] = pair.classReference;

        // non-string/number object keys are supported by javascript but are lacking typescript support
        // @ts-ignore
        const associatedString = this._classToStringTable[pair.classReference];
        // @ts-ignore
        this._classToStringTable[pair.classReference] = pair.serialized;

        return {
            classReference: associatedClass,
            serialized: associatedString
        };
    }
}
