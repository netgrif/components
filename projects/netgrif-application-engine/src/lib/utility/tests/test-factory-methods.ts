import {SearchService} from '../../search/search-service/search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {ConfigCaseViewServiceFactory} from '../../view/case-view/service/factory/config-case-view-service-factory';
import {ConfigTaskViewServiceFactory} from '../../view/task-view/service/factory/config-task-view-service-factory';

export const TestCaseViewFactory = (factory: ConfigCaseViewServiceFactory) => {
    return factory.create('cases');
};

export const TestTaskViewFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('cases');
};

export const TestCaseSearchServiceFactory = () => {
    return new SearchService(SimpleFilter.emptyCaseFilter());
};

export const TestTaskSearchServiceFactory = () => {
    return new SearchService(SimpleFilter.emptyTaskFilter());
};
