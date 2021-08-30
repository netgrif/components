import {OperatorService} from '../../search/operator-service/operator.service';
import {Observable, of} from 'rxjs';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {CategoryFactory} from '../../search/category-factory/category-factory';
import {Net} from '../../process/net';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';
import {OptionalDependencies} from '../../search/category-factory/optional-dependencies';
import {CategoryResolverService} from '../../search/category-factory/category-resolver.service';
import {OperatorResolverService} from '../../search/operator-service/operator-resolver.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';

const opResolver = new OperatorResolverService();
const opService = new OperatorService(opResolver);

export const createMockDependencies: (
    allowedNets$?: Observable<Array<Net>>,
    operatorService?: OperatorService,
    userResourceService?: UserResourceService) => OptionalDependencies =
    (
        allowedNets$: Observable<Array<Net>> = of([]),
        operatorService?: OperatorService,
        userResourceService = {getAll: () => of({content: [], pagination: {}})} as UserResourceService
    ) => {
        const searchIndexResolver = new SearchIndexResolverService();
        const allowedNetsService = {allowedNets$} as AllowedNetsService;

        return {
            categoryFactory: new CategoryFactory(
                operatorService ?? opService,
                null,
                searchIndexResolver,
                new CategoryResolverService(),
                allowedNetsService,
                userResourceService
            ),
            searchIndexResolver,
            userResourceService,
            allowedNetsService
        };
    };
