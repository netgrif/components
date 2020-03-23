import { Injectable } from '@angular/core';
import {DataDescription} from "../../../header/models/data-description";
import {PetriNetReference} from "../../../header/models/petri-net-reference";
import {PreferredHeaders} from "../../../header/models/preferred-headers";
import {WorkflowPanelDefinition} from "../../../panel/workflows-panel/models/workflows-panels-definition";
import {Headers} from "../../../header/headers";
import {Observable} from "rxjs";
import {HeaderChange} from "../../../header/abstract-header-service";



@Injectable({
  providedIn: 'root'
})
export class WorkflowsPanelGroupService {

    public workflowPanelDefinitions = new Array<WorkflowPanelDefinition>();
    private selectedHeaders: PreferredHeaders;
    private _petriNetReferences: Array<PetriNetReference> = [];
    private _headers: Headers;
    public test: Observable<HeaderChange>;

    constructor() {
    }

    get petriNetReferences(): Array<PetriNetReference> {
        return this._petriNetReferences;
    }

    set petriNetReferences(value: Array<PetriNetReference>) {
        this._petriNetReferences = value;
        this.setPanelsTitles();
    }

    get headers(): Headers {
        return this._headers;
    }

    set headers(value: Headers) {
        this._headers = value;
    }

    /**
     * Set the workflow panel titles according to the active headers
     */
    public setPanelsTitles() {
        this.selectedHeaders = this.headers.selected;
        this.workflowPanelDefinitions = [];
        this.petriNetReferences.forEach(petriNet => {
            this.workflowPanelDefinitions.push({
                column0: this.setColumnTitle(petriNet, 'column0'),
                column1: this.setColumnTitle(petriNet, 'column1'),
                column2: this.setColumnTitle(petriNet, 'column2'),
                column3: this.setColumnTitle(petriNet, 'column3'),
                column4: this.setColumnTitle(petriNet, 'column4'),
                panelContent: {
                    netIdentifier: petriNet.identifier,
                    title: petriNet.title,
                    version: petriNet.version,
                    author: petriNet.author.fullName,
                    uploaded: petriNet.createdDate
                }
            })
        });
    }

    private setColumnTitle(petriNet: PetriNetReference, columnId: string): string {
        if (this.selectedHeaders[columnId].type == 'meta') {
            if (this.selectedHeaders[columnId].identifier == 'author') {
                return petriNet[this.selectedHeaders[columnId].identifier].fullName;
            } else {
                return petriNet[this.selectedHeaders[columnId].identifier];
            }
        } else if (this.selectedHeaders[columnId].type == 'immediate') {
            return this.getImmediateField(petriNet.immediateData, this.selectedHeaders[columnId].identifier)
        }
    }

    /**
     * Returns the title of immediate field if it exists in the Petri net model
     * @param immediateData All immediate fields in current Petri net model
     * @param stringId Identifier of immediate field
     */
    private getImmediateField(immediateData: Array<DataDescription>, stringId: string) {
        let title = '';
        immediateData.forEach(immediateField => {
            if (immediateField.stringId == stringId) {
                title = immediateField.title;
                return;
            }
        });
        return title;
    }

    public setTest() {
        this.test.subscribe(value => console.log(value));
    }
}
