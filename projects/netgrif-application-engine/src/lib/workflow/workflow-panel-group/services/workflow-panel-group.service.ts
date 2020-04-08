import {Injectable} from '@angular/core';
import {DataDescription} from '../../../header/models/data-description';
import {PreferredHeaders} from '../../../header/models/preferred-headers';
import {PetriNetReference} from '../../../resources/interface/petri-net-reference';
import {TextField} from '../../../data-fields/text-field/models/text-field';
import {WorkflowsPanelContent} from '../../../panel/workflow-panel/models/workflows-panel-content';
import {Behavior} from '../../../data-fields/models/behavior';
import {DateField} from '../../../data-fields/date-field/models/date-field';


@Injectable()
export class WorkflowPanelGroupService {

    private _petriNetReferences: Array<PetriNetReference> = [];

    constructor() {
    }

    get petriNetReferences(): Array<PetriNetReference> {
        return this._petriNetReferences;
    }

    set petriNetReferences(value: Array<PetriNetReference>) {
        this._petriNetReferences = value;
    }

}
