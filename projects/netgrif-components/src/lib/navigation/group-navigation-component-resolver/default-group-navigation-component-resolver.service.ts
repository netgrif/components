import {Injectable, Injector, Type} from '@angular/core';
import {
    Case,
    CaseResourceService,
    FilterType,
    getImmediateData,
    GroupNavigationComponentResolverService,
    GroupNavigationConstants
} from '@netgrif/application-engine';
import {DefaultTabViewComponent} from './default-components/default-tab-view/default-tab-view.component';
import {DefaultSimpleTaskViewComponent} from './default-components/default-simple-task-view/default-simple-task-view.component';

@Injectable()
export class DefaultGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

    constructor(caseResourceService: CaseResourceService, parentInjector: Injector) {
        super(caseResourceService, parentInjector);
    }

    public resolveViewComponent(filterCase: Case): Type<any> {
        const filterField = getImmediateData(filterCase, GroupNavigationConstants.NAVIGATION_FILTER_FIELD_ID_SUFFIX);

        if (filterField === undefined) {
            throw new Error(`Provided filter case with id '${filterCase.stringId}' is not a filter case`);
        }

        switch (filterField?.filterMetadata?.filterType) {
            case FilterType.CASE:
                return DefaultTabViewComponent;
            case FilterType.TASK:
                return DefaultSimpleTaskViewComponent;
            default:
                throw new Error(`Cannot resolve group navigation component from '${filterField?.filterMetadata?.filterType}' filter type`);
        }
    }
}
