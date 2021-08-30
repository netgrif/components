import {SimpleFilter} from '../../filter/models/simple-filter';
import {BaseFilter} from '../../search/models/base-filter';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';

export const TestCaseViewAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromConfig('cases');
};

export const TestTaskViewAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromConfig('task');
};

export const TestNoAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromArray([]);
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
