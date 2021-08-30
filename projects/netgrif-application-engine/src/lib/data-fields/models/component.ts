import {Properties} from './properties';
import {Icon} from './icon';

export interface Component {
    name: string;
    properties?: Properties;
    optionIcons?: Array<Icon>;
}
