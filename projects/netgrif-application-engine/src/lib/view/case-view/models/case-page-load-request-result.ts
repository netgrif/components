import {Case} from '../../../resources/interface/case';
import {PageLoadRequestContext} from '../../abstract/page-load-request-context';

/**
 * Holds the information returned by a case page load request alongside the context of the request.
 */
export interface CasePageLoadRequestResult {
    /**
     * Keys are case `stringId`s
     */
    cases: { [k: string]: Case };
    requestContext: PageLoadRequestContext;
}
