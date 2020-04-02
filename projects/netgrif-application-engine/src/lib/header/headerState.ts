import {PreferredHeaders} from './models/preferred-headers';
import {HeaderMode} from './models/header-mode';

/**
 * Keeps the current stage of the header
 */
export class HeaderState {
    public mode: HeaderMode = HeaderMode.SORT;
    public lastMode: HeaderMode = HeaderMode.SORT;
    public selectedHeaders: PreferredHeaders;
    public lastSelectedHeaders: PreferredHeaders;
}
