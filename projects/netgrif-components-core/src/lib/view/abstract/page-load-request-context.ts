import {Filter} from '../../filter/models/filter';
import {Pagination} from '../../resources/interface/pagination';

/**
 * Holds the information that accompanies a page load request. These information are held outside of the
 * service that handles the requests, so that state information about multiple requests can be handled independently of each other.
 */
export class PageLoadRequestContext {
    /**
     * Stores the {@link Filter} object that was used with the request.
     */
    filter: Filter;
    /**
     * Stores the pagination information that was used with the request.
     */
    pagination: Pagination;
    /**
     * Whether the existing tasks or cases should be replaced by the result of this request.
     */
    clearLoaded: boolean;
    /**
     * Whether the tasks on the current page should be reloaded by this request.
     *
     * This option does not affect case requests.
     */
    reloadCurrentTaskPage: boolean;
    /**
     * Used for forcing the request after queued Assign or Cancel.
     */
    force: boolean;

    /**
     * @param requestFilter the {@link Filter} that is used by the request. Context holds the passed reference.
     * @param requestPagination the {@link Pagination} that is used by the request.
     * Context creates a local copy of the passed objects content.
     * @param clearLoaded whether the existing tasks or cases should be cleared and replaced by the result of this request.
     * @param reloadCurrentTaskPage whether the current page of tasks should be updated with the result of the current request.
     * Does not affect case requests.
     */
    constructor(requestFilter: Filter, requestPagination: Pagination, clearLoaded = false, reloadCurrentTaskPage = false, force = false) {
        this.filter = requestFilter;
        this.pagination = Object.assign({}, requestPagination);
        this.clearLoaded = clearLoaded;
        this.reloadCurrentTaskPage = reloadCurrentTaskPage;
        this.force = force;
    }

    public get pageNumber(): number {
        return this.pagination && this.pagination.number;
    }
}
