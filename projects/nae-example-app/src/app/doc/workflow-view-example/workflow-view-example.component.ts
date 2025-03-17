import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
    PetriNetResourceService,
    BaseAllowedNetsService,
    loadAllPages
} from '@netgrif/components-core';
import {WorkflowViewComponent} from '@netgrif/components';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'nae-app-workflows-view-example',
    templateUrl: './workflow-view-example.component.html',
    styleUrls: ['./workflow-view-example.component.scss'],
    providers: [
        // {provide: NAE_WORKFLOW_SERVICE_CONFIRM_DELETE, useValue: false}
    ],
    standalone: false
})
export class WorkflowViewExampleComponent implements OnInit, AfterViewInit {
    readonly TITLE = 'Workflows view';
    readonly DESCRIPTION = 'Ukážka použitia workflow view...';

    @ViewChild(WorkflowViewComponent) workflowViewComp: WorkflowViewComponent;


    constructor(private petriNetRes: PetriNetResourceService, private _baseAllowedNets: BaseAllowedNetsService) {
    }

    ngOnInit(): void {
        loadAllPages((a, b) => this.petriNetRes.searchPetriNets(a, b), {}).subscribe(a => console.log(a));
    }

    ngAfterViewInit(): void {
        this.workflowViewComp.workflows$.pipe(
            tap(nets => {
                this._baseAllowedNets.allowedNets = nets.map(net => net.identifier);
            })
        );
    }
}
