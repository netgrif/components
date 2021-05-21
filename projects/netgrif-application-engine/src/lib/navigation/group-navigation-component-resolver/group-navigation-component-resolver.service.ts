import {Type} from '@angular/core';
import {AbstractCaseView} from '../../view/case-view/abstract-case-view';
import {AbstractTaskView} from '../../view/task-view/abstract-task-view';

export abstract class GroupNavigationComponentResolverService {

    protected constructor() {
    }

    public abstract getCaseViewComponent(): Type<AbstractCaseView>;

    public abstract getTaskViewComponent(): Type<AbstractTaskView>;
}
