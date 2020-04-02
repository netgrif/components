import {HeaderChangeDescription} from '../../abstract-header-service';
import {HeaderMode} from '../header-mode';
import {HeaderType} from '../header-type';

export interface HeaderChange {
    type: HeaderMode;
    description: HeaderChangeDescription;
    headerType: HeaderType;
}
