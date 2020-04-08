import {Injectable} from '@angular/core';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {WorkflowPanelGroupService} from '../workflow-panel-group/services/workflow-panel-group.service';
import {WorkflowHeaderService} from '../../header/workflow-header/workflow-header.service';
import {SortableView} from '../../view/abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource-service';


@Injectable({
    providedIn: 'root'
})
export class WorkflowViewService extends SortableView {

    constructor(public workflowsHeaderService: WorkflowHeaderService,
                public petriNetResourceService: PetriNetResourceService,
                public workflowsPanelGroupService: WorkflowPanelGroupService) {
        super();
    }

    protected setPetriNetReferences(petriNetReferences: Array<PetriNetReference>) {
        this.workflowsHeaderService.setPanelsTitles();
        this.workflowsPanelGroupService.petriNetReferences = petriNetReferences;
    }

    public reload(): void {
        // TODO 8.4.2020 - allow filtering of petri nets in workflow view
        this.petriNetResourceService.getAll().subscribe(petriNet => this.setPetriNetReferences(petriNet.petriNetReferences));
    }

    protected getMetaFieldSortId(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return '';
    }

}
