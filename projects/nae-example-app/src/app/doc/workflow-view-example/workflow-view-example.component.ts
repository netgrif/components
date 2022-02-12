import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
    NAE_WORKFLOW_SERVICE_CONFIRM_DELETE,
    PetriNetResourceService,
    BaseAllowedNetsService,
    loadAllPages
} from '@netgrif/components-core';
import {WorkflowViewComponent} from '@netgrif/components';
import {Subscription} from 'rxjs';

@Component({
    selector: 'nae-app-workflows-view-example',
    templateUrl: './workflow-view-example.component.html',
    styleUrls: ['./workflow-view-example.component.scss'],
    providers: [
        // {provide: NAE_WORKFLOW_SERVICE_CONFIRM_DELETE, useValue: false}
    ]
})
export class WorkflowViewExampleComponent implements OnInit, AfterViewInit, OnDestroy {
    readonly TITLE = 'Workflows view';
    readonly DESCRIPTION = 'Ukážka použitia workflow view...';

    @ViewChild(WorkflowViewComponent) workflowViewComp: WorkflowViewComponent;

    private _sub: Subscription;

    constructor(private petriNetRes: PetriNetResourceService, private _baseAllowedNets: BaseAllowedNetsService) {
    }

    ngOnInit(): void {
        loadAllPages((a, b) => this.petriNetRes.searchPetriNets(a, b), {}).subscribe(a => console.log(a));
    }

    ngAfterViewInit(): void {
        this._sub = this.workflowViewComp.workflows$.subscribe(nets => {
            this._baseAllowedNets.allowedNets = nets.map(net => net.identifier);
        });
    }

    ngOnDestroy(): void {
        if (this._sub !== undefined) {
            this._sub.unsubscribe();
        }
    }
}
