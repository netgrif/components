import {Injectable} from '@angular/core';
import {PetriNetResourceService} from './petri-net-resource.service';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {WorkflowsPanelGroupService} from '../workflows-panel-group/services/workflows-panel-group.service';
import {WorkflowsHeaderService} from '../../header/workflows-header/workflows-header.service';
import {Headers} from '../../header/headers';


@Injectable({
    providedIn: 'root'
})
export class WorkflowsViewService {

    constructor(
        public workflowsHeaderService: WorkflowsHeaderService,
        public petriNetResourceService: PetriNetResourceService,
        public workflowsPanelGroupService: WorkflowsPanelGroupService) {
        petriNetResourceService.getAll().subscribe(petriNet =>
            this.setPetriNetReferences(petriNet.petriNetReferences));
    }

    private setPetriNetReferences(petriNetReferences: Array<PetriNetReference>) {
        this.workflowsPanelGroupService.headers = this.workflowsHeaderService.headers;
        this.workflowsHeaderService.petriNetReferences = petriNetReferences;
        this.workflowsHeaderService.setPanelsTitles();
        this.workflowsPanelGroupService.petriNetReferences = petriNetReferences;
        this.workflowsPanelGroupService.populateDataFields();
    }

    public setPanelTitles(headers: Headers) {
        this.workflowsPanelGroupService.headers = headers;
        this.workflowsPanelGroupService.setPanelsTitles();
    }

}
