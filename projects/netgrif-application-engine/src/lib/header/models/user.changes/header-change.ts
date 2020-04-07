import {HeaderChangeDescription, HeaderMode, HeaderType} from '../../abstract-header-service';

export interface HeaderChange {
    mode: HeaderMode;
    description: HeaderChangeDescription;
    headerType: HeaderType;
}
