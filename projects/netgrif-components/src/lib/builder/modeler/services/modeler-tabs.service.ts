import {Injectable} from '@angular/core';
import {PetriNet} from '@netgrif/petriflow';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ModelerTabsService {
    private _openTab = new Subject<PetriNet>();

    openTab$(): Observable<PetriNet> {
        return this._openTab.asObservable();
    }

    openTab(model: PetriNet): void {
        this._openTab.next(model);
    }
}
