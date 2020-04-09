import {HeaderChangeDescription} from '../../abstract-header-service';
import {HeaderMode} from '../header-mode';
import {HeaderType} from '../header-type';

export interface HeaderChange {
    mode: HeaderMode;
    description: HeaderChangeDescription;
    headerType: HeaderType;
}
