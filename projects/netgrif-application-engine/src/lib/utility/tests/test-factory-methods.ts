import {SimpleFilter} from '../../filter/models/simple-filter';
import {CaseViewServiceFactory} from '../../view/case-view/service/factory/case-view-service-factory';
import {TaskViewServiceFactory} from '../../view/task-view/service/factory/task-view-service-factory';
import {BaseFilter} from '../../search/models/base-filter';

export const TestCaseViewFactory = (factory: CaseViewServiceFactory) => {
    return factory.createFromConfig('cases');
};

export const TestTaskViewFactory = (factory: TaskViewServiceFactory) => {
    return factory.createFromConfig('task');
};

export const TestCaseBaseFilterProvider: () => BaseFilter = () => {
    return {
        filter: SimpleFilter.emptyCaseFilter()
    };
};

export const TestTaskBaseFilterProvider: () => BaseFilter = () => {
    return {
        filter: SimpleFilter.emptyTaskFilter()
    };
};
