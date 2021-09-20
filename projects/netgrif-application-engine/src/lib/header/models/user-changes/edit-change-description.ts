import {HeaderColumn} from '../header-column';

/**
 * Definition of emitted data when preferred headers are edited
 */
export interface EditChangeDescription {
    preferredHeaders: Array<HeaderColumn | null>;
}
