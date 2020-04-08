import {Injectable} from '@angular/core';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {WorkflowPanelGroupService} from '../workflow-panel-group/services/workflow-panel-group.service';
import {WorkflowsHeaderService} from '../../header/workflows-header/workflows-header.service';
import {HeaderState} from '../../header/header-state';
import {SortableView} from '../../view/abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource-service';


@Injectable({
    providedIn: 'root'
})
export class WorkflowViewService extends SortableView {

    constructor(public workflowsHeaderService: WorkflowsHeaderService,
                public petriNetResourceService: PetriNetResourceService,
                public workflowsPanelGroupService: WorkflowPanelGroupService) {
        super();
        this.reload();
    }

    protected setPetriNetReferences(petriNetReferences: Array<PetriNetReference>) {
        // this.workflowsPanelGroupService.headers = this.workflowsHeaderService.headerState;
        this.workflowsHeaderService.setPanelsTitles();
        this.workflowsPanelGroupService.petriNetReferences = petriNetReferences;
        this.workflowsPanelGroupService.populateDataFields();
    }

    public setPanelTitles(headers: HeaderState) {
        this.workflowsPanelGroupService.headers = headers;
        this.workflowsPanelGroupService.setPanelsTitles();
    }

    public reload(): void {
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
