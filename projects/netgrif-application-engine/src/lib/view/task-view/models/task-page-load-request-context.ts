import {Filter} from '../../../filter/models/filter';
import {Pagination} from '../../../resources/interface/pagination';

/**
 * Holds the information that accompanies a task page load request. These information are held outside of the
 * service that handles the requests, so that state information about multiple requests can be handled independently of each other.
 */
export class TaskPageLoadRequestContext {
    /**
     * Stores the {@link Filter} object that was used with the request.
     */
    filter: Filter;
    /**
     * Stores the pagination information that was used with the request.
     */
    pagination: Pagination;
    /**
     * Whether the existing tasks should be replaced by the result of this request.
     */
    clearLoadedTasks: boolean;
    /**
     * Whether the tasks on the current page should be reloaded by this request.
     */
    reloadCurrentPage: boolean;

    /**
     * @param requestFilter the {@link Filter} that is used by the request. Context holds the passed reference.
     * @param requestPagination the {@link Pagination} that is used by the request.
     * Context creates a local copy of the passed objects content.
     * @param clearLoadedTasks whether the existing tasks should be cleared and replaced by the result of this request.
     * @param reloadCurrentPage whether the current page should be updated with the result of the current request.
     */
    constructor(requestFilter: Filter, requestPagination: Pagination, clearLoadedTasks = false, reloadCurrentPage = false) {
        this.filter = requestFilter;
        this.pagination = Object.assign({}, requestPagination);
        this.clearLoadedTasks = clearLoadedTasks;
        this.reloadCurrentPage = reloadCurrentPage;
    }

    public get pageNumber(): number {
        return this.pagination && this.pagination.number;
    }
}
