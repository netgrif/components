import {ConfigCaseViewServiceFactory} from '../../view/case-view/service/factory/case-view-service-factory';
import {SearchService} from '../../search/search-service/search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';

export const TestCaseViewFactory = (factory: ConfigCaseViewServiceFactory) => {
    return factory.create('cases');
};

export const TestCaseSearchServiceFactory = () => {
    return new SearchService(SimpleFilter.empty(FilterType.CASE));
};

export const TestTaskSearchServiceFactory = () => {
    return new SearchService(SimpleFilter.empty(FilterType.TASK));
};
