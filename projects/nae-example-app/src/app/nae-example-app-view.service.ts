import {Injectable} from '@angular/core';
import {ViewService} from '@netgrif/application-engine';

@Injectable({
    providedIn: 'root'
})
export class NaeExampleAppViewService extends ViewService {
    constructor() {
        super([NaeExampleAppViewService, NaeExampleAppViewService]);
    }
}
