import {PreferredHeaders} from './models/preferred-headers';
import {HeaderMode} from './models/header-mode';

/**
 * Keeps the current stage of the header
 */
export class Headers {
    public mode: HeaderMode = HeaderMode.SORT;
    public lastMode: HeaderMode = HeaderMode.SORT;
    public selected: PreferredHeaders;
    public lastSelected: PreferredHeaders;
}
