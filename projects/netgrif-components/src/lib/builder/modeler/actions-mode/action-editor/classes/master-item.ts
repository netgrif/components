import {PetriNet} from '@netgrif/petriflow';
import {ActionType} from './editable-action';

export class MasterItem {

  public name = '';

  constructor(public id: string, public type: ActionType, public model: PetriNet) {
  }
}
