import {Injectable} from '@angular/core';
import {EventOutcome} from '../../resources/interface/event-outcome';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {SetDataEventOutcome} from '../model/event-outcomes/data-outcomes/set-data-event-outcome';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor() {
    }

    public parseChangedFieldsFromOutcomeTree(outcome: EventOutcome): ChangedFieldsMap {
        const changedFieldsMap: ChangedFieldsMap = {};
        if ('changedFields' in outcome) {
            const setDataOutcome: SetDataEventOutcome = outcome;
            changedFieldsMap[setDataOutcome.aCase.stringId] = {
                [setDataOutcome.task.stringId]: setDataOutcome.changedFields
            };
        }
        if (!!outcome.outcomes && outcome.outcomes.length > 0) {
            return this.parseChangedFieldsFromOutcomeTreeRecursive(outcome.outcomes, changedFieldsMap);
        } else return changedFieldsMap;
    }

    private parseChangedFieldsFromOutcomeTreeRecursive(outcomes: Array<EventOutcome>,
                                                       changedFieldsMap: ChangedFieldsMap = {}): ChangedFieldsMap {
        outcomes.forEach(childOutcome => {
            if ('changedFields' in childOutcome) {
                const setDataOutcome: SetDataEventOutcome = childOutcome as SetDataEventOutcome;
                const outcomeChangedFields: ChangedFields = (childOutcome as SetDataEventOutcome).changedFields.changedFields;
                const caseId = setDataOutcome.aCase.stringId;
                if (!Object.keys(changedFieldsMap).includes(caseId)) {
                    changedFieldsMap[caseId] = {};
                }
                const taskId = setDataOutcome.task.stringId;
                if (!Object.keys(changedFieldsMap[caseId]).includes(taskId)) {
                    changedFieldsMap[caseId][taskId] = {};
                }
                Object.keys(outcomeChangedFields).forEach(fieldId => {
                    if (Object.keys(changedFieldsMap[caseId][taskId]).includes(fieldId)) {
                        Object.keys(outcomeChangedFields[fieldId]).forEach(attribute => {
                            changedFieldsMap[caseId][taskId][fieldId][attribute] = outcomeChangedFields[fieldId][attribute];
                        });
                    } else {
                        changedFieldsMap[caseId][taskId][fieldId] = setDataOutcome.changedFields.changedFields[fieldId];
                    }
                });
            }
            if (!!childOutcome.outcomes && childOutcome.outcomes.length > 0) {
                this.parseChangedFieldsFromOutcomeTreeRecursive(childOutcome.outcomes, changedFieldsMap);
            }
        });
        return changedFieldsMap;
    }

}

export interface ChangedFieldsMap {
    [caseId: string]: {
        [taskId: string]: ChangedFields
    };
}
