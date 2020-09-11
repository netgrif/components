import {BasicLayout} from '../../utility/grid-layout/model/grid-element';
import {FieldAlignment} from './field-alignment';
import {DataGroupLayoutType} from './data-group-layout';


export interface TaskLayout extends BasicLayout {
    offset: number;
    type?: DataGroupLayoutType;
    fieldAlignment?: FieldAlignment;
    [k: string]: any;
}
