import {ChangedFields} from '../../data-fields/models/changed-fields';

/**
 * Spring Boot Role
 */
export interface ChangedFieldContainer {
    /**
     * See [ChangedFields]{@link ChangedFields#}.
     */
    changedFields: ChangedFields;
}
