import {BasicLayout} from '../../utility/grid-layout/model/grid-element';


export interface TaskLayout extends BasicLayout {
    offset: number;
    [k: string]: any;
}
