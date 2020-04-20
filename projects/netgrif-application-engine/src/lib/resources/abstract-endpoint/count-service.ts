import {Observable} from 'rxjs';
import {Count} from '../interface/count';


export interface CountService {
    count: (body: object) => Observable<Count>;
}
