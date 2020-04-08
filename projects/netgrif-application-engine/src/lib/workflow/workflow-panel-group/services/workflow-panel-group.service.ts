import {Injectable} from '@angular/core';
import {DataDescription} from '../../../header/models/data-description';
import {PreferredHeaders} from '../../../header/models/preferred-headers';
import {WorkflowPanelDefinition} from '../../../panel/workflow-panel/models/workflows-panels-definition';
import {HeaderState} from '../../../header/header-state';
import {PetriNetReference} from '../../../resources/interface/petri-net-reference';
import {TextField} from '../../../data-fields/text-field/models/text-field';
import {WorkflowsPanelContent} from '../../../panel/workflow-panel/models/workflows-panel-content';
import {Behavior} from '../../../data-fields/models/behavior';
import {DateField} from '../../../data-fields/date-field/models/date-field';
import moment from 'moment';
import {Moment} from 'moment';

export interface PanelsDataGroup {
    netIdentifier: TextField;
    title: TextField;
    version: TextField;
    author: TextField;
    uploaded: DateField;
}

@Injectable({
    providedIn: 'root'
})
export class WorkflowPanelGroupService {

    public workflowPanelDefinitions = new Array<WorkflowPanelDefinition>();
    private selectedHeaders: PreferredHeaders;
    private _petriNetReferences: Array<PetriNetReference> = [];
    private _headers: HeaderState;
    public panelsDataGroup: Map<string, PanelsDataGroup>;
    private dataFieldsBehaviour: Behavior = {visible: true, editable: false};

    constructor() {
    }

    get petriNetReferences(): Array<PetriNetReference> {
        return this._petriNetReferences;
    }

    set petriNetReferences(value: Array<PetriNetReference>) {
        this._petriNetReferences = value;
        this.setPanelsTitles();
    }

    get headers(): HeaderState {
        return this._headers;
    }

    set headers(value: HeaderState) {
        this._headers = value;
    }

    static resolveFieldType(fieldType: string, fieldTitle: object): string {
        if (fieldType === 'date') {
            return WorkflowPanelGroupService.parseDate(fieldTitle as Array<number>).format('D.MM.YYYY');
        } else {
            return fieldTitle.toString();
        }
    }

    private static parseDate(date: Array<number>): Moment {
        return moment(`${date[0]}-${date[1]}-${date[2]}`);
    }

    /**
     * Set the workflow panel titles according to the active headers
     */
    public setPanelsTitles() {
        // this.selectedHeaders = this.headers.selectedHeaders$;
        // this.workflowPanelDefinitions = [];
        // this.petriNetReferences.forEach(petriNet => {
        //     this.workflowPanelDefinitions.push({
        //         column0: this.setColumnTitle(petriNet, 'column0'),
        //         column1: this.setColumnTitle(petriNet, 'column1'),
        //         column2: this.setColumnTitle(petriNet, 'column2'),
        //         column3: this.setColumnTitle(petriNet, 'column3'),
        //         column4: this.setColumnTitle(petriNet, 'column4'),
        //         panelContent: {
        //             netIdentifier: petriNet.identifier,
        //             title: petriNet.title,
        //             version: petriNet.version,
        //             author: petriNet.author.fullName,
        //             uploaded: petriNet.createdDate
        //         }
        //     });
        // });
    }

    private setColumnTitle(petriNet: PetriNetReference, columnId: string): string {
        if (this.selectedHeaders[columnId].type === 'meta') {
            if (this.selectedHeaders[columnId].identifier === 'author') {
                return petriNet[this.selectedHeaders[columnId].identifier].fullName;
            } else {
                return WorkflowPanelGroupService.resolveFieldType(
                    this.selectedHeaders[columnId].fieldType,
                    petriNet[this.selectedHeaders[columnId].identifier]);
            }
        } else if (this.selectedHeaders[columnId].type === 'immediate') {
            return this.getImmediateField(petriNet.immediateData, this.selectedHeaders[columnId].identifier);
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
            if (immediateField.stringId === stringId) {
                title = WorkflowPanelGroupService.resolveFieldType(immediateField.type, immediateField.title);
                return;
            }
        });
        return title;
    }

    public populateDataFields(): void {
        this.panelsDataGroup = new Map<string, PanelsDataGroup>();
        this.workflowPanelDefinitions.forEach(panel => {
            this.panelsDataGroup.set(
                panel.panelContent.netIdentifier, this.populatePanelDataGroup(panel.panelContent)
            );
        });
    }

    /**
     * Populate data fields group for every petri net model
     * @param panelContent Meta information's about Petri net model
     */
    // TODO change uploaded to DateTimeField
    private populatePanelDataGroup(panelContent: WorkflowsPanelContent): PanelsDataGroup {
        return {
            netIdentifier: new TextField('', 'Net identifier', panelContent.netIdentifier, this.dataFieldsBehaviour),
            title: new TextField('', 'Title', panelContent.title, this.dataFieldsBehaviour),
            version: new TextField('', 'Version', panelContent.version, this.dataFieldsBehaviour),
            author: new TextField('', 'Author', panelContent.author, this.dataFieldsBehaviour),
            uploaded: new DateField('', 'Uploaded', WorkflowPanelGroupService.parseDate(panelContent.uploaded), this.dataFieldsBehaviour)
        };
    }

}
