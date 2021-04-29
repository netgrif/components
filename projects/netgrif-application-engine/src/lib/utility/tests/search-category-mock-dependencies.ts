import {OperatorService} from '../../search/operator-service/operator.service';
import {Observable, of} from 'rxjs';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {CategoryFactory} from '../../search/category-factory/category-factory';
import {Net} from '../../process/net';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';

const opService = new OperatorService();

export const createMockDependencies = (allowedNets$: Observable<Array<Net>> = of([])) => {
    const mockCaseView = {allowedNets$} as CaseViewService;
    const mockTaskView = {allowedNets$} as TaskViewService;
    const mockUserResourceService = {getAll: () => of({content: [], pagination: {}})} as UserResourceService;
    const searchIndexResolver = new SearchIndexResolverService();

    return {
        categoryFactory: new CategoryFactory(opService, null,
            searchIndexResolver, mockCaseView, mockTaskView, mockUserResourceService),
        searchIndexResolver,
        userResourceService: mockUserResourceService,
        caseViewService: mockCaseView,
        taskViewService: mockTaskView,
    };
};
