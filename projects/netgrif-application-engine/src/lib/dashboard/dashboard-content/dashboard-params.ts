import {CountCard} from '../cards/model/count-card';
import {GraphCard} from '../cards/model/graph-card';
import {IframeCard} from '../cards/model/iframe-card';


export interface DashboardParams {
    columns: number;
    cards: Array<CountCard | GraphCard | IframeCard>;
}
