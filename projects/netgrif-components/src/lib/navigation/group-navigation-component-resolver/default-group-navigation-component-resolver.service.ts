import {Injectable, Type} from '@angular/core';
import {
    DataGroup, extractFilter,
    FilterType,
    GroupNavigationComponentResolverService, LoggerService, TaskResourceService,
} from '@netgrif/application-engine';
import {DefaultTabViewComponent} from './default-components/default-tab-view/default-tab-view.component';
import {DefaultSimpleTaskViewComponent} from './default-components/default-simple-task-view/default-simple-task-view.component';

@Injectable()
export class DefaultGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

    constructor(taskResourceService: TaskResourceService, log: LoggerService) {
        super(taskResourceService, log);
    }

    public resolveViewComponent(navigationItemTaskData: Array<DataGroup>): Type<any> {
        const filter = extractFilter(navigationItemTaskData);

        if (filter === undefined) {
            throw new Error('Provided navigation item task data does not contain a filter field');
        }

        switch (filter.type) {
            case FilterType.CASE:
                return DefaultTabViewComponent;
            case FilterType.TASK:
                return DefaultSimpleTaskViewComponent;
            default:
                throw new Error(`Cannot resolve group navigation component from '${filter.type}' filter type`);
        }
    }
}
