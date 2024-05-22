import {Injectable} from '@angular/core';
import {EventOutcome} from '../../resources/interface/event-outcome';
import {FrontAction} from '../../data-fields/models/changed-fields';
import {SetDataEventOutcome} from '../model/event-outcomes/data-outcomes/set-data-event-outcome';
import {ChangedFieldsMap} from './interfaces/changed-fields-map';
import {EventConstants} from '../model/event-constants';
import {DataSet} from '../../resources/interface/task-data-sets';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor() {
    }

    public parseChangedFieldsFromOutcomeTree(outcome: EventOutcome): ChangedFieldsMap {
        const changedFieldsMap: ChangedFieldsMap = {};
        if (!!outcome.outcomes && outcome.outcomes.length > 0) {
            return this.parseChangedFieldsFromOutcomeTreeRecursive(outcome.outcomes, changedFieldsMap);
        } else return changedFieldsMap;
    }

    private parseChangedFieldsFromOutcomeTreeRecursive(outcomes: Array<EventOutcome>,
                                                       changedFieldsMap: ChangedFieldsMap): ChangedFieldsMap {
        outcomes.forEach(childOutcome => {
            if (EventConstants.CHANGED_FIELDS in childOutcome
                && !!(childOutcome as SetDataEventOutcome).case
                && !!(childOutcome as SetDataEventOutcome).task) {
                const setDataOutcome: SetDataEventOutcome = childOutcome as SetDataEventOutcome;
                const outcomeChangedFields: DataSet = (childOutcome as SetDataEventOutcome).changedFields;
                const caseId = setDataOutcome.case.stringId;
                if (!Object.keys(changedFieldsMap).includes(caseId)) {
                    changedFieldsMap[caseId] = {};
                }
                const taskId = setDataOutcome.task.stringId;
                if (!Object.keys(changedFieldsMap[caseId]).includes(taskId)) {
                    changedFieldsMap[caseId][taskId] = {
                        taskId
                    };
                }
                Object.keys(outcomeChangedFields.fields).forEach(fieldId => {
                    if (Object.keys(changedFieldsMap[caseId][taskId]).includes(fieldId)) {
                        Object.keys(outcomeChangedFields[fieldId]).forEach(attribute => {
                            changedFieldsMap[caseId][taskId][fieldId][attribute] = outcomeChangedFields.fields[fieldId][attribute];
                        });
                    } else {
                        changedFieldsMap[caseId][taskId][fieldId] = setDataOutcome.changedFields.fields[fieldId];
                    }
                });
            }
            if (!!childOutcome.outcomes && childOutcome.outcomes.length > 0) {
                this.parseChangedFieldsFromOutcomeTreeRecursive(childOutcome.outcomes, changedFieldsMap);
            }
        });
        return changedFieldsMap;
    }

    public parseFrontActionsFromOutcomeTree(outcome: EventOutcome): Array<FrontAction> {
        const frontActions: Array<FrontAction> = [];
        if (!!outcome.outcomes && outcome.outcomes.length > 0) {
            return this.parseFrontActionsFromOutcomeTreeRecursive(outcome.outcomes, frontActions);
        } else return frontActions;
    }

    private parseFrontActionsFromOutcomeTreeRecursive(outcomes: Array<EventOutcome>,
                                                      frontActions: Array<FrontAction>): Array<FrontAction> {
        outcomes.forEach(childOutcome => {
            if (EventConstants.FRONT_ACTIONS in childOutcome) {
                const childFrontActions: Array<FrontAction> = (childOutcome as EventOutcome).frontActions;

                if (!!childFrontActions) {
                    frontActions.push(...childFrontActions)
                }
            }
            if (!!childOutcome.outcomes && childOutcome.outcomes.length > 0) {
                this.parseFrontActionsFromOutcomeTreeRecursive(childOutcome.outcomes, frontActions);
            }
        });
        return frontActions;
    }

}
