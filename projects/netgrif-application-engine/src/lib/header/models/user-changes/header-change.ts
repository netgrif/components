import {HeaderChangeDescription, HeaderMode, HeaderType} from '../../abstract-header-service';

export interface HeaderChange {
    type: HeaderMode;
    description: HeaderChangeDescription;
    headerType: HeaderType;
}
