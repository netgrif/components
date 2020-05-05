import {CaseViewService} from '../../view/case-view/case-view-service';
import {CategoryFactory} from './category-factory';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';

/**
 * Other dependencies that the {@link CategoryFactory} provides to the [Categories]{@link Category} it creates.
 * The Categories don't have to use any of them.
 */
export interface OptionalDependencies {
    /**
     * If the {@link CategoryFactory} cannot inject an instance of this service into itself `null` will be provided.
     */
    caseViewService: CaseViewService | null;
    /**
     * Reference to the Factory itself. Useful if your choices in one category require a query from a different category as well.
     * Most commonly used to get an instance of {@link CaseProcess} Category to limit queries on identifiers that are only unique
     * within a net to that net.
     */
    categoryFactory: CategoryFactory;
    /**
     * If the {@link CategoryFactory} cannot inject an instance of this service into itself `null` will be provided.
     */
    userResourceService: UserResourceService | null;
}
