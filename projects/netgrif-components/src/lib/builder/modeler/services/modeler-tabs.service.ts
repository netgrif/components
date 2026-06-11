import {Injectable} from '@angular/core';
import {PetriNet} from '@netgrif/petriflow';
import {Subject} from 'rxjs';

@Injectable()
export class ModelerTabsService {
  openTab: Subject<PetriNet>;

  constructor() {
    this.openTab = new Subject<PetriNet>();
  }
}
