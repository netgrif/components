import {Injectable} from '@angular/core';
import {PetriNetResourceService} from './petri-net-resource.service';

@Injectable({
    providedIn: 'root'
})
export class WorkflowsViewService {

    constructor(public petriNetResourceService: PetriNetResourceService) {
        petriNetResourceService.getAll().subscribe(value => console.log(value));
    }
}
