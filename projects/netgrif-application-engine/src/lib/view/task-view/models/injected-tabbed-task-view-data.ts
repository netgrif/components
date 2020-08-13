import {InjectedTabData} from '../../../tabs/interfaces';
import {Filter} from '../../../filter/models/filter';

export interface InjectedTabbedTaskViewData extends InjectedTabData {
    baseFilter: Filter;
    /**
     * Identifiers of the allowed nets. Allowed nets have no effect on the inner working of the task view at large.
     * But search interface uses them to generate the autocomplete data.
     * So by not providing the nets, task search will be severely limited.
     */
    allowedNets?: Array<string>;
    initiallyOpenOneTask?: boolean;
}
