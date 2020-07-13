import {HeaderChangeDescription} from './header-change-description';
import {HeaderType} from '../header-type';
import {HeaderChangeType} from './header-change-type';

export interface HeaderChange {
    /**
     * Type of the header change. The type determines the type of the `description` attribute.
     */
    changeType: HeaderChangeType;
    /**
     * More information about the event. THe object's structure is determined by the `changeType` attribute
     */
    description: HeaderChangeDescription;
    /**
     * Type of the header that emitted the event
     */
    headerType: HeaderType;
}
