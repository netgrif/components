import {SearchService} from '../../search/search-service/search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {CaseViewServiceFactory} from '../../view/case-view/service/factory/case-view-service-factory';
import {TaskViewServiceFactory} from '../../view/task-view/service/factory/task-view-service-factory';

export const TestCaseViewFactory = (factory: CaseViewServiceFactory) => {
    return factory.createFromConfig('cases');
};

export const TestTaskViewFactory = (factory: TaskViewServiceFactory) => {
    return factory.createFromConfig('task');
};

export const TestCaseSearchServiceFactory = () => {
    return new SearchService(SimpleFilter.emptyCaseFilter());
};

export const TestTaskSearchServiceFactory = () => {
    return new SearchService(SimpleFilter.emptyTaskFilter());
};
