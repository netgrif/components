import {Observable} from 'rxjs';
import {Count} from '../interface/count';
import {Filter} from '../../filter/models/filter';


export interface CountService {
    count: (body: Filter) => Observable<Count>;
}
