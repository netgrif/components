import {PreferredHeaders} from "./models/preferred-headers";
import {HeaderMode} from "./abstract-header-service";

/**
 * Keeps the current stage of the header
 */
export class Headers {
    public mode: HeaderMode = "sort";
    public lastMode: HeaderMode = "sort";
    public selected: PreferredHeaders;
    public lastSelected: PreferredHeaders;
}
