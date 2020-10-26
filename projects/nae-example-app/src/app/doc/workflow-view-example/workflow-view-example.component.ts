import {Component, OnInit} from '@angular/core';
import {PetriNetResourceService} from '@netgrif/application-engine';
import {loadAllPages} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-workflows-view-example',
    templateUrl: './workflow-view-example.component.html',
    styleUrls: ['./workflow-view-example.component.scss']
})
export class WorkflowViewExampleComponent implements OnInit {
    readonly TITLE = 'Workflows view';
    readonly DESCRIPTION = 'Ukážka použitia workflow view...';
    constructor(private petriNetRes: PetriNetResourceService) {
    }

    ngOnInit(): void {
        loadAllPages((a, b) => this.petriNetRes.searchPetriNets(a, b), {}).subscribe(a => console.log(a));
    }

}
