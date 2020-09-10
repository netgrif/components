import {BasicLayout} from '../../utility/grid-layout/model/grid-element';
import {FieldAlignment} from './field-alignment';


export interface TaskLayout extends BasicLayout {
    offset: number;
    fieldAlignment: FieldAlignment;
    [k: string]: any;
}
