import {Injectable} from '@angular/core';
import {DataFocusPolicy} from '../../task-content/model/policy';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskHandlingService} from './task-handling-service';

/**
 * Handles the sequence of actions that are performed when a task si [opened]{@link TaskOperations#open}.
 */
@Injectable()
export class DataFocusPolicyService extends TaskHandlingService {

    constructor(_taskContentService: TaskContentService) {
        super(_taskContentService);
    }

    /**
     * Performs the selection of some data fields if the policy is set to [Auto Required]{@link DataFocusPolicy#autoRequired}.
     */
    public performDataFocusPolicy(): void {
        if (this._safeTask.dataFocusPolicy === DataFocusPolicy.autoRequired) {
            this.autoRequiredDataFocusPolicy();
        }
    }

    /**
     * Currently does nothing
     */
    private autoRequiredDataFocusPolicy(): void {
        // TODO Implement focus in FUTURE, if someone wants this feature (for now we don't want it )
    }
}
